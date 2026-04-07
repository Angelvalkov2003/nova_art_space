import type { Metadata } from "next";
import { absoluteOgImageUrl, siteConfig } from "../lib/site-config";

const subitiyaOgImage = absoluteOgImageUrl("/metadatapicks/sybitiq.webp");

export const metadata: Metadata = {
  title: "Събития - nOva art space",
  description:
    "Премиум пространство за събития в София: концерти, коктейли, семинари и продуктови формати.",
  alternates: {
    canonical: `${siteConfig.url}/subitiya`,
  },
  openGraph: {
    title: "Събития - nOva art space",
    description:
      "Премиум пространство за събития в София: концерти, коктейли, семинари и продуктови формати.",
    url: `${siteConfig.url}/subitiya`,
    siteName: siteConfig.name,
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: subitiyaOgImage,
        width: 1200,
        height: 630,
        alt: "Събития в nOva art space",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Събития - nOva art space",
    description:
      "Премиум пространство за събития в София: концерти, коктейли, семинари и продуктови формати.",
    images: [subitiyaOgImage],
  },
};

export default function SubitiyaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
