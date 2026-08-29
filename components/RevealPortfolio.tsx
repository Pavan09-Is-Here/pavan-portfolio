"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Project = {
  rank: string;
  title: string;
  stack: string[];
  live?: boolean;
  desc: string;
  meta: [string, string];
  href: string;
};

const projects: Project[] = [
  {
    rank: "01",
    title: "Injection-Resistant Ranking Agent",
    stack: ["Python", "LLM Security", "Ranking"],
    desc: "A ranking agent built to hold its ordering under adversarial input — documents that try to talk the model into promoting them. Treats prompt injection as a ranking-integrity problem rather than a content filter.",
    meta: ["Aug 2026", "Repository"],
    href: "https://github.com/Pavan09-Is-Here/injection-resistant-ranking-agent",
  },
  {
    rank: "02",
    title: "CareerPilot AI",
    stack: ["FastAPI", "SQLAlchemy 2", "Next.js 16", "React 19", "PostgreSQL"],
    live: true,
    desc: "Career automation built around one hard rule: the system never invents a candidate fact. Every claim in a generated CV, cover letter, or application answer traces to a verified facts vault, with compliance-gated job discovery, explainable matching, and safety gates for CAPTCHA, MFA, and irreversible submissions.",
    meta: ["Aug 2026", "Live + Repo"],
    href: "https://careerpilot-ai-jade.vercel.app",
  },
  {
    rank: "03",
    title: "LearnForge AI",
    stack: ["Python", "FastAPI", "TypeScript", "Supabase", "RAG"],
    desc: "An AI learning platform aimed at understanding rather than recall. Structured explanations that carry real-world use, mechanism, trade-offs and examples; document-grounded retrieval over embeddings and vector search; persisted conversations; and export of a session into PDF study material.",
    meta: ["Aug 2026", "Case study"],
    href: "/learnforge-ai",
  },
  {
    rank: "04",
    title: "This Portfolio",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    desc: "Built as an interactive reveal: two renderings of the same subject stacked, with the pointer acting as a retrieval window over the one underneath.",
    meta: ["Aug 2026", "Repository"],
    href: "https://github.com/Pavan09-Is-Here/pavan-portfolio",
  },
];

const capabilities = [
  {
    k: "ML",
    title: "Machine Learning Engineering",
    body: "Model workflows end to end — data preprocessing, feature engineering, supervised and unsupervised methods, classification and regression, and evaluation that reflects how the system will actually be used.",
  },
  {
    k: "RAG",
    title: "Retrieval Systems",
    body: "Document-grounded answering over embeddings and vector search, with memory, citation back to source, and a clear line between what was retrieved and what was generated.",
  },
  {
    k: "LLM",
    title: "LLM Applications",
    body: "Structured prompting, tool and API orchestration, contextual response design, and the guardrails that keep an assistant useful instead of confidently wrong.",
  },
  {
    k: "API",
    title: "Python Backend",
    body: "FastAPI services, AI service layers, REST design, authentication logic, PDF generation, and database connections built to survive being deployed.",
  },
  {
    k: "UI",
    title: "Full-Stack Product",
    body: "Next.js, React and TypeScript on the front, Supabase and PostgreSQL behind it — shipped as one product rather than a model with a page bolted on.",
  },
  {
    k: "SHIP",
    title: "Product Engineering",
    body: "Taking an idea to something people can open: scoping, interface decisions, deployment on Vercel, and the judgement about what to leave out.",
  },
];

const track = [
  {
    who: "LearnForge AI",
    role: "Current · Founder-Engineer",
    title: "Designing and building an AI learning platform",
    lede: "Full ownership from product idea to deployment: the learning experience, the retrieval architecture, and every layer of the stack that carries it.",
    points: [
      "Defined the product concept, user flow, and the shape of a good AI learning response",
      "Built backend APIs in Python and FastAPI against the OpenAI API",
      "Integrated Supabase for conversation history and user data",
      "Built the frontend in Next.js, TypeScript and Tailwind CSS",
    ],
  },
  {
    who: "Centific",
    role: "AI Engineer",
    title: "LLM dataset quality across NLP and generative AI",
    lede: "AI training and annotation workflows for language model datasets — the unglamorous layer that determines whether anything downstream works.",
    points: [
      "Worked across NLP, AI training, and generative AI data quality tasks",
      "Reviewed dataset quality, task consistency, and output accuracy",
      "Evaluated and refined model responses for accuracy and relevance",
      "Supported structured workflows for improving model output",
    ],
  },
  {
    who: "Technical Problem-Solving",
    role: "Independent",
    title: "Expert solutions across programming, mathematics and AI",
    lede: "Answering complex technical and academic queries, which turned out to be the best training available for explaining a hard idea to someone who does not already have it.",
    points: [
      "Solved technical questions across programming, mathematics, and AI topics",
      "Wrote clear explanations for genuinely difficult problems",
      "Sharpened reasoning, debugging, and decomposition",
    ],
  },
];

const keywords = [
  "Machine Learning", "Supervised Learning", "Unsupervised Learning", "Classification",
  "Regression", "Model Evaluation", "Feature Engineering", "Data Preprocessing",
  "LLM Applications", "RAG Pipelines", "Prompt Engineering", "Embeddings",
  "Vector Search", "Chat Memory", "Document Retrieval", "OpenAI API",
  "Python", "FastAPI", "REST APIs", "Uvicorn", "API Integration", "PDF Generation",
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Component Design", "Responsive UI",
  "Supabase", "PostgreSQL", "SQL", "Data Management",
  "Git", "GitHub", "Node.js", "Vercel",
];

const links = [
  { t: "Email", v: "pavanalakunta58@gmail.com", href: "mailto:pavanalakunta58@gmail.com" },
  { t: "GitHub", v: "Pavan09-Is-Here ↗", href: "https://github.com/Pavan09-Is-Here" },
  { t: "LinkedIn", v: "pavan-alakunta ↗", href: "https://www.linkedin.com/in/pavan-alakunta" },
  { t: "Curriculum Vitae", v: "PDF ↗", href: "/Pavan_Alakunta_CV.pdf" },
];

/**
 * Draws the "machine reading" of the portrait: Sobel contour extraction over a
 * blurred luminance pass, plus Bayer 8x8 ordered-dither quantisation, tinted
 * violet. Runs once on load. Returns false if the canvas is unusable (e.g.
 * a tainted origin), in which case the CSS duotone fallback stays visible.
 */
function renderMachineLayer(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  opts: { maxw?: number; levels?: number; edgeGain?: number } = {}
): boolean {
  const MAXW = opts.maxw ?? 1000;
  let w = img.naturalWidth || img.width;
  let h = img.naturalHeight || img.height;
  if (!w || !h) return false;
  if (w > MAXW) {
    h = Math.round((h * MAXW) / w);
    w = MAXW;
  }

  const src = document.createElement("canvas");
  src.width = w;
  src.height = h;
  const sctx = src.getContext("2d", { willReadFrequently: true });
  if (!sctx) return false;
  sctx.drawImage(img, 0, 0, w, h);

  let data: ImageData;
  try {
    data = sctx.getImageData(0, 0, w, h);
  } catch {
    return false;
  }
  const px = data.data;
  const n = w * h;

  const lum = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const j = i * 4;
    lum[i] = (px[j] * 0.299 + px[j + 1] * 0.587 + px[j + 2] * 0.114) / 255;
  }

  // Light box blur, so the gradient traces form rather than sensor noise.
  const blur = new Float32Array(n);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= h) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= w) continue;
          sum += lum[yy * w + xx];
          count++;
        }
      }
      blur[y * w + x] = sum / count;
    }
  }

  const edge = new Float32Array(n);
  let maxE = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const k = y * w + x;
      const tl = blur[k - w - 1];
      const t = blur[k - w];
      const tr = blur[k - w + 1];
      const l = blur[k - 1];
      const r = blur[k + 1];
      const bl = blur[k + w - 1];
      const b = blur[k + w];
      const br = blur[k + w + 1];
      const gx = tr + 2 * r + br - (tl + 2 * l + bl);
      const gy = bl + 2 * b + br - (tl + 2 * t + tr);
      const m = Math.sqrt(gx * gx + gy * gy);
      edge[k] = m;
      if (m > maxE) maxE = m;
    }
  }
  if (maxE > 0) for (let i = 0; i < n; i++) edge[i] /= maxE;

  const bayer = [
    0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
    14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
    51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55,
    23, 61, 29, 53, 21,
  ];

  const out = sctx.createImageData(w, h);
  const op = out.data;
  const LEVELS = opts.levels ?? 4;
  const EDGE_GAIN = opts.edgeGain ?? 1.55;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const thr = (bayer[(y & 7) * 8 + (x & 7)] + 0.5) / 64;

      const v = Math.pow(blur[idx], 1.25);
      let q = Math.floor(v * LEVELS + thr) / LEVELS;
      if (q < 0) q = 0;
      else if (q > 1) q = 1;
      const base = q * 96;

      let em = edge[idx] * EDGE_GAIN;
      em = em < 0.1 ? 0 : Math.pow(Math.min(em, 1), 0.72);
      const eg = em * 235;

      const j = idx * 4;
      op[j] = Math.min(255, base * 0.42 + eg * 0.58);
      op[j + 1] = Math.min(255, base * 0.3 + eg * 0.4);
      op[j + 2] = Math.min(255, base * 1.0 + eg * 1.0);
      op[j + 3] = 255;
    }
  }

  canvas.width = w;
  canvas.height = h;
  const cctx = canvas.getContext("2d");
  if (!cctx) return false;
  cctx.putImageData(out, 0, 0);
  return true;
}

/** Rows point at either an external repo/live site or an internal case study. */
function RowLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("http")) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export default function RevealPortfolio() {
  const heroRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const mstackRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);
  const readoutRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLSpanElement | null>(null);
  const humanRef = useRef<HTMLImageElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const mcanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const portrait = portraitRef.current;
    const mstack = mstackRef.current;
    const glow = glowRef.current;
    const lens = lensRef.current;
    const readout = readoutRef.current;
    const cue = cueRef.current;
    if (!hero || !portrait || !mstack || !glow || !lens || !readout) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Machine layer: contour + dither reconstruction, drawn once.
    const humanImg = humanRef.current;
    const mcanvas = mcanvasRef.current;
    const buildMachine = () => {
      if (humanImg && mcanvas && renderMachineLayer(humanImg, mcanvas)) {
        mstack.classList.add("has-canvas");
      }
    };
    if (humanImg?.complete && humanImg.naturalWidth) buildMachine();
    else humanImg?.addEventListener("load", buildMachine);

    let R = 150;
    let engaged = false;
    let raf: number | null = null;
    let tx = 0.5;
    let ty = 0.38;
    let cx = 0.5;
    let cy = 0.38;

    const sizeLens = () => {
      const w = portrait.getBoundingClientRect().width;
      R = Math.max(96, Math.min(190, w * 0.42));
      mstack.style.setProperty("--r", `${R}px`);
      lens.style.width = lens.style.height = `${R * 1.16}px`;
    };
    sizeLens();
    window.addEventListener("resize", sizeLens);

    const paint = () => {
      const p = portrait.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      mstack.style.setProperty("--px", `${(cx * 100).toFixed(2)}%`);
      mstack.style.setProperty("--py", `${(cy * 100).toFixed(2)}%`);
      const ax = p.left - h.left + cx * p.width;
      const ay = p.top - h.top + cy * p.height;
      glow.style.setProperty("--gx", `${ax}px`);
      glow.style.setProperty("--gy", `${ay}px`);
      lens.style.left = `${ax}px`;
      lens.style.top = `${ay}px`;
      readout.style.left = `${ax + R * 0.72}px`;
      readout.style.top = `${ay + R * 0.72}px`;
    };

    const loop = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      paint();
      if (Math.abs(tx - cx) > 0.0004 || Math.abs(ty - cy) > 0.0004) {
        raf = requestAnimationFrame(loop);
      } else {
        cx = tx;
        cy = ty;
        paint();
        raf = null;
      }
    };
    const nudge = () => {
      if (raf === null) raf = requestAnimationFrame(loop);
    };

    const track_ = (e: PointerEvent) => {
      const p = portrait.getBoundingClientRect();
      tx = Math.max(-0.35, Math.min(1.35, (e.clientX - p.left) / p.width));
      ty = Math.max(-0.35, Math.min(1.35, (e.clientY - p.top) / p.height));
      engaged = true;
      if (reduce) {
        cx = tx;
        cy = ty;
        paint();
      } else nudge();
    };
    const dismissHint = () => hintRef.current?.classList.add("used");
    hero.addEventListener("pointermove", track_);
    hero.addEventListener("pointerdown", track_);
    hero.addEventListener("pointerdown", dismissHint, { once: true });
    hero.addEventListener("pointermove", dismissHint, { once: true });

    // Idle drift before any pointer input, so the reveal announces itself.
    if (!reduce) {
      const t0 = performance.now();
      const drift = (now: number) => {
        if (engaged) return;
        const s = (now - t0) / 1000;
        tx = 0.5 + Math.cos(s * 0.55) * 0.2;
        ty = 0.38 + Math.sin(s * 0.8) * 0.12;
        nudge();
        requestAnimationFrame(drift);
      };
      requestAnimationFrame(drift);
    } else {
      paint();
    }

    const onScroll = () => cue?.classList.toggle("gone", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".rise").forEach((el) => io.observe(el));

    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav a"));
    const spy = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          navLinks.forEach((a) =>
            a.classList.toggle("on", a.getAttribute("href") === `#${e.target.id}`)
          );
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["thesis", "index", "capabilities", "track"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });

    return () => {
      window.removeEventListener("resize", sizeLens);
      window.removeEventListener("scroll", onScroll);
      hero.removeEventListener("pointermove", track_);
      hero.removeEventListener("pointerdown", track_);
      humanImg?.removeEventListener("load", buildMachine);
      io.disconnect();
      spy.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="frame">
        <div className="bar top">
          <a className="mark" href="#top">
            Pavan Alakunta<sup>®</sup>
          </a>
          <nav className="nav">
            <a href="#thesis">Thesis</a>
            <a href="#index">Index</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#track">Track</a>
          </nav>
          <a href="#contact">Contact</a>
          <button
            className="navtoggle"
            aria-expanded={menuOpen}
            aria-controls="navsheet"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
        <div className="bar bot">
          <p className="tagline">
            An AI&nbsp;&amp; ML engineer working on the boundary between what a model
            retrieves and what is actually true.
          </p>
          <span className="scrollcue" ref={cueRef}>
            (Scroll)
          </span>
        </div>

        <div
          className="navsheet"
          id="navsheet"
          hidden={!menuOpen}
        >
          <button className="shut" onClick={() => setMenuOpen(false)}>
            Close
          </button>
          {[
            ["#thesis", "Thesis"],
            ["#index", "Index"],
            ["#capabilities", "Capabilities"],
            ["#track", "Track"],
            ["#contact", "Contact"],
          ].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      </div>

      <header className="hero" id="top" ref={heroRef}>
        <h1 className="ghostname">PAVAN</h1>
        <div className="glow" ref={glowRef} />
        <span className="edgelabel">Move&nbsp;to&nbsp;resolve&nbsp;·&nbsp;AI&nbsp;&amp;&nbsp;ML&nbsp;Engineer</span>
        <div className="portrait" ref={portraitRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="human"
            ref={humanRef}
            src="/portrait.jpg"
            alt="Portrait of Pavan Alakunta"
          />
          <div className="mstack" ref={mstackRef}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="mfallback" src="/portrait.jpg" alt="" />
            <div className="duo" />
            <canvas className="mcanvas" ref={mcanvasRef} />
            <div className="lift" />
            <div className="tex" />
          </div>
        </div>
        <div className="touchhint" ref={hintRef}>
          Drag across to resolve
        </div>
        <div className="lens" ref={lensRef} />
        <div className="readout" ref={readoutRef}>
          Human layer <b>/ resolved</b>
        </div>
      </header>

      <main>
        <section id="thesis" className="rise">
          <div className="eyebrow">
            <span className="n">01</span>
            <span>Thesis</span>
          </div>
          <div className="statement">
            <h2>
              A model&apos;s version of you is a lossy index.{" "}
              <em>Everything I build starts from what can be verified.</em>
            </h2>
            <div className="aside">
              <p>
                I&apos;m <strong>Pavan Alakunta</strong>, an AI&nbsp;&amp; ML engineer. I
                build machine learning systems, LLM and RAG applications, and the
                full-stack products around them — Python and FastAPI on the server,
                Next.js and TypeScript on the surface, Supabase underneath.
              </p>
              <p>
                The work I care about sits at the retrieval boundary: getting a language
                model to answer from grounded documents instead of plausible guesses, and
                making the difference legible to whoever is reading the output.{" "}
                <strong>CareerPilot AI</strong> is that idea taken to its limit — a system
                built so it structurally cannot invent a fact about a candidate.{" "}
                <strong>LearnForge AI</strong> is the same principle aimed at teaching.
              </p>
              <p>
                The portrait above works the same way. What you see by default is the
                machine&apos;s reading of me. What you uncover by moving across it is the
                photograph it was built from.
              </p>
            </div>
          </div>
        </section>

        <section id="index" className="rise">
          <div className="eyebrow">
            <span className="n">02</span>
            <span>Index</span>
            <span style={{ marginLeft: "auto", color: "var(--ash-dim)" }}>
              Ordered by last commit
            </span>
          </div>
          <div className="index">
            {projects.map((p) => (
              <RowLink key={p.rank} href={p.href} className="row">
                <span className="rank">{p.rank}</span>
                <div>
                  <h3>{p.title}</h3>
                  <div className="stack">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                    {p.live && <span className="live">Live</span>}
                  </div>
                </div>
                <p className="desc">{p.desc}</p>
                <span className="meta">
                  {p.meta[0]}
                  <br />
                  {p.meta[1]}
                </span>
                <span className="go">{p.href.startsWith("http") ? "↗" : "→"}</span>
              </RowLink>
            ))}
          </div>
        </section>

        <section id="capabilities" className="rise">
          <div className="eyebrow">
            <span className="n">03</span>
            <span>Capabilities</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            What I actually build with.
          </h2>
          <div className="caps">
            {capabilities.map((c) => (
              <div className="cap" key={c.k}>
                <div className="k">{c.k}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>

          <div className="keywords">
            <div className="kl">Tools, methods and libraries</div>
            <div className="chips">
              {keywords.map((k) => (
                <span key={k}>{k}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="track" className="rise">
          <div className="eyebrow">
            <span className="n">04</span>
            <span>Track</span>
          </div>
          <h2 style={{ marginBottom: "clamp(30px,5vh,52px)" }}>
            Where the practice came from.
          </h2>
          <div className="track">
            {track.map((j) => (
              <div className="job" key={j.who}>
                <div className="who">
                  {j.who}
                  <br />
                  <span style={{ color: "var(--ash-dim)" }}>{j.role}</span>
                </div>
                <div>
                  <h3>{j.title}</h3>
                  <p>{j.lede}</p>
                  <ul>
                    {j.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact rise">
          <div className="eyebrow">
            <span className="n">05</span>
            <span>Contact</span>
          </div>
          <p className="big">
            <a href="mailto:pavanalakunta58@gmail.com">
              Let&apos;s&nbsp;build
              <br />
              something
              <br />
              grounded.
            </a>
          </p>
          <div className="links">
            {links.map((l) => (
              <a
                className="lnk"
                key={l.t}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <div className="t">{l.t}</div>
                <div className="v">{l.v}</div>
              </a>
            ))}
          </div>
          <div className="colophon">
            <span>Open to AI/ML engineering roles, internships and collaboration</span>
            <span>Archivo · IBM Plex Mono · Newsreader</span>
          </div>
        </section>
      </main>
    </>
  );
}
