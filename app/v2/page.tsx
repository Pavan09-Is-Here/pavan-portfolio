import type { Metadata } from "next";
import InstrumentHome from "@/components/InstrumentHome";
import "../v2.css";

export const metadata: Metadata = {
  title: "Pavan Alakunta — Instrument Panel",
  description:
    "AI & ML Engineer. Every claim on this page is a link you can open or a number from a run you can reproduce.",
  // Staging route under review. Keep it out of the index until it replaces
  // the home page, so the two do not compete as duplicate content.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Pavan Alakunta — Instrument Panel",
    description:
      "Systems, measurements and findings, stated as readouts rather than claims.",
    // Next replaces the parent openGraph wholesale rather than merging it, so
    // the image has to be restated here or social cards render without one.
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Pavan Alakunta — AI & ML Engineer",
      },
    ],
    type: "website",
  },
};

export default function V2Page() {
  return <InstrumentHome />;
}
