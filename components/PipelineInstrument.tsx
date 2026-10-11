"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BASELINE,
  SAMPLE_DATA,
  SPECIMEN_QUESTION,
  buildSpecimen,
  phases,
  stages,
  type Deltas,
} from "./pipelineData";

const OPTIONAL = stages.filter((s) => s.toggle).map((s) => s.id);

type Step = { id: string; label: string; ms: number };

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function compute(on: Set<string>) {
  let { recall, faithfulness, latencyMs, costPer1k } = BASELINE;

  for (const s of stages) {
    if (!s.toggle || !on.has(s.id)) continue;
    const d: Deltas = s.toggle.deltas;
    recall += d.recall ?? 0;
    faithfulness += d.faithfulness ?? 0;
    latencyMs += d.latencyMs ?? 0;
    costPer1k += d.costPer1k ?? 0;
  }

  return {
    recall: clamp(recall, 0, 0.99),
    faithfulness: clamp(faithfulness, 0, 0.99),
    latencyMs: Math.round(latencyMs),
    costPer1k,
  };
}

const FULL = compute(new Set(OPTIONAL));

export default function PipelineInstrument() {
  const [on, setOn] = useState<Set<string>>(() => new Set(OPTIONAL));
  const [sel, setSel] = useState(stages[0].id);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState<string[]>([]);
  const [live, setLive] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const dossier = useRef<HTMLDivElement>(null);

  const isOn = useCallback((id: string) => on.has(id), [on]);
  const m = useMemo(() => compute(on), [on]);
  const stage = stages.find((s) => s.id === sel) ?? stages[0];
  const spec = useMemo(() => buildSpecimen(isOn), [isOn]);

  const steps = useMemo<Step[]>(() => {
    const out: Step[] = [{ id: "embed-q", label: "Embed question", ms: 60 }];
    for (const s of stages) {
      if (s.kind !== "runtime") continue;
      if (s.toggle && !on.has(s.id)) continue;
      out.push({ id: s.id, label: s.name, ms: s.traceMs });
    }
    return out;
  }, [on]);

  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => stop, [stop]);

  const reset = useCallback(() => {
    stop();
    setRunning(false);
    setLive(null);
    setDone([]);
  }, [stop]);

  const run = useCallback(() => {
    stop();
    setDone([]);
    setRunning(true);

    let at = 0;

    steps.forEach((step, i) => {
      // Played back faster than real time, with the proportions preserved.
      const shown = clamp(step.ms * 0.55, 140, 520);

      timers.current.push(
        setTimeout(() => {
          setLive(step.id);
          if (stages.some((s) => s.id === step.id)) setSel(step.id);
        }, at),
      );

      timers.current.push(
        setTimeout(() => {
          setDone((prev) => [...prev, step.id]);
          if (i === steps.length - 1) {
            setLive(null);
            setRunning(false);
          }
        }, at + shown),
      );

      at += shown;
    });
  }, [stop, steps]);

  const flip = useCallback((id: string) => {
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

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

  const total = steps.reduce((a, s) => a + s.ms, 0);
  const observed = steps
    .filter((s) => done.includes(s.id))
    .reduce((a, s) => a + s.ms, 0);
  const slowest = Math.max(...steps.map((s) => s.ms));
  const offCount = OPTIONAL.length - on.size;

  return (
    <>
      <div className="controls">
        <button className="btn lead" onClick={run} disabled={running}>
          {running ? "Running…" : "Run one request"}
        </button>
        <button className="btn" onClick={reset}>
          Reset
        </button>
        {SAMPLE_DATA && <span className="flag">Sample run</span>}
        <span className="hint">
          {offCount === 0
            ? "Nine of nine stages enabled"
            : `${OPTIONAL.length - offCount} of ${OPTIONAL.length} optional stages enabled`}
        </span>
      </div>

      <div className="gauges">
        <Gauge
          label="recall@5"
          value={m.recall.toFixed(2)}
          delta={m.recall - FULL.recall}
          fmt={(n) => n.toFixed(2)}
          up
        />
        <Gauge
          label="Faithfulness"
          value={m.faithfulness.toFixed(2)}
          delta={m.faithfulness - FULL.faithfulness}
          fmt={(n) => n.toFixed(2)}
          up
        />
        <Gauge
          label="p95 latency"
          value={`${m.latencyMs}`}
          suffix="ms"
          delta={m.latencyMs - FULL.latencyMs}
          fmt={(n) => `${Math.round(n)}ms`}
        />
        <Gauge
          label="Cost / 1k answers"
          value={`$${m.costPer1k.toFixed(2)}`}
          delta={m.costPer1k - FULL.costPer1k}
          fmt={(n) => `$${n.toFixed(2)}`}
        />
      </div>

      <div className="rig">
        {/* ------------------------------ chain ------------------------------ */}
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
                    const off = Boolean(s.toggle) && !on.has(s.id);
                    const cls = [
                      "lane",
                      sel === s.id ? "sel" : "",
                      off ? "off" : "",
                      live === s.id ? "lit" : "",
                      done.includes(s.id) ? "ran" : "",
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <div className={cls} key={s.id}>
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

                        {s.toggle ? (
                          <button
                            className="sw"
                            role="switch"
                            aria-checked={on.has(s.id)}
                            aria-label={`${s.toggle.label} — ${s.name}`}
                            onClick={() => flip(s.id)}
                          >
                            {s.toggle.label} · {on.has(s.id) ? "on" : "off"}
                          </button>
                        ) : (
                          <span className="req">Structural</span>
                        )}

                        <span className="ms">
                          {s.kind === "runtime" ? `${s.traceMs}ms` : "offline"}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* ----------------------------- dossier ---------------------------- */}
        <div className="dossier" ref={dossier}>
          <div className="dk">
            {stage.k} · Stage{" "}
            {String(stages.findIndex((s) => s.id === stage.id) + 1).padStart(2, "0")}{" "}
            · {stage.phase}
          </div>

          <h3>{stage.name}</h3>
          <p className="sum">{stage.summary}</p>

          <div className="dnote">
            <div className="t kept">What I kept</div>
            <p>{stage.kept}</p>
          </div>

          <div className="dnote">
            <div className="t">What I cut</div>
            <p>{stage.cut}</p>
          </div>

          <div className="delta">
            <span className="dl">{stage.impact.metric}</span>
            <span className="was">{stage.impact.before}</span>
            <span className="arw">→</span>
            <span className="now">{stage.impact.after}</span>
          </div>

          <div className="code">
            <div className="fn">{stage.code.file}</div>
            <pre>
              <code>{stage.code.source}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* ---------------------------- specimen ---------------------------- */}
      <div className="specimen">
        <div className="spec-head">
          <p className="spec-q">
            <b>The same question, answered by the pipeline you just built</b>
            {SPECIMEN_QUESTION}
          </p>
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
                      <sup>
                        {f.cite === "unsupported" ? "[no source]" : `[${f.cite}]`}
                      </sup>
                    )}
                  </span>
                );
              })}
            </p>

            <p className={spec.alert ? "spec-note alert" : "spec-note"}>
              {spec.note}
            </p>
          </div>

          <div className="prov">
            <div className="pl">Retrieved context</div>
            {spec.provenance.map((p) => (
              <div className={p.miss ? "pr miss" : "pr"} key={p.section}>
                <span className="ps">
                  {p.section}
                  <i>{p.doc}</i>
                </span>
                <span className="pv">{p.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------- trace ------------------------------ */}
      <div className="trace">
        <div className="trace-head">
          <div className="tl">
            Request trace · serving path only · offline stages do not appear
            here, which is the point of putting them offline
          </div>
          <div className="trace-total">
            {running ? observed : total}
            <span>ms end to end</span>
          </div>
        </div>

        {steps.map((s) => {
          const ran = done.includes(s.id);
          const now = live === s.id;
          const w = Math.max((s.ms / slowest) * 100, 4);

          return (
            <div
              className={["tr", now ? "on" : "", ran ? "done" : ""].filter(Boolean).join(" ")}
              key={s.id}
            >
              <span className="lab">{s.label}</span>
              <span className="gut">
                <i style={{ width: ran || now ? `${w}%` : "0%" }} />
              </span>
              <span className="ms">{s.ms}ms</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Gauge({
  label,
  value,
  suffix,
  delta,
  fmt,
  up,
}: {
  label: string;
  value: string;
  suffix?: string;
  delta: number;
  fmt: (n: number) => string;
  up?: boolean;
}) {
  const moved = Math.abs(delta) > 0.001;
  const good = up ? delta > 0 : delta < 0;

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
      <div className={["d", moved ? (good ? "gain" : "loss") : ""].filter(Boolean).join(" ")}>
        {moved
          ? `${delta > 0 ? "+" : "−"}${fmt(Math.abs(delta))} vs. full`
          : "full pipeline"}
      </div>
    </div>
  );
}
