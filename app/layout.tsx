import type { Metadata } from "next";
import { Inter, Dancing_Script, Montserrat, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieBanner from "./components/CookieBanner";
import { siteConfig } from "./lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default:
      "nOva art space - Съвременна арт галерия в София | Нова арт галерия",
    template: "%s | nOva art space",
  },
  description:
    "nOva art space е съвременна арт галерия и премиум пространство за събития в София. Предлагаме картини, изкуство и галерия в България. Посетете най-добрата арт галерия в София.",
  keywords: [
    "nova art gallery",
    "нова арт галерия",
    "нова арт",
    "арт галерия",
    "галерия",
    "галерия софия",
    "изкуство",
    "картини",
    "галерия българия",
    "красота",
    "art gallery",
    "art gallery sofia",
    "art gallery bulgaria",
    "contemporary art",
    "съвременно изкуство",
    "българско изкуство",
    "галерия за картини",
    "изложби софия",
    "премиум пространство",
    "събития софия",
  ],
  authors: [{ name: "nOva art space" }],
  creator: "nOva art space",
  publisher: "nOva art space",
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "nOva art space - Съвременна арт галерия в София",
    description:
      "Съвременна арт галерия и премиум пространство за събития в София. Картини, изкуство и галерия в България.",
    images: [
      {
        url: `${siteConfig.url}/logo.jpg`,
        width: 1200,
        height: 630,
        alt: "nOva art space - Арт галерия София",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "nOva art space - Съвременна арт галерия в София",
    description:
      "Съвременна арт галерия и премиум пространство за събития в София",
    images: [`${siteConfig.url}/logo.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  // Google Site Verification (optional - only if NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION is set)
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    name: siteConfig.name,
    alternateName: "Нова арт галерия",
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.jpg`,
    image: `${siteConfig.url}/logo.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Изкуство и картини",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Картини и произведения на изкуството",
            category: "Изкуство",
          },
        },
      ],
    },
  };

  return (
    <html lang="bg">
      <body
        className={`${inter.variable} ${dancingScript.variable} ${montserrat.variable} ${playfairDisplay.variable} antialiased`}
      >
        {/* Google Tag Manager - must be in head, loaded beforeInteractive */}
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KG73ZWHJ');
            `,
          }}
        />
        {/* Google Tag Manager (noscript) - immediately after opening body tag */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KG73ZWHJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Google Analytics - loads only if user has consented and NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        <GoogleAnalytics />
        {/* GDPR-compliant Cookie Consent Banner */}
        <CookieBanner />
        {/* Vercel Analytics */}
        <Analytics />
        {children}
      </body>
    </html>
  );
}
