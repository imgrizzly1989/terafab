import type { Metadata } from "next";
import { HomeExperience } from "@/components/atlas/HomeExperience";

export const metadata: Metadata = {
  title: "TeraFab Atlas — Industrial Intelligence Platform",
  description:
    "Industrial intelligence software for evaluating factory-scale infrastructure, site constraints, compute, power, logistics and evidence-backed megaproject scenarios.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "TeraFab Atlas",
    description: "Industrial intelligence software for TeraFab-scale infrastructure decisions.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TeraFab Atlas",
  applicationCategory: "BusinessApplication",
  description: "Industrial intelligence platform for site, infrastructure, compute, energy and evidence analysis.",
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeExperience />
    </>
  );
}
