"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  MEASURED,
  SCOPES,
  SPECIMEN_QUESTION,
  STATUS_LABEL,
  buildSpecimen,
  phases,
  stages,
  type Row,
  type Scope,
} from "./pipelineData";

export default function PipelineInstrument() {
  const [scope, setScope] = useState<Scope>("document");
  const [strategy, setStrategy] = useState("prod_keyword");
  const [sel, setSel] = useState(stages[0].id);
  const [gateOn, setGateOn] = useState(false);
  const [citationsOn, setCitationsOn] = useState(false);
  const dossier = useRef<HTMLDivElement>(null);

  const active = SCOPES.find((s) => s.id === scope) ?? SCOPES[0];
  const row: Row = active.rows.find((r) => r.id === strategy) ?? active.rows[0];
  const deployed = active.rows.find((r) => r.live) ?? active.rows[0];
  const stage = stages.find((s) => s.id === sel) ?? stages[0];
  const spec = useMemo(() => buildSpecimen(gateOn, citationsOn), [gateOn, citationsOn]);

  const slowest = Math.max(...active.rows.map((r) => r.p50ms));

  const pick = useCallback((id: string) => {
    setSel(id);
    if (typeof window !== "undefined" && window.innerWidth <= 1000) {
      dossier.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const arrows = useCallback((e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const n =
      e.key === "ArrowDown"
        ? (i + 1) % stages.length
        : (i - 1 + stages.length) % stages.length;
    setSel(stages[n].id);
    document.getElementById(`pick-${stages[n].id}`)?.focus();
  }, []);

  const delta = (now: number, base: number, digits = 3) => {
    const d = now - base;
    if (Math.abs(d) < 0.0005) return "deployed";
    return `${d > 0 ? "+" : "−"}${Math.abs(d).toFixed(digits)} vs. deployed`;
  };

  return (
    <>
      {/* ---------------------------- controls ---------------------------- */}
      <div className="controls">
        {SCOPES.map((s) => (
          <button
            key={s.id}
            className={scope === s.id ? "btn lead" : "btn"}
            aria-pressed={scope === s.id}
            onClick={() => setScope(s.id)}
          >
            {s.label}
          </button>
        ))}
        <span className="flag measured">Measured · {MEASURED.runOn}</span>
        <span className="hint">
          {MEASURED.corpus.cases} labelled cases · {MEASURED.corpus.answerable}{" "}
          answerable · {MEASURED.corpus.chunks} chunks
        </span>
      </div>

      <p className="scopenote">{active.note}</p>

      <div className="swatchbar">
        {active.rows.map((r) => (
          <button
            key={r.id}
            className={strategy === r.id ? "swatch on" : "swatch"}
            aria-pressed={strategy === r.id}
            onClick={() => setStrategy(r.id)}
          >
            {r.name}
            {r.live && <i>deployed</i>}
          </button>
        ))}
      </div>

      <div className="gauges">
        <Gauge
          label="recall@1"
          value={row.recall1.toFixed(3)}
          sub={delta(row.recall1, deployed.recall1)}
          good={row.recall1 >= deployed.recall1}
        />
        <Gauge
          label="MRR"
          value={row.mrr.toFixed(3)}
          sub={delta(row.mrr, deployed.mrr)}
          good={row.mrr >= deployed.mrr}
        />
        <Gauge
          label="Refusal separability"
          value={row.gate.toFixed(3)}
          sub={row.canRefuse ? delta(row.gate, deployed.gate) : "cannot refuse at all"}
          good={row.canRefuse && row.gate >= deployed.gate}
          warn={!row.canRefuse}
        />
        <Gauge
          label="Retrieval p50"
          value={row.p50ms.toFixed(2)}
          suffix="ms"
          sub="local, no network"
        />
      </div>

      <p className="whatis">
        <b>{row.name}</b> · {row.what}
      </p>

      {/* --------------------------- shape split -------------------------- */}
      <div className="shapes">
        <div className="pl">recall@3 by question shape · {row.name}</div>
        {(["literal", "paraphrase", "multi"] as const).map((k) => (
          <div className="tr" key={k}>
            <span className="lab">
              {k === "multi" ? "multi-section" : k}
            </span>
            <span className="gut">
              <i style={{ width: `${row.byShape[k] * 100}%` }} />
            </span>
            <span className="ms">{row.byShape[k].toFixed(3)}</span>
          </div>
        ))}
        <p className="spec-note">
          Every miss in the run is a question that avoids the document&apos;s own
          wording. That is the gap an embedding model exists to close — and now
          it has a number to beat.
        </p>
      </div>

      {/* ------------------------------ chain ----------------------------- */}
      <div className="rig">
        <div>
          {phases.map((ph) => (
            <div key={ph.name}>
              <div className="phase">
                {ph.name}
                <b>{ph.note}</b>
              </div>

              <div className="chain">
                {stages
                  .filter((s) => s.phase === ph.name)
                  .map((s) => {
                    const i = stages.findIndex((x) => x.id === s.id);

                    return (
                      <div
                        className={`lane${sel === s.id ? " sel" : ""}`}
                        key={s.id}
                      >
                        <button
                          id={`pick-${s.id}`}
                          className="pick"
                          onClick={() => pick(s.id)}
                          onKeyDown={(e) => arrows(e, i)}
                          aria-current={sel === s.id}
                        >
                          <span className="num">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="nm">
                            {s.name}
                            <i>{s.role}</i>
                          </span>
                        </button>

                        <span className={`state ${s.status}`}>
                          {STATUS_LABEL[s.status]}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* ---------------------------- dossier --------------------------- */}
        <div className="dossier" ref={dossier}>
          <div className="dk">
            {stage.k} · Stage{" "}
            {String(stages.findIndex((s) => s.id === stage.id) + 1).padStart(2, "0")} ·{" "}
            <span className={`state ${stage.status}`}>
              {STATUS_LABEL[stage.status]}
            </span>
          </div>

          <h3>{stage.name}</h3>
          <p className="sum">{stage.summary}</p>

          <div className="dnote">
            <div className="t kept">
              {stage.status === "planned" ? "What the eval says to build" : "The decision"}
            </div>
            <p>{stage.decision}</p>
          </div>

          <div className="dnote">
            <div className="t">
              {stage.status === "planned" ? "Said plainly" : "What it costs today"}
            </div>
            <p>{stage.counter}</p>
          </div>

          {stage.evidence && (
            <div className="delta">
              <span className="dl">{stage.evidence.metric}</span>
              <span className="now">{stage.evidence.value}</span>
            </div>
          )}

          <div className="code">
            <div className="fn">{stage.code.file}</div>
            <pre>
              <code>{stage.code.source}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* --------------------------- latency ------------------------------ */}
      <div className="trace">
        <div className="trace-head">
          <div className="tl">
            Measured retrieval cost per query · {active.label.toLowerCase()} ·
            scored in Python, no network, no index
          </div>
          <div className="trace-total">
            {row.p50ms.toFixed(2)}
            <span>ms · {row.name}</span>
          </div>
        </div>

        {active.rows.map((r) => (
          <div className={`tr${r.id === strategy ? " on" : ""}`} key={r.id}>
            <span className="lab">{r.name}</span>
            <span className="gut">
              <i style={{ width: `${Math.max((r.p50ms / slowest) * 100, 3)}%` }} />
            </span>
            <span className="ms">{r.p50ms.toFixed(2)}ms</span>
          </div>
        ))}

        <p className="spec-note">
          All four are far below the generation cost, so retrieval quality is not
          being bought with latency the user would notice. That changes the day
          this corpus is a thousand times bigger, which is what an index is for.
        </p>
      </div>

      {/* --------------------------- specimen ----------------------------- */}
      <div className="specimen">
        <div className="spec-head">
          <p className="spec-q">
            <b>
              Constructed illustration · what the separability number means in an
              answer
            </b>
            {SPECIMEN_QUESTION}
          </p>
        </div>

        <div className="swatchbar tight">
          <button
            className={gateOn ? "swatch on" : "swatch"}
            role="switch"
            aria-checked={gateOn}
            onClick={() => setGateOn(!gateOn)}
          >
            Refusal gate · {gateOn ? "on" : "off"}
            {!gateOn && <i>today</i>}
          </button>
          <button
            className={citationsOn ? "swatch on" : "swatch"}
            role="switch"
            aria-checked={citationsOn}
            onClick={() => setCitationsOn(!citationsOn)}
          >
            Citations · {citationsOn ? "on" : "off"}
          </button>
        </div>

        <div className="spec-grid">
          <div>
            <p className="answer">
              {spec.fragments.map((f, i) => {
                if (f.tone === "plain") return <span key={i}>{f.text}</span>;
                const cls =
                  f.tone === "grounded" ? "ok" : f.tone === "unsupported" ? "bad" : "thin";
                return (
                  <span className={cls} key={i}>
                    {f.text}
                    {f.cite && (
                      <sup>{f.cite === "no source" ? "[no source]" : `[${f.cite}]`}</sup>
                    )}
                  </span>
                );
              })}
            </p>

            <p className={spec.alert ? "spec-note alert" : "spec-note"}>{spec.note}</p>
          </div>

          <div className="prov">
            <div className="pl">What retrieval returned</div>
            {spec.provenance.map((p) => (
              <div className={p.miss ? "pr miss" : "pr"} key={p.section}>
                <span className="ps">
                  {p.section}
                  <i>{p.doc}</i>
                </span>
                <span className="pv">{p.score}</span>
              </div>
            ))}
            <p className="spec-note">
              This question is one of the six the golden set labels unanswerable.
              The wording of the answer above is written by hand to show the
              failure mode; the scores and the labels are from the run.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Gauge({
  label,
  value,
  suffix,
  sub,
  good,
  warn,
}: {
  label: string;
  value: string;
  suffix?: string;
  sub: string;
  good?: boolean;
  warn?: boolean;
}) {
  const tone = warn ? "loss" : sub === "deployed" ? "" : good ? "gain" : "loss";

  return (
    <div className="gauge">
      <div className="g">{label}</div>
      <div className="v">
        {value}
        {suffix && (
          <span style={{ fontSize: ".42em", letterSpacing: ".06em", marginLeft: 3 }}>
            {suffix}
          </span>
        )}
      </div>
      <div className={["d", tone].filter(Boolean).join(" ")}>{sub}</div>
    </div>
  );
}
