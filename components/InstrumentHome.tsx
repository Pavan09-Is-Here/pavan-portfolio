"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { MEASURED, SCOPES } from "./pipelineData";

/* --------------------------------------------------------------------------
 * Content. Every attribute in `facts` is verifiable — a link that resolves, a
 * page that exists, a gate that runs. Nothing is a rating and nothing is a
 * progress bar, because neither would mean anything.
 * -------------------------------------------------------------------------- */

type System = {
  idx: string;
  name: string;
  line: string;
  stack: string[];
  body: string;
  facts: { label: string; value: string; state: "yes" | "no" | "na" }[];
  acts: { label: string; href: string; external?: boolean }[];
  tags: { label: string; tone?: "on" | "warn" }[];
};

const systems: System[] = [
  {
    idx: "01",
    name: "CareerPilot AI",
    line: "Career automation that never invents a candidate fact.",
    stack: ["FastAPI", "SQLAlchemy 2", "Next.js 16", "PostgreSQL"],
    body:
      "Every claim in a generated CV, cover letter or application answer traces back to a verified facts vault — the system is built so that it cannot assert something the candidate never told it. Around that: compliance-gated job discovery, explainable matching, and hard safety gates for CAPTCHA, MFA and anything irreversible.",
    facts: [
      { label: "Deployed", value: "yes · vercel", state: "yes" },
      { label: "Public repository", value: "yes", state: "yes" },
      { label: "Written case study", value: "not yet", state: "no" },
      { label: "Eval gate in CI", value: "not yet", state: "no" },
    ],
    acts: [
      { label: "Open the live app ↗", href: "https://careerpilot-ai-jade.vercel.app", external: true },
      { label: "Repository ↗", href: "https://github.com/Pavan09-Is-Here/careerpilot-ai", external: true },
    ],
    tags: [{ label: "live", tone: "on" }, { label: "aug 2026" }],
  },
  {
    idx: "02",
    name: "LearnForge AI",
    line: "Document-grounded learning, with the retrieval path measured.",
    stack: ["Python", "FastAPI", "Supabase", "RAG"],
    body:
      "An AI learning platform aimed at understanding rather than recall: structured explanations that carry mechanism, trade-offs and worked examples, grounded in the user's own documents. It is the one system here with an eval harness — 52 labelled cases gating every pull request — which is how I know its retriever cannot currently refuse a question it has no answer for.",
    facts: [
      { label: "Deployed", value: "in development", state: "no" },
      { label: "Public repository", value: "yes", state: "yes" },
      { label: "Written case study", value: "yes", state: "yes" },
      { label: "Eval gate in CI", value: "yes · 52 cases", state: "yes" },
      { label: "Token-verified endpoints", value: "yes · RLS", state: "yes" },
    ],
    acts: [
      { label: "Pipeline teardown →", href: "/pipeline" },
      { label: "Case study →", href: "/learnforge-ai" },
      { label: "Repository ↗", href: "https://github.com/Pavan09-Is-Here/learnforge-ai", external: true },
    ],
    tags: [{ label: "measured", tone: "on" }, { label: "aug 2026" }],
  },
  {
    idx: "03",
    name: "Injection-Resistant Ranking Agent",
    line: "Holds its ordering under adversarial input.",
    stack: ["Python", "LLM Security", "Ranking"],
    body:
      "A ranking agent built against documents that try to talk the model into promoting them. It treats prompt injection as a ranking-integrity problem rather than a content-filtering one: the question is not whether the text is bad, it is whether a document can move its own position by addressing the ranker.",
    facts: [
      { label: "Deployed", value: "no · research", state: "na" },
      { label: "Public repository", value: "yes", state: "yes" },
      { label: "Written case study", value: "not yet", state: "no" },
      { label: "Eval gate in CI", value: "not yet", state: "no" },
    ],
    acts: [
      { label: "Repository ↗", href: "https://github.com/Pavan09-Is-Here/injection-resistant-ranking-agent", external: true },
    ],
    tags: [{ label: "research" }, { label: "aug 2026" }],
  },
  {
    idx: "04",
    name: "This Portfolio",
    line: "Two readings of the same subject, and an instrument panel.",
    stack: ["Next.js", "TypeScript", "Vercel"],
    body:
      "The reveal build — still live at /reveal — stacks two renderings of one portrait and uses the pointer as a retrieval window over the one underneath. This panel is the other reading: the same work stated as measurements, with every figure traceable to a run rather than to a claim.",
    facts: [
      { label: "Deployed", value: "yes · vercel", state: "yes" },
      { label: "Public repository", value: "yes", state: "yes" },
      { label: "Written case study", value: "not yet", state: "no" },
      { label: "Eval gate in CI", value: "not applicable", state: "na" },
    ],
    acts: [
      { label: "The reveal build →", href: "/reveal" },
      { label: "Repository ↗", href: "https://github.com/Pavan09-Is-Here/pavan-portfolio", external: true },
    ],
    tags: [{ label: "live", tone: "on" }],
  },
];

const capabilities = [
  {
    code: "EVAL",
    title: "Measuring before building",
    body:
      "Labelled sets, deterministic metrics, and a regression gate in CI. The harness behind this site's pipeline page runs offline with no API key, which is the only reason it runs on every change rather than occasionally.",
  },
  {
    code: "RAG",
    title: "Retrieval systems",
    body:
      "Chunking, lexical and vector retrieval, rank fusion, reranking, and the part most systems skip: a calibrated threshold so the thing can say it does not know.",
  },
  {
    code: "ML",
    title: "Machine learning engineering",
    body:
      "Preprocessing, feature work, supervised and unsupervised methods, and evaluation designed around how the system will actually be used rather than what is easy to score.",
  },
  {
    code: "API",
    title: "Python backend",
    body:
      "FastAPI services, AI service layers, token-verified endpoints behind row-level security, PDF generation, and database access that survives being deployed.",
  },
  {
    code: "UI",
    title: "Full-stack product",
    body:
      "Next.js, React and TypeScript in front; Supabase and PostgreSQL behind. Shipped as one product rather than a model with a page bolted onto it.",
  },
  {
    code: "SHIP",
    title: "Product engineering",
    body:
      "Scoping, interface decisions, deployment, and the judgement about what to leave out — which is usually the decision that determines whether anything ships at all.",
  },
];

const track = [
  {
    who: "Centific",
    role: "AI Engineer",
    when: "Present",
    title: "LLM dataset quality across NLP and generative AI",
    body:
      "AI training and annotation workflows for language-model datasets — the unglamorous layer that determines whether anything downstream works.",
    points: [
      "Reviewed dataset quality, task consistency and output accuracy",
      "Evaluated and refined model responses for accuracy and relevance",
      "Supported structured workflows for improving model output",
    ],
  },
  {
    who: "LearnForge AI",
    role: "Founder-Engineer",
    when: "Current",
    title: "Designing and building an AI learning platform",
    body:
      "Full ownership from product concept to deployment: the learning experience, the retrieval architecture, the eval harness that measures it, and every layer of the stack that carries it.",
    points: [
      "Defined the product concept and the shape of a good AI learning response",
      "Built the backend in Python and FastAPI, with Supabase for persistence",
      "Built and gated a retrieval eval harness over 52 labelled cases",
    ],
  },
  {
    who: "University of Hertfordshire",
    role: "MSc AI & Robotics",
    when: "Jan 2026 —",
    title: "Postgraduate study, Hatfield",
    body:
      "Following a B.Tech in AI & ML at Nalla Malla Reddy Engineering College — First Class Honours, GPA 7.68 of 10, 2021 to 2025.",
    points: [],
  },
];

const keywords = [
  "Python", "TypeScript", "SQL", "C", "R", "MATLAB",
  "PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Hugging Face",
  "RAG Pipelines", "Embeddings", "Vector Search", "Rank Fusion", "Reranking",
  "Prompt Engineering", "Eval Harnesses", "Regression Gates",
  "OpenCV", "YOLOv8", "BERT", "Sentence Transformers", "NLTK",
  "FastAPI", "SQLAlchemy", "Next.js", "React", "Supabase", "PostgreSQL",
  "Row-Level Security", "Git", "Linux", "Vercel",
];

const links = [
  { t: "Email", v: "pavanalakunta58@gmail.com", href: "mailto:pavanalakunta58@gmail.com" },
  { t: "GitHub", v: "Pavan09-Is-Here ↗", href: "https://github.com/Pavan09-Is-Here" },
  { t: "LinkedIn", v: "pavan-alakunta ↗", href: "https://www.linkedin.com/in/pavan-alakunta" },
  { t: "Curriculum Vitae", v: "PDF ↗", href: "/Pavan_Alakunta_CV.pdf" },
];

/* -------------------------------------------------------------------------- */

const deployed = SCOPES[0].rows.find((r) => r.live)!;
const best = SCOPES[0].rows.reduce((a, b) => (b.gate > a.gate ? b : a));

export default function InstrumentHome() {
  const [open, setOpen] = useState<string | null>("02");

  const toggle = useCallback((idx: string) => {
    setOpen((cur) => (cur === idx ? null : idx));
  }, []);

  return (
    <div className="i-root">
      <div className="i-shell">
        {/* ------------------------------- bar ------------------------------ */}
        <header className="i-bar">
          <Link className="i-mark" href="/">
            Pavan Alakunta
          </Link>
          <span className="i-led">2 systems deployed</span>
          <nav>
            <a href="#systems">Systems</a>
            <a href="#measured">Measured</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#track">Track</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        {/* ----------------------------- masthead -------------------------- */}
        <section className="i-mast">
          <div className="i-eyeline">
            <span>AI &amp; ML Engineer</span>
            <span>Hatfield, UK</span>
            <span>
              <b>Open</b> to AI engineering roles
            </span>
          </div>

          <div className="i-mast-grid">
            <div>
              <h1 className="i-name">
                Pavan
                <br />
                Alakunta<span>.</span>
              </h1>

              <p className="i-sub">
                I work on the boundary between what a model retrieves and what is
                actually true. <strong>Everything stated on this page is either a
                link you can open or a number from a run you can reproduce</strong>{" "}
                — which turns out to be a harder constraint than it sounds, and a
                more useful one than a list of technologies.
              </p>
            </div>

            <figure className="i-id">
              <div className="plate">
                <Image
                  src="/portrait.jpg"
                  alt="Pavan Alakunta"
                  width={795}
                  height={1000}
                  priority
                  sizes="(max-width: 860px) 42vw, 236px"
                />
                <span className="wash" aria-hidden />
                <span className="scan" aria-hidden />
              </div>

              <figcaption className="cap">
                <b>Pavan Alakunta</b>
                <span>AI &amp; ML Engineer</span>
                Hatfield, UK · MSc AI &amp; Robotics
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ----------------------------- readout --------------------------- */}
        <div className="i-readout">
          <div className="i-cell">
            <span className="k">Systems shipped</span>
            <span className="v">
              2<em>of 4 built</em>
            </span>
            <span className="s">one live app, one in development, one research</span>
          </div>
          <div className="i-cell">
            <span className="k">Deployed recall@1</span>
            <span className="v">{deployed.recall1.toFixed(3)}</span>
            <Link className="s" href="/pipeline">
              learnforge retrieval · see the run →
            </Link>
          </div>
          <div className="i-cell">
            <span className="k">Refusal separability</span>
            <span className="v">{deployed.gate.toFixed(3)}</span>
            <span className="s">
              against {best.gate.toFixed(3)} measured for the best candidate
            </span>
          </div>
          <div className="i-cell">
            <span className="k">Eval cases gated</span>
            <span className="v">
              {MEASURED.corpus.cases}
              <em>every PR</em>
            </span>
            <span className="s">offline, no API key, under one second</span>
          </div>
        </div>

        {/* ----------------------------- systems --------------------------- */}
        <section className="i-sec" id="systems">
          <div className="i-head">
            <span className="n">01</span>
            <span className="t">Systems</span>
            <span className="r">Select a row to inspect it</span>
          </div>

          <div className="i-rows">
            {systems.map((s) => {
              const isOpen = open === s.idx;

              return (
                <div className="i-row" key={s.idx} data-open={isOpen}>
                  <button
                    className="i-rowbtn"
                    aria-expanded={isOpen}
                    aria-controls={`panel-${s.idx}`}
                    onClick={() => toggle(s.idx)}
                  >
                    <span className="idx">{s.idx}</span>
                    <span className="nm">{s.name}</span>
                    <span className="ln">{s.line}</span>
                    <span className="bits">
                      {s.tags.map((t) => (
                        <span className={`i-tag${t.tone ? ` ${t.tone}` : ""}`} key={t.label}>
                          {t.label}
                        </span>
                      ))}
                    </span>
                    <span className="car">›</span>
                  </button>

                  {isOpen && (
                    <div className="i-draw" id={`panel-${s.idx}`}>
                      <span className="sp" aria-hidden />
                      <div className="body">
                        <div>
                          <p>{s.body}</p>
                          <div className="acts">
                            {s.acts.map((a) =>
                              a.external ? (
                                <a
                                  className="i-act"
                                  key={a.label}
                                  href={a.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {a.label}
                                </a>
                              ) : (
                                <Link className="i-act" key={a.label} href={a.href}>
                                  {a.label}
                                </Link>
                              ),
                            )}
                          </div>
                        </div>

                        <div className="mx">
                          {s.facts.map((f) => (
                            <div className="i-mxrow" key={f.label}>
                              <span className="ml">{f.label}</span>
                              <span
                                className={`mv ${
                                  f.state === "yes" ? "yes" : f.state === "no" ? "no" : ""
                                }`}
                              >
                                {f.value}
                              </span>
                            </div>
                          ))}
                          <div className="i-mxrow">
                            <span className="ml">Stack</span>
                            <span className="mv">{s.stack.join(" · ")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------------------- measured --------------------------- */}
        <section className="i-sec" id="measured">
          <div className="i-head">
            <span className="n">02</span>
            <span className="t">Measured</span>
            <span className="r">{MEASURED.command}</span>
          </div>

          <div className="i-grid">
            <div className="i-box">
              <span className="code">FOUND 01</span>
              <h3>The deployed retriever cannot refuse</h3>
              <p>
                All six unanswerable questions in the golden set came back with
                context — four scored non-zero against documents that do not
                contain the answer. A zero score means nothing was found; the
                fallback rewrites that as &ldquo;here is some text&rdquo;.
              </p>
            </div>
            <div className="i-box">
              <span className="code">FOUND 02</span>
              <h3>Rank fusion ranks well and gates badly</h3>
              <p>
                Hybrid RRF ties for the best ranking in the run and has the worst
                separability of anything that can refuse — 0.645 against 0.960.
                Fusion discards the scores a threshold needs. Fuse for ordering,
                gate on something calibrated.
              </p>
            </div>
            <div className="i-box">
              <span className="code">FOUND 03</span>
              <h3>Keyword scoring only fails across documents</h3>
              <p>
                Inside one document every strategy ties at recall@1 0.804. Across
                the corpus the deployed scoring drops to 0.739. The weakness is
                telling documents apart, and the current single-document scope
                hides it completely.
              </p>
            </div>
          </div>

          <div className="i-chips" style={{ paddingTop: 18 }}>
            <Link className="i-act" href="/pipeline">
              The full pipeline teardown, stage by stage →
            </Link>
          </div>
        </section>

        {/* -------------------------- capabilities ------------------------- */}
        <section className="i-sec" id="capabilities">
          <div className="i-head">
            <span className="n">03</span>
            <span className="t">Capabilities</span>
          </div>

          <div className="i-grid">
            {capabilities.map((c) => (
              <div className="i-box" key={c.code}>
                <span className="code">{c.code}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>

          <div className="i-chips">
            {keywords.map((k) => (
              <span key={k}>{k}</span>
            ))}
          </div>
        </section>

        {/* ------------------------------ track --------------------------- */}
        <section className="i-sec" id="track">
          <div className="i-head">
            <span className="n">04</span>
            <span className="t">Track</span>
          </div>

          <div className="i-log">
            {track.map((t) => (
              <div className="i-entry" key={t.who}>
                <div className="who">
                  <b>{t.who}</b>
                  {t.role}
                  <br />
                  {t.when}
                </div>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                  {t.points.length > 0 && (
                    <ul>
                      {t.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------------------- contact -------------------------- */}
        <section id="contact">
          <div className="i-head">
            <span className="n">05</span>
            <span className="t">Contact</span>
          </div>

          <h2 className="i-big">
            <a href="mailto:pavanalakunta58@gmail.com">Let&apos;s build something measurable.</a>
          </h2>

          <div className="i-links">
            {links.map((l) => (
              <a
                className="i-lnk"
                key={l.t}
                href={l.href}
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <div className="lt">{l.t}</div>
                <div className="lv">{l.v}</div>
              </a>
            ))}
          </div>

          <div className="i-foot">
            <span>Instrument panel · {MEASURED.runOn}</span>
            <span>Figures from evals/results/latest.json</span>
            <Link href="/reveal">The reveal build →</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
