import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { ArrowUpRight, Brain, Code2, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    icon: Brain,
    title: "LearnForge AI",
    status: "Flagship AI Product",
    description:
      "An AI-powered learning platform that helps users understand concepts deeply, generate structured explanations, use RAG-based retrieval, save chat history, and export learning material as PDFs.",
    stack: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Supabase",
      "OpenAI API",
      "RAG",
      "PDF Generation",
    ],
    caseStudy: "/learnforge-ai",
    github: "https://github.com/Pavan09-Is-Here/learnforge-ai",
  },
  {
    icon: Sparkles,
    title: "AI Knowledge Builder",
    status: "RAG + Memory System",
    description:
      "A knowledge-focused AI assistant designed to give clear explanations, real-world use cases, contextual memory, and structured learning responses.",
    stack: ["Python", "LLMs", "RAG", "Memory", "Vector Search"],
    caseStudy: "#",
    github: "#",
  },
  {
    icon: Code2,
    title: "AI/ML Portfolio Website",
    status: "Personal Brand Platform",
    description:
      "A premium AI/ML engineer portfolio website built with a dark professional interface, glassmorphism cards, project case studies, and recruiter-focused content.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React Icons"],
    caseStudy: "#",
    github: "#",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen overflow-hidden text-white">
      <Background />
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-36">
        <SectionHeading
          label="Projects"
          title="AI/ML projects built with product thinking."
          description="These projects show my focus on artificial intelligence, machine learning, LLM/RAG systems, backend engineering, and full-stack AI product development."
        />

        <div className="mt-12 grid gap-6">
          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <div
                key={project.title}
                className="premium-card rounded-[2rem] p-7 transition duration-300 hover:bg-white/[0.08]"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-5">
                    <div className="h-fit rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4 text-blue-300">
                      <Icon size={30} />
                    </div>

                    <div>
                      <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-200">
                        {project.status}
                      </span>

                      <h2 className="mt-5 text-3xl font-black text-white">
                        {project.title}
                      </h2>

                      <p className="mt-4 max-w-4xl leading-8 text-slate-300">
                        {project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 lg:flex-col">
                    <a
                      href={project.caseStudy}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-100"
                    >
                      Case Study
                      <ArrowUpRight size={16} />
                    </a>

                    <a
                      href={project.github}
                      target={project.github.startsWith("http") ? "_blank" : undefined}
                      rel={
                        project.github.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                    >
                      <FaGithub size={16} />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}