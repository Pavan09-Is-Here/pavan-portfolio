import type { Metadata } from "next";
import Link from "next/link";
import PipelineInstrument from "@/components/PipelineInstrument";
import { MEASURED, SCOPES, stages } from "@/components/pipelineData";

export const metadata: Metadata = {
  title: "The Pipeline — AI Engineering | Pavan Alakunta",
  description:
    "The LearnForge retrieval pipeline, measured: 52 labelled cases, four strategies, and what the eval harness says to build next.",
  openGraph: {
    title: "The Pipeline — AI Engineering | Pavan Alakunta",
    description:
      "Nine stages, labelled by what is actually running, with measured numbers from an eval harness that runs in CI.",
    type: "article",
    // Next replaces the parent openGraph wholesale rather than merging it, so
    // the image has to be restated here or social cards render without one.
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Pavan Alakunta — AI & ML Engineer",
      },
    ],
  },
};

const findings = [
  {
    n: "01",
    title: "The deployed retriever cannot refuse. Not rarely — structurally.",
    body: "All six unanswerable questions in the golden set came back with context. Four scored non-zero against documents that do not contain the answer — median top score 6.5, against 14.0 for answerable questions. The other two scored zero and still got context, because the selector falls back to the first four chunks when nothing matches.",
    so: "A zero score is the system saying it found nothing. The fallback rewrites that as “here is some text”, and the model writes a confident answer on top of it. Highest-value fix in the retrieval path, and it is four lines.",
  },
  {
    n: "02",
    title: "Rank fusion ranks well and gates badly.",
    body: "Hybrid RRF matches the best MRR in the run at 0.886, and has the worst answerable/unanswerable separability of any strategy that can refuse: 0.645 against TF-IDF's 0.960. Reciprocal rank fusion discards scores and keeps ranks by design, so the fused number carries almost no information about whether anything was relevant.",
    so: "Fuse for ordering, threshold on something calibrated. A pipeline that fuses and then gates on the fused score has a gate that cannot work — which is precisely the job a reranker does.",
  },
  {
    n: "03",
    title: "Keyword scoring only falls behind once there is more than one document.",
    body: "Inside a single document every strategy ties on recall@1 at 0.804. Across the corpus the deployed scoring drops to 0.739 and its MRR to 0.828, while the others hold at 0.804 and 0.874. The weakness is telling documents apart.",
    so: "Today the endpoint filters to one document_id, so this has not bitten yet. It will the first time someone wants an answer across their library.",
  },
  {
    n: "04",
    title: "The corpus is too small to settle the ranking question.",
    body: "Three documents and 17 chunks means recall@5 saturates at 1.000 for everything in document scope — a document holds about six chunks, so retrieving five of them is not a test. The harness flags this in its own output rather than letting a saturated metric read as a result.",
    so: "recall@1, MRR and separability are the metrics to read at this size. Growing the labelled set is the next step, and production downvotes are the right source.",
  },
];

const unmeasured = [
  ["Faithfulness", "Needs a model to judge whether each claim is supported. Belongs in a slower job, reported separately from the deterministic numbers."],
  ["Answer relevancy", "Same reason. A gate that needs a secret runs occasionally; this one runs on every pull request."],
  ["End-to-end p95", "Generation dominates it, and generation is not what this harness measures. The retrieval figures here are retrieval only."],
  ["Cost per answer", "Follows from context size and model choice. Worth measuring once the context size stops changing."],
];

const shipped = stages.filter((s) => s.status === "shipped").length;
const partial = stages.filter((s) => s.status === "partial").length;
const planned = stages.filter((s) => s.status === "planned").length;

export default function PipelinePage() {
  return (
    <>
      <div className="frame">
        <div className="bar top">
          <Link className="mark" href="/">
            Pavan Alakunta<sup>®</sup>
          </Link>
          <nav className="nav">
            <Link href="/#thesis">Thesis</Link>
            <Link href="/#index">Index</Link>
            <Link href="/#capabilities">Capabilities</Link>
            <Link href="/#track">Track</Link>
          </nav>
          <Link href="/#contact">Contact</Link>
        </div>
        <div className="bar bot">
          <p className="tagline">
            The pipeline · nine stages between an uploaded document and an answer
            you can check, and the eval that says which ones earn their place.
          </p>
        </div>
      </div>

      <header className="cshero">
        <Link className="backlink" href="/#index">
          ← Back to index
        </Link>
        <h1 className="cstitle">The Pipeline</h1>
        <p className="cslede">
          Anyone can call a model. The engineering is everything between the
          document and the answer — and the willingness to measure whether each
          piece of it earns its place.
        </p>
        <div className="csfacts">
          <span>{stages.length} stages</span>
          <span className="live">{shipped} running</span>
          <span>{partial} partly running</span>
          <span>{planned} measured next</span>
          <span>{MEASURED.corpus.cases} labelled cases</span>
        </div>
      </header>

      <main>
        <section id="thesis">
          <div className="eyebrow">
            <span className="n">01</span>
            <span>Thesis</span>
          </div>
          <div className="statement">
            <h2>
              A model is one stage of nine.{" "}
              <em>The other eight decide whether it can be trusted.</em>
            </h2>
            <div className="aside">
              <p>
                This is the retrieval path inside LearnForge AI, taken apart and
                measured. <strong>Every stage is labelled with what is actually
                running</strong> — shipped, partly shipped, or not built — because
                a diagram of an architecture nobody has written proves nothing.
              </p>
              <p>
                The numbers come from an eval harness in the product repository:
                52 labelled questions over a three-document corpus, four
                retrieval strategies, scored for recall, ranking quality and
                whether a refusal threshold could even exist. It is
                deterministic, offline and stdlib-only, so it gates every pull
                request rather than running when someone remembers.
              </p>
              <p>
                It found four things worth changing, including one real bug. The
                stages marked <em>measured next</em> are next because the eval
                says so, with the figure attached.
              </p>
            </div>
          </div>
        </section>

        <section id="instrument">
          <div className="eyebrow">
            <span className="n">02</span>
            <span>Instrument</span>
            <span style={{ marginLeft: "auto" }}>
              Pick a scope · pick a strategy · select a stage
            </span>
          </div>
          <PipelineInstrument />
        </section>

        <section id="findings">
          <div className="eyebrow">
            <span className="n">03</span>
            <span>What the run found</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            Four results, <em>one of them a bug I would not have found by reading.</em>
          </h2>

          <div className="fails">
            {findings.map((f) => (
              <div className="fail" key={f.n}>
                <p className="fq">
                  <b>Finding {f.n}</b>
                  {f.title}
                </p>
                <div>
                  <p>{f.body}</p>
                  <div className="fx">
                    <b>So</b>
                    {f.so}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="evaluation">
          <div className="eyebrow">
            <span className="n">04</span>
            <span>Evaluation</span>
            <span style={{ marginLeft: "auto" }}>{MEASURED.command}</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            Every strategy, both scopes, <em>the same 52 questions.</em>
          </h2>

          {SCOPES.map((scope) => (
            <div key={scope.id} style={{ marginBottom: "clamp(30px,5vh,48px)" }}>
              <div className="kl" style={{ marginBottom: 14 }}>
                {scope.label}
                {scope.id === "document" && " · production behaviour"}
              </div>

              <div className="tablewrap">
                <table className="evals">
                  <thead>
                    <tr>
                      <th>Strategy</th>
                      <th>recall@1</th>
                      <th>recall@3</th>
                      <th>MRR</th>
                      <th>Separability</th>
                      <th>p50</th>
                      <th>Can refuse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scope.rows.map((r) => (
                      <tr key={r.id}>
                        <td className="m">
                          {r.name}
                          {r.live && (
                            <span className="state shipped" style={{ marginLeft: 10 }}>
                              deployed
                            </span>
                          )}
                        </td>
                        <td className="t">{r.recall1.toFixed(3)}</td>
                        <td className="b">{r.recall3.toFixed(3)}</td>
                        <td className="b">{r.mrr.toFixed(3)}</td>
                        <td className="t">{r.gate.toFixed(3)}</td>
                        <td className="b">{r.p50ms.toFixed(2)} ms</td>
                        <td>
                          <span className={`dir ${r.canRefuse ? "up" : "trade"}`}>
                            {r.canRefuse ? "Yes" : "No"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="keywords">
            <div className="kl">How the gate works</div>
            <p
              style={{
                margin: 0,
                color: "var(--ash)",
                fontSize: 13.5,
                lineHeight: 1.68,
                maxWidth: "64ch",
              }}
            >
              recall@1, recall@3, recall@5, MRR and separability are compared
              against a committed baseline on every pull request. A drop of more
              than 0.02 on any of them, for any strategy in either scope, fails
              the build. Moving the baseline is a deliberate commit, visible in
              review. I verified the gate fails as well as passes — a gate nobody
              has watched fail is decoration.
            </p>
          </div>
        </section>

        <section id="unmeasured">
          <div className="eyebrow">
            <span className="n">05</span>
            <span>Not measured yet</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            What this harness deliberately <em>does not claim.</em>
          </h2>

          <div className="featgrid">
            {unmeasured.map(([name, why], i) => (
              <div className="feat" key={name}>
                <span className="i">{String(i + 1).padStart(2, "0")}</span>
                <p>
                  <strong style={{ color: "var(--bone)", fontWeight: 600 }}>{name}</strong>
                  {" — "}
                  {why}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: "clamp(30px,4.5vh,46px)",
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              letterSpacing: ".06em",
              lineHeight: 1.85,
              color: "var(--ash-dim)",
              borderTop: "var(--rule)",
              paddingTop: 18,
              maxWidth: "74ch",
            }}
          >
            TF-IDF is in the harness to establish the floor a real embedding model
            has to clear — it is named TF-IDF, not semantic search, and it is not
            a stand-in for one. Latency figures are retrieval only, measured
            locally in Python. Nothing on this page is an estimate.
          </p>
        </section>

        <section id="contact" className="contact">
          <div className="eyebrow">
            <span className="n">06</span>
            <span>Elsewhere</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            The product this pipeline runs inside.
          </h2>

          <div className="links">
            <Link className="lnk" href="/learnforge-ai">
              <div className="t">Case study</div>
              <div className="v">LearnForge AI</div>
            </Link>
            <a
              className="lnk"
              href="https://github.com/Pavan09-Is-Here/learnforge-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="t">Repository</div>
              <div className="v">learnforge-ai · evals/ ↗</div>
            </a>
            <a className="lnk" href="mailto:pavanalakunta58@gmail.com">
              <div className="t">Email</div>
              <div className="v">pavanalakunta58@gmail.com</div>
            </a>
            <Link className="lnk" href="/#index">
              <div className="t">More work</div>
              <div className="v">Back to index</div>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
