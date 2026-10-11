import type { Metadata } from "next";
import Link from "next/link";
import PipelineInstrument from "@/components/PipelineInstrument";
import { SAMPLE_DATA, stages } from "@/components/pipelineData";

export const metadata: Metadata = {
  title: "The Pipeline — AI Engineering | Pavan Alakunta",
  description:
    "Nine stages from raw upload to a cited answer: ingest, chunk, embed, index, retrieve, rerank, generate, evaluate, observe. Each one carries the decision behind it and the number that justified it.",
  openGraph: {
    title: "The Pipeline — AI Engineering | Pavan Alakunta",
    description:
      "An interactive AI pipeline: switch stages off and watch quality, latency, cost and the answer itself change.",
    type: "article",
  },
};

/** Sample figures — replace with eval output. See components/pipelineData.ts. */
const evals = [
  { metric: "Faithfulness", base: "0.68", tuned: "0.89", dir: "up" },
  { metric: "Answer relevancy", base: "0.74", tuned: "0.91", dir: "up" },
  { metric: "Context precision", base: "0.58", tuned: "0.86", dir: "up" },
  { metric: "recall@5", base: "0.61", tuned: "0.85", dir: "up" },
  { metric: "Ungrounded claims", base: "18%", tuned: "4%", dir: "up" },
  { metric: "p95 latency", base: "740ms", tuned: "920ms", dir: "trade" },
  { metric: "Cost / 1k answers", base: "$1.80", tuned: "$2.60", dir: "trade" },
];

const failures = [
  {
    q: "Compare the two tables in chapter four.",
    why: "Retrieval returns passages, not relationships. Both tables arrive as separate chunks and nothing in the pipeline knows they share a key, so the comparison stays shallow even though the evidence is present.",
    fix: "Table-aware chunking that keeps a table whole and emits a caption-level summary chunk alongside it.",
  },
  {
    q: "What did I ask you last week about optimisers?",
    why: "The question is about conversation history, which lives in Postgres but is never embedded. The retriever has nothing to match against, so it falls back to the documents and answers a question nobody asked.",
    fix: "Index conversation turns in the same hybrid index, scoped to the user and ranked with a recency prior.",
  },
  {
    q: "Is this proof correct?",
    why: "Verification is not retrieval. The pipeline finds the relevant theorem and still cannot check a derivation step by step, and the generated answer carries more certainty than the evidence supports.",
    fix: "Route proof-checking to a separate reasoning path that returns a per-step verdict instead of prose.",
  },
];

const runtime = stages.filter((s) => s.kind === "runtime").length;

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
            The pipeline · nine stages between an uploaded document and an
            answer you can check.
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
          <span>{runtime} on the request path</span>
          <span>Python · FastAPI</span>
          <span>Postgres · pgvector</span>
          {SAMPLE_DATA && <span className="live">Sample figures</span>}
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
                This is the production path behind LearnForge AI, taken apart.{" "}
                <strong>
                  Every stage below carries the decision I made, the option I
                  rejected, and the number that settled it
                </strong>{" "}
                — because a stack list proves nothing about judgement.
              </p>
              <p>
                It is also switchable. Turn off reranking and latency improves
                while faithfulness falls; turn off hybrid retrieval and the
                literal passage stops being found. The instrument recomputes
                recall, faithfulness, latency and cost from whatever pipeline
                you leave standing.
              </p>
              <p>
                Then it answers the same question again, so you can read what
                your configuration did to the output — which claims still carry
                a citation, and which sentence arrived from nowhere.
              </p>
            </div>
          </div>
        </section>

        <section id="instrument">
          <div className="eyebrow">
            <span className="n">02</span>
            <span>Instrument</span>
            <span style={{ marginLeft: "auto" }}>
              Select a stage · switch it off · run a request
            </span>
          </div>
          <PipelineInstrument />
        </section>

        <section id="evaluation">
          <div className="eyebrow">
            <span className="n">03</span>
            <span>Evaluation</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            Measured the same way every time, <em>including where it got worse.</em>
          </h2>

          <div className="tablewrap">
            <table className="evals">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Naive retrieval</th>
                  <th>This pipeline</th>
                  <th>Direction</th>
                </tr>
              </thead>
              <tbody>
                {evals.map((r) => (
                  <tr key={r.metric}>
                    <td className="m">{r.metric}</td>
                    <td className="b">{r.base}</td>
                    <td className="t">{r.tuned}</td>
                    <td>
                      <span className={`dir ${r.dir}`}>
                        {r.dir === "up" ? "Improved" : "Traded away"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="keywords">
            <div className="kl">How it runs</div>
            <p
              style={{
                margin: 0,
                color: "var(--ash)",
                fontSize: 13.5,
                lineHeight: 1.68,
                maxWidth: "64ch",
              }}
            >
              A golden set of labelled question and answer pairs, scored on
              every pull request. A change that drops any quality metric by more
              than two points fails the build, so a regression cannot ship
              quietly. The latency and cost rows got worse deliberately — that
              is the price the quality rows paid, and it is a price worth
              stating out loud.
            </p>
          </div>
        </section>

        <section id="failures">
          <div className="eyebrow">
            <span className="n">04</span>
            <span>Known failures</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            Where it still gets things wrong.
          </h2>

          <div className="fails">
            {failures.map((f) => (
              <div className="fail" key={f.q}>
                <p className="fq">
                  <b>Query shape</b>
                  {f.q}
                </p>
                <div>
                  <p>{f.why}</p>
                  <div className="fx">
                    <b>The fix</b>
                    {f.fix}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {SAMPLE_DATA && (
            <p
              style={{
                marginTop: "clamp(34px,5vh,52px)",
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                letterSpacing: ".06em",
                lineHeight: 1.8,
                color: "var(--warn)",
                borderTop: "var(--rule)",
                paddingTop: 18,
                maxWidth: "72ch",
              }}
            >
              Note · the figures on this page are sample values, present so the
              instrument has something coherent to compute. They are replaced
              with eval-harness output before this page is presented as measured
              work.
            </p>
          )}
        </section>

        <section id="contact" className="contact">
          <div className="eyebrow">
            <span className="n">05</span>
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
              <div className="v">learnforge-ai ↗</div>
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
