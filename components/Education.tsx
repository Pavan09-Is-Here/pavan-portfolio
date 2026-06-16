import { BookOpen, GraduationCap, Rocket, Trophy } from "lucide-react";
import SectionHeading from "./SectionHeading";

const educationItems = [
  {
    icon: GraduationCap,
    title: "Academic Background",
    description:
      "Focused on computer science, artificial intelligence, machine learning, software engineering, and practical technology skills.",
  },
  {
    icon: BookOpen,
    title: "AI/ML Learning Focus",
    description:
      "Continuously learning machine learning concepts, LLM applications, RAG systems, backend development, and full-stack AI product engineering.",
  },
  {
    icon: Rocket,
    title: "Project-Based Learning",
    description:
      "Learning by building real products like LearnForge AI, portfolio systems, backend APIs, database integrations, and AI-powered workflows.",
  },
  {
    icon: Trophy,
    title: "Professional Goal",
    description:
      "Aiming for AI/ML engineering, AI product engineering, LLM/RAG development, and full-stack AI development roles.",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="mx-auto max-w-7xl border-t border-white/10 px-6 py-24"
    >
      <SectionHeading
        label="Education"
        title="Learning path focused on AI/ML engineering."
        description="My education and self-learning path are focused on building practical AI systems, strong engineering foundations, and real-world projects."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {educationItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="premium-card rounded-[2rem] p-7 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.08]"
            >
              <div className="mb-6 inline-flex rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4 text-blue-300">
                <Icon size={28} />
              </div>

              <h3 className="text-2xl font-black text-white">{item.title}</h3>

              <p className="mt-4 leading-7 text-slate-300">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}