"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Expertise", href: "/#expertise" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050816]/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-black tracking-tight text-white">
          Pavan<span className="text-blue-400">.</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com/Pavan09-Is-Here"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <FaGithub size={18} />
          </a>

          <a
  href="https://www.linkedin.com/in/pavan-alakunta"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <FaLinkedinIn size={18} />
          </a>

          <a
            href="/#contact"
            className="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-blue-100"
          >
            Contact
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex rounded-full border border-white/10 bg-white/5 p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#050816]/95 px-6 py-5 backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              >
                {link.name}
              </a>
            ))}

            <div className="mt-3 flex gap-3">
              <a
                href="https://github.com/Pavan09-Is-Here"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white"
              >
                <FaGithub size={17} />
                GitHub
              </a>

              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}