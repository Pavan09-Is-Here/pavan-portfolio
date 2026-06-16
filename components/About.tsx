import SectionHeading from "./SectionHeading";

const points = [
  "AI & ML focused developer with strong interest in intelligent learning systems.",
  "Building LearnForge AI, an AI-powered education platform focused on real understanding.",
  "Experienced with Python, FastAPI, Next.js, Supabase, OpenAI API, RAG, and full-stack AI systems.",
  "Interested in machine learning, LLM applications, AI products, and scalable software engineering.",
];

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl border-t border-white/10 px-6 py-24"
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          label="About"
          title="AI-first engineer with product thinking."
          description="I focus on building useful AI systems that combine machine learning, LLMs, RAG, backend engineering, and clean frontend experiences."
        />

        <div className="premium-card rounded-[2rem] p-8">
          <p className="text-lg leading-8 text-slate-300">
            I&apos;m Pavan Alakunta, an AI & ML Engineer building intelligent
            applications that help people learn, understand, and use knowledge
            practically. My main focus is creating AI-powered products where
            machine learning, LLMs, retrieval systems, backend APIs, databases,
            and modern frontend design work together.
          </p>

          <div className="mt-8 grid gap-4">
            {points.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="leading-7 text-slate-300">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}