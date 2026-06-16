import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pavan Alakunta | AI & ML Engineer",
  description:
    "Premium portfolio of Pavan Alakunta, an AI & ML Engineer focused on Machine Learning, LLM/RAG systems, and AI full-stack products.",
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
  ],
  authors: [{ name: "Pavan Alakunta" }],
  creator: "Pavan Alakunta",
  openGraph: {
    title: "Pavan Alakunta | AI & ML Engineer",
    description:
      "AI & ML Engineer building intelligent AI systems, LLM/RAG applications, and full-stack AI products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}