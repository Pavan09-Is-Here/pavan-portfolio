import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LearnForge AI — Case Study | Pavan Alakunta",
  description:
    "LearnForge AI is an AI learning platform aimed at understanding rather than recall: structured explanations, document-grounded retrieval, persisted conversations, and PDF export.",
};

const features = [
  "Structured AI learning answers",
  "Real-world use explanations",
  "Advantages and disadvantages",
  "RAG-based document retrieval",
  "Chat-style user interface",
  "Conversation history",
  "PDF export",
  "Supabase database integration",
];

const architecture = [
  {
    k: "UI",
    title: "Frontend",
    body: "Next.js and Tailwind CSS interface for asking questions, viewing AI responses, and interacting with the learning system.",
  },
  {
    k: "API",
    title: "Backend",
    body: "FastAPI backend that handles AI requests, chat endpoints, PDF generation, and application logic.",
  },
  {
    k: "DB",
    title: "Database",
    body: "Supabase stores chat history, user learning data, and application records.",
  },
  {
    k: "RAG",
    title: "AI / Retrieval Layer",
    body: "LLM-powered response generation with retrieval-based knowledge support for document-grounded answers.",
  },
];

const stack = [
  "Python",
  "FastAPI",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "OpenAI API",
  "RAG",
  "PDF Generation",
];

const next = [
  "User authentication",
  "Better RAG document upload flow",
  "Video generation support",
  "Personalized learning memory",
  "Admin dashboard",
  "Deployment and production monitoring",
];

export default function LearnForgePage() {
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
            Case study · LearnForge AI — turning generated answers into real
            understanding.
          </p>
        </div>
      </div>

      <header className="cshero">
        <Link className="backlink" href="/#index">
          ← Back to index
        </Link>
        <h1 className="cstitle">LearnForge AI</h1>
        <p className="cslede">
          An AI learning platform aimed at understanding rather than recall — built
          end to end, from the shape of a good answer down to the retrieval layer
          that grounds it.
        </p>
        <div className="csfacts">
          <span>Flagship product</span>
          <span>Python · FastAPI</span>
          <span>Next.js · TypeScript</span>
          <span>Supabase</span>
          <span className="live">In development</span>
        </div>
      </header>

      <main>
        <section id="overview">
          <div className="eyebrow">
            <span className="n">01</span>
            <span>Overview</span>
          </div>
          <div className="statement">
            <h2>
              Most learning tools hand back an answer.{" "}
              <em>This one has to show its work.</em>
            </h2>
            <div className="aside">
              <p>
                When a user asks a question, LearnForge AI returns a{" "}
                <strong>structured</strong> answer rather than a paragraph: a brief
                explanation, where the concept is actually used, how to use it,
                advantages, disadvantages, and worked examples.
              </p>
              <p>
                The problem it addresses is specific. Short answers are easy to
                memorise and easy to misapply — people come away able to repeat a
                definition and unable to recognise the thing in the wild. Forcing
                every response into the same structure makes the gaps visible.
              </p>
              <p>
                It is built as a full-stack product: a Next.js frontend, a FastAPI
                backend, Supabase for persistence, the OpenAI API for generation,
                retrieval over documents for grounding, and PDF export so a session
                becomes study material.
              </p>
            </div>
          </div>
        </section>

        <section id="features">
          <div className="eyebrow">
            <span className="n">02</span>
            <span>Features</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            What the platform does today.
          </h2>
          <div className="featgrid">
            {features.map((f, i) => (
              <div className="feat" key={f}>
                <span className="i">{String(i + 1).padStart(2, "0")}</span>
                <p>{f}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="architecture">
          <div className="eyebrow">
            <span className="n">03</span>
            <span>Architecture</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            Four layers, one product.
          </h2>
          <div className="caps four">
            {architecture.map((a) => (
              <div className="cap" key={a.k}>
                <div className="k">{a.k}</div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="stack">
          <div className="eyebrow">
            <span className="n">04</span>
            <span>Stack</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            Technologies in use.
          </h2>
          <div className="chips">
            {stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </section>

        <section id="next" className="contact">
          <div className="eyebrow">
            <span className="n">05</span>
            <span>What&apos;s next</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            Where it goes from here.
          </h2>
          <div className="featgrid">
            {next.map((n, i) => (
              <div className="feat" key={n}>
                <span className="i">{String(i + 1).padStart(2, "0")}</span>
                <p>{n}</p>
              </div>
            ))}
          </div>

          <div className="links" style={{ marginTop: "clamp(48px,8vh,88px)" }}>
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
            <a className="lnk" href="/Pavan_Alakunta_CV.pdf" target="_blank" rel="noopener noreferrer">
              <div className="t">Curriculum Vitae</div>
              <div className="v">PDF ↗</div>
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
