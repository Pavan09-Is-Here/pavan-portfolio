import {
  BriefcaseBusiness,
  Brain,
  Code2,
  GraduationCap,
  Users,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    icon: Brain,
    title: "AI & ML Project Builder",
    company: "LearnForge AI",
    period: "Current Project",
    description:
      "Building an AI-powered education platform focused on real understanding, structured learning responses, RAG-based retrieval, chat memory, and PDF generation.",
    points: [
      "Designed the product idea, user flow, and AI learning experience.",
      "Built backend APIs using Python, FastAPI, and OpenAI API.",
      "Integrated Supabase for storing conversations and user data.",
      "Developed frontend using Next.js, TypeScript, and Tailwind CSS.",
    ],
  },
  {
    icon: Users,
    title: "AI Trainer / Annotation Team Lead",
    company: "LLM Dataset & AI Training Work",
    period: "Professional Experience",
    description:
      "Managed AI training and annotation workflows for LLM datasets across NLP and generative AI tasks.",
    points: [
      "Managed a 35-member team of annotators and AI trainers.",
      "Worked on NLP, AI training, and generative AI data quality tasks.",
      "Reviewed dataset quality, task consistency, and output accuracy.",
      "Supported structured workflows for improving AI model responses.",
    ],
  },
  {
    icon: Code2,
    title: "Technical AI / Academic Problem Solver",
    company: "Technical Problem-Solving Work",
    period: "Professional Experience",
    description:
      "Provided expert-level solutions for complex technical, mathematical, and AI-related academic queries.",
    points: [
      "Solved technical questions across programming, mathematics, and AI topics.",
      "Created clear explanations for complex problem-solving tasks.",
      "Improved ability to break down difficult concepts into understandable steps.",
      "Built strong reasoning, debugging, and explanation skills.",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-7xl border-t border-white/10 px-6 py-24"
    >
      <SectionHeading
        label="Experience"
        title="Experience shaped around AI, ML, and product building."
        description="My background combines hands-on AI product development, LLM data work, team leadership, and technical problem-solving."
      />

      <div className="mt-12 grid gap-6">
        {experiences.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="premium-card rounded-[2rem] p-7 transition duration-300 hover:bg-white/[0.08]"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-5">
                  <div className="h-fit rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4 text-blue-300">
                    <Icon size={28} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-blue-200">{item.company}</p>

                    <p className="mt-4 max-w-3xl leading-7 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="w-fit rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300">
                  {item.period}
                </div>
              </div>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {item.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <p className="text-sm leading-6 text-slate-300">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-[2rem] border border-blue-400/20 bg-blue-400/10 p-7">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-blue-400/10 p-4 text-blue-300">
            <BriefcaseBusiness size={26} />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">
              Career Direction
            </h3>

            <p className="mt-3 max-w-4xl leading-8 text-slate-300">
              My current focus is growing as an AI & ML Engineer by building
              real AI products, improving machine learning knowledge, developing
              LLM/RAG systems, and creating full-stack applications that solve
              practical problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}