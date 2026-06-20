import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  Layers,
  Server,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

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
    icon: Code2,
    title: "Frontend",
    description:
      "Next.js and Tailwind CSS interface for asking questions, viewing AI responses, and interacting with the learning system.",
  },
  {
    icon: Server,
    title: "Backend",
    description:
      "FastAPI backend that handles AI requests, chat endpoints, PDF generation, and application logic.",
  },
  {
    icon: Database,
    title: "Database",
    description:
      "Supabase stores chat history, user learning data, and application records.",
  },
  {
    icon: Layers,
    title: "AI/RAG Layer",
    description:
      "LLM-powered response generation with retrieval-based knowledge support for document-grounded answers.",
  },
];

export default function LearnForgePage() {
  return (
    <main className="min-h-screen overflow-hidden text-white">
      <Background />
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-36">
        <a
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </a>

        <SectionHeading
          label="Case Study"
          title="LearnForge AI — AI learning platform for real understanding."
          description="LearnForge AI is my flagship AI product. It is designed to help users understand knowledge deeply instead of memorizing answers."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="premium-card rounded-[2rem] p-8">
            <div className="mb-6 inline-flex rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4 text-blue-300">
              <Brain size={32} />
            </div>

            <h2 className="text-3xl font-black text-white">
              Project Overview
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              LearnForge AI is an AI-powered education platform that explains
              concepts clearly and practically. When a user asks a question, the
              system provides a structured answer including brief explanation,
              real use, where it is used, how to use it, advantages,
              disadvantages, and examples.
            </p>

            <p className="mt-5 leading-8 text-slate-300">
              The project is built as a full-stack AI product using a Next.js
              frontend, FastAPI backend, Supabase database, OpenAI API, RAG
              concepts, chat history, and PDF generation.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
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
                href="/Pavan_Alakunta_CV.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/15"
              >
                View Resume
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-white/[0.05] to-violet-500/10 p-8">
            <div className="mb-6 inline-flex rounded-2xl bg-blue-400/10 p-4 text-blue-300">
              <Sparkles size={32} />
            </div>

            <h2 className="text-3xl font-black text-white">
              Problem It Solves
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              Many learning tools give short answers, but users often memorize
              information without understanding how it works in real life.
              LearnForge AI is designed to make learning more practical,
              structured, and useful.
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-blue-300">
                Mission
              </p>

              <p className="mt-3 text-lg font-bold leading-8 text-white">
                Turn AI-generated answers into real understanding.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <SectionHeading
            label="Features"
            title="What LearnForge AI can do."
            description="The platform is being built step by step with practical learning, RAG, memory, and PDF export features."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur"
              >
                <CheckCircle2 className="text-blue-300" size={22} />
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-200">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            label="Architecture"
            title="Full-stack AI system architecture."
            description="LearnForge AI is not only a frontend project. It combines frontend, backend, database, AI model integration, and RAG-style knowledge retrieval."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {architecture.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="premium-card rounded-[2rem] p-6"
                >
                  <div className="mb-6 inline-flex rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4 text-blue-300">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-black text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            label="Tech Stack"
            title="Technologies used in LearnForge AI."
          />

          <div className="mt-10 flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-blue-400/20 bg-blue-400/10 px-5 py-3 text-sm font-medium text-blue-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur md:p-10">
          <div className="mb-6 inline-flex rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4 text-blue-300">
            <FileText size={32} />
          </div>

          <h2 className="text-3xl font-black text-white">
            Future Improvements
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "User authentication",
              "Better RAG document upload flow",
              "Video generation support",
              "Personalized learning memory",
              "Admin dashboard",
              "Deployment and production monitoring",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <p className="font-semibold text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}