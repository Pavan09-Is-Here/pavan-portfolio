import {
  Brain,
  Code2,
  Database,
  Server,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const skillGroups = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Core AI/ML concepts, model workflows, data preprocessing, evaluation thinking, and intelligent system design.",
    skills: [
      "Machine Learning",
      "Supervised Learning",
      "Unsupervised Learning",
      "Classification",
      "Regression",
      "Model Evaluation",
      "Feature Engineering",
      "Data Preprocessing",
    ],
  },
  {
    icon: Sparkles,
    title: "LLM & RAG Systems",
    description:
      "Building AI applications using large language models, retrieval, embeddings, memory, and document-based knowledge.",
    skills: [
      "LLM Applications",
      "RAG Pipelines",
      "Prompt Engineering",
      "Embeddings",
      "Vector Search",
      "Chat Memory",
      "Document Retrieval",
      "OpenAI API",
    ],
  },
  {
    icon: Server,
    title: "Backend Engineering",
    description:
      "Developing backend APIs, AI service layers, database logic, PDF generation, and scalable server-side systems.",
    skills: [
      "Python",
      "FastAPI",
      "REST APIs",
      "Uvicorn",
      "API Integration",
      "PDF Generation",
      "Authentication Logic",
      "Environment Variables",
    ],
  },
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Creating modern, responsive, polished interfaces for AI products using professional frontend technologies.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Responsive UI",
      "Component Design",
      "Animations",
      "UX Thinking",
    ],
  },
  {
    icon: Database,
    title: "Database & Storage",
    description:
      "Working with databases, user data, chat history, project storage, and AI application persistence.",
    skills: [
      "Supabase",
      "SQL Basics",
      "Chat History",
      "User Data",
      "File Storage",
      "Database Tables",
      "API Data Flow",
      "Data Management",
    ],
  },
  {
    icon: Terminal,
    title: "Tools & Deployment",
    description:
      "Using developer tools for version control, local setup, package management, deployment, and project delivery.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Node.js",
      "npm",
      "Vercel",
      "Terminal",
      "Project Structure",
    ],
  },
];

const topSkills = [
  "AI & ML Engineering",
  "Machine Learning",
  "LLM Applications",
  "RAG Systems",
  "Python",
  "FastAPI",
  "Next.js",
  "TypeScript",
  "Supabase",
  "OpenAI API",
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-7xl border-t border-white/10 px-6 py-24"
    >
      <SectionHeading
        label="Skills"
        title="Technical stack for building AI-powered products."
        description="My skills are organized around AI/ML engineering first, supported by full-stack development, backend systems, databases, and deployment tools."
      />

      <div className="mt-10 flex flex-wrap gap-3">
        {topSkills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-blue-400/20 bg-blue-400/10 px-5 py-3 text-sm font-medium text-blue-100"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = group.icon;

          return (
            <div
              key={group.title}
              className="premium-card rounded-[2rem] p-7 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.08]"
            >
              <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-blue-300">
                <Icon size={28} />
              </div>

              <h3 className="text-2xl font-black text-white">
                {group.title}
              </h3>

              <p className="mt-4 min-h-[84px] leading-7 text-slate-300">
                {group.description}
              </p>

              <div className="mt-6 grid gap-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <Zap size={15} className="text-blue-300" />
                    <span className="text-sm text-slate-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}