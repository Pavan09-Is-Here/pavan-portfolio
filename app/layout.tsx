import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import "./reveal.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400", "500"],
  variable: "--font-newsreader",
  display: "swap",
});

// Absolute URLs for og:image. Vercel supplies the production host at build
// time; set NEXT_PUBLIC_SITE_URL to override with a custom domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pavan Alakunta | AI & ML Engineer",
  description:
    "AI & ML Engineer working on the boundary between what a model retrieves and what is actually true. Machine learning, retrieval systems, eval harnesses, and the full-stack products around them.",
  keywords: [
    "Pavan Alakunta",
    "AI Engineer",
    "ML Engineer",
    "Machine Learning Engineer",
    "LLM Developer",
    "RAG Developer",
    "AI Full Stack Developer",
    "Next.js Developer",
    "FastAPI Developer",
    "LearnForge AI",
    "CareerPilot AI",
  ],
  authors: [{ name: "Pavan Alakunta" }],
  creator: "Pavan Alakunta",
  openGraph: {
    title: "Pavan Alakunta | AI & ML Engineer",
    description:
      "Systems, measurements and findings. Every claim is a link you can open or a number from a run you can reproduce.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Pavan Alakunta — AI & ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavan Alakunta | AI & ML Engineer",
    description:
      "Machine learning, retrieval systems, and the measurements behind them.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plex.variable} ${newsreader.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
