import type { Metadata } from "next";
import { HomeExperience } from "@/components/atlas/HomeExperience";

export const metadata: Metadata = {
  title: "TeraFab Atlas — Interactive Industrial Scale Explorer",
  description:
    "A cinematic interactive homepage exploring the scale, compute, energy, construction and infrastructure implications of a proposed TeraFab-class industrial project.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "TeraFab Atlas",
    description: "Cinematic data storytelling for TeraFab-scale industrial infrastructure.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TeraFab Atlas",
  description: "Interactive industrial atlas for TeraFab scale, compute, energy and infrastructure analysis.",
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeExperience />
    </>
  );
}
