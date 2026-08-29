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

export const metadata: Metadata = {
  title: "Pavan Alakunta | AI & ML Engineer",
  description:
    "AI & ML Engineer working on the boundary between what a model retrieves and what is actually true. Machine learning, LLM/RAG systems, and full-stack AI products.",
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
      "An interactive reveal portfolio: move across the portrait to resolve the human layer under the machine's reading of it.",
    type: "website",
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
