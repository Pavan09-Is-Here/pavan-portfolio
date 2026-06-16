"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Brain,
  Code2,
  Download,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const highlights = [
  "Machine Learning",
  "LLM/RAG Systems",
  "AI Full Stack Products",
];

const stats = [
  { value: "AI/ML", label: "Primary Focus" },
  { value: "RAG", label: "Core Skill" },
  { value: "35+", label: "Team Led" },
];

export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-24 pt-32">
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-200">
            <Sparkles size={16} />
            AI & ML Engineer Portfolio
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl">
            Building intelligent AI systems for{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              real understanding.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            I&apos;m Pavan Alakunta, an AI & ML Engineer focused on machine
            learning, LLM/RAG applications, and full-stack AI products using
            Python, FastAPI, Next.js, Supabase, and modern AI tooling.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105 hover:shadow-blue-500/30"
            >
              View Projects
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </a>

            <a
              href="/Pavan_Alakunta_CV.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              <Download size={18} />
              Download CV
            </a>

            <a
              href="https://github.com/Pavan09-Is-Here"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/10"
            >
              <FaGithub size={18} />
              GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-2xl" />

          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto h-72 w-72 overflow-hidden rounded-full border border-white/10 bg-white/10 shadow-2xl shadow-blue-500/20 md:h-80 md:w-80">
              <Image
                src="/profile.png"
                alt="Pavan Alakunta professional portrait"
                width={700}
                height={700}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="mt-7">
              <h2 className="text-3xl font-black tracking-tight text-white">
                Pavan Alakunta
              </h2>

              <p className="mt-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-lg font-bold text-transparent">
                AI & ML Engineer
              </p>

              <p className="mt-3 text-sm font-medium text-slate-400">
                Machine Learning • LLM/RAG Systems • AI Full Stack Products
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center"
                >
                  <div className="text-xl font-black text-white">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-xs text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-blue-400/10 p-4 text-left">
                <Brain className="text-blue-300" size={24} />

                <p className="mt-3 text-sm font-bold text-white">
                  AI/ML Systems
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Learning systems, ML workflows, and intelligent AI products.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-violet-400/10 p-4 text-left">
                <Code2 className="text-violet-300" size={24} />

                <p className="mt-3 text-sm font-bold text-white">
                  Full Stack AI
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Frontend, backend, database, APIs, and deployment.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}