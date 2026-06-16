import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl border-t border-white/10 px-6 py-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-white">
            Pavan Alakunta<span className="text-blue-400">.</span>
          </p>

          <p className="mt-2 text-sm text-slate-400">
            AI & ML Engineer • LLM/RAG Developer • AI Full Stack Developer
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Pavan09-Is-Here"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-white/10 bg-white/[0.05] p-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <FaGithub size={18} />
          </a>

          <a
  href="https://www.linkedin.com/in/pavan-alakunta"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
            className="rounded-full border border-white/10 bg-white/[0.05] p-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Pavan Alakunta. All rights reserved.</p>
        <p>Built with Next.js, TypeScript, Tailwind CSS, and Motion.</p>
      </div>
    </footer>
  );
}