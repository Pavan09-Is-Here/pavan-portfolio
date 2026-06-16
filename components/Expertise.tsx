import { Brain, Code2, Database, Sparkles, Terminal, Zap } from "lucide-react";
import SectionHeading from "./SectionHeading";

const expertise = [
  {
    icon: Brain,
    title: "Machine Learning Engineering",
    description:
      "Working with ML concepts, model workflows, data preprocessing, evaluation thinking, classification, regression, and intelligent system design.",
    skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"],
  },
  {
    icon: Sparkles,
    title: "LLM Applications",
    description:
      "Building AI applications powered by large language models, structured prompting, contextual responses, and useful AI workflows.",
    skills: ["Prompting", "AI Workflows", "OpenAI API"],
  },
  {
    icon: Database,
    title: "RAG Systems",
    description:
      "Creating retrieval-based AI systems that use documents, embeddings, vector search, memory, and knowledge-grounded answers.",
    skills: ["Embeddings", "Vector Search", "Memory"],
  },
  {
    icon: Code2,
    title: "AI Full Stack Development",
    description:
      "Developing complete AI products with frontend, backend, database, API integration, authentication, and deployment-ready architecture.",
    skills: ["Next.js", "FastAPI", "Supabase"],
  },
  {
    icon: Terminal,
    title: "Python Backend Engineering",
    description:
      "Building clean backend APIs, AI service layers, PDF generation, chat endpoints, database connections, and production-ready server logic.",
    skills: ["Python", "FastAPI", "REST APIs"],
  },
  {
    icon: Zap,
    title: "AI Product Engineering",
    description:
      "Turning ideas into real AI products by combining technical implementation, user experience, product thinking, and deployment strategy.",
    skills: ["Product Thinking", "UX", "Deployment"],
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        label="Expertise"
        title="Core strengths for building intelligent products."
        description="My portfolio is focused on AI/ML engineering first, supported by LLM/RAG systems and full-stack product development."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {expertise.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="premium-card group rounded-[2rem] p-7 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.08]"
            >
              <div className="mb-6 inline-flex rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4 text-blue-300">
                <Icon size={28} />
              </div>

              <h3 className="text-2xl font-black text-white">{item.title}</h3>

              <p className="mt-4 leading-7 text-slate-300">
                {item.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}