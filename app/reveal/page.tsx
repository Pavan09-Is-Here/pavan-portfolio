import type { Metadata } from "next";
import RevealPortfolio from "@/components/RevealPortfolio";

export const metadata: Metadata = {
  title: "Pavan Alakunta — Reveal",
  description:
    "An interactive reveal portfolio: move across the portrait to resolve the source photograph under the machine's reading of it.",
  // The instrument panel is the canonical home page now. This build stays
  // reachable but out of the index so the two do not compete.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Pavan Alakunta — Reveal",
    description:
      "Move across the portrait to resolve the source photograph under the machine's reading of it.",
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
};

export default function RevealPage() {
  return <RevealPortfolio />;
}
