import { Download, Mail, MapPin, Send, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const contactLinks = [
  {
    icon: Mail,
    title: "Email",
    value: "pavanalakunta58@gmail.com",
    href: "mailto:pavanalakunta58@gmail.com",
  },
  {
    icon: FaGithub,
    title: "GitHub",
    value: "github.com/Pavan09-Is-Here",
    href: "https://github.com/Pavan09-Is-Here",
  },
  {
  icon: FaLinkedinIn,
  title: "LinkedIn",
  value: "linkedin.com/in/pavan-alakunta",
  href: "https://www.linkedin.com/in/pavan-alakunta/",
},
  {
    icon: MapPin,
    title: "Location",
    value: "United Kingdom",
    href: "#",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl border-t border-white/10 px-6 py-24"
    >
      <SectionHeading
        label="Contact"
        title="Let’s build intelligent AI products."
        description="I’m open to AI/ML engineering roles, internships, product opportunities, and collaborations around machine learning, LLM/RAG systems, and full-stack AI applications."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="premium-card rounded-[2rem] p-8">
          <div className="mb-6 inline-flex rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4 text-blue-300">
            <Sparkles size={30} />
          </div>

          <h3 className="text-3xl font-black text-white">
            Available for AI/ML opportunities.
          </h3>

          <p className="mt-5 leading-8 text-slate-300">
            I’m focused on growing as an AI & ML Engineer by building real AI
            products, improving machine learning knowledge, and developing
            useful LLM/RAG applications with strong full-stack foundations.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:pavanalakunta58@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-blue-100"
            >
              <Mail size={18} />
              Email Me
            </a>

            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/15"
            >
              <Download size={18} />
              Download CV
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          {contactLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                <div className="flex items-center gap-5">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-blue-300">
                    <Icon size={24} />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                      {item.title}
                    </p>

                    <p className="mt-2 font-semibold text-slate-200 transition group-hover:text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}

          <div className="rounded-[2rem] border border-blue-400/20 bg-blue-400/10 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-blue-400/10 p-4 text-blue-300">
                <Send size={24} />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  Best contact method
                </h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Email is the best way to contact me for AI/ML roles,
                  internships, collaborations, and project opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}