import {
  ArrowUpRight,
  Brain,
  Code2,
  Database,
  FileText,
  Layers,
  Server,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: Brain,
    title: "Deep Learning Answers",
    description:
      "Generates structured explanations with real use, where it is used, how to use it, advantages, disadvantages, and examples.",
  },
  {
    icon: Database,
    title: "RAG Knowledge System",
    description:
      "Supports retrieval-based learning using documents, embeddings, vector search, and context-aware AI responses.",
  },
  {
    icon: FileText,
    title: "PDF Export",
    description:
      "Converts AI-generated learning responses into downloadable PDF material for study and future reference.",
  },
  {
    icon: Sparkles,
    title: "AI Product Experience",
    description:
      "Designed like a real AI learning platform with chat-style interaction, clean UI, memory, and scalable product thinking.",
  },
];

const techStack = [
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

const architecture = [
  {
    title: "Frontend",
    value: "Next.js + Tailwind",
    icon: Code2,
  },
  {
    title: "Backend",
    value: "FastAPI + Python",
    icon: Server,
  },
  {
    title: "Database",
    value: "Supabase",
    icon: Database,
  },
  {
    title: "AI Layer",
    value: "LLM + RAG",
    icon: Layers,
  },
];

export default function FeaturedProject() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl border-t border-white/10 px-6 py-24"
    >
      <SectionHeading
        label="Featured Project"
        title="LearnForge AI — an AI learning platform for real understanding."
        description="My flagship project combines AI, machine learning thinking, LLMs, RAG, backend engineering, databases, PDF generation, and a modern full-stack user experience."
      />

      <div className="mt-12 rounded-[2.5rem] border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-white/[0.05] to-violet-500/10 p-6 backdrop-blur-xl md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-200">
              Flagship AI Product
            </div>

            <h3 className="mt-6 text-4xl font-black tracking-tight text-white md:text-5xl">
              LearnForge AI
            </h3>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              LearnForge AI is an AI-powered education platform built to help
              users understand knowledge deeply instead of memorizing answers.
              It explains concepts clearly, shows real-world use, supports
              document-based retrieval, saves learning conversations, and
              generates PDF study material.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-3xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="mb-4 inline-flex rounded-2xl bg-blue-400/10 p-3 text-blue-300">
                      <Icon size={22} />
                    </div>

                    <h4 className="text-lg font-black text-white">
                      {feature.title}
                    </h4>

                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
  href="https://github.com/Pavan09-Is-Here/learnforge-ai"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:scale-105 hover:shadow-blue-500/30"
>
  <FaGithub size={18} />
  GitHub Repo
</a>

              <a
  href="/learnforge-ai"
  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/15"
>
  View Case Study
  <ArrowUpRight size={18} />
</a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#071021]/90 p-5 shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-medium text-green-300">
                  AI System Active
                </span>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-blue-300">
                  User Question
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-200">
                  Explain Machine Learning with real use, advantages,
                  disadvantages, and examples.
                </p>
              </div>

              <div className="mt-4 rounded-3xl border border-blue-400/20 bg-blue-400/10 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-blue-300">
                  LearnForge AI Response
                </p>

                <div className="mt-4 space-y-3">
                  <div className="h-3 w-full rounded-full bg-white/20" />
                  <div className="h-3 w-11/12 rounded-full bg-white/15" />
                  <div className="h-3 w-10/12 rounded-full bg-white/10" />
                </div>

                <div className="mt-5 grid gap-3">
                  {[
                    "Brief Explanation",
                    "Real-World Usage",
                    "How It Works",
                    "Advantages & Disadvantages",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {architecture.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <Icon className="text-blue-300" size={20} />

                      <p className="mt-3 text-sm font-bold text-white">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}