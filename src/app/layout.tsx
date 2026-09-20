import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PERSONAL_INFO } from "@/data/portfolioData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(PERSONAL_INFO.siteUrl),
  alternates: {
    canonical: "/"
  },
  title: "Roshan Thore — Frontend Engineer | React & Next.js",
  description:
    "Frontend engineer in Mumbai with 3.5+ years building React and Next.js apps at INK IN CAPS. I own payments and subscriptions on KNKY (30K+ users).",
  keywords: [
    "Roshan Thore",
    "Frontend Developer",
    "Software Development Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "Frontend Engineer Mumbai"
  ],
  authors: [{ name: "Roshan Thore", url: PERSONAL_INFO.siteUrl }],
  creator: "Roshan Thore",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: "Roshan Thore — Frontend Engineer | React & Next.js",
    description:
      "Frontend engineer in Mumbai with 3.5+ years building React and Next.js apps at INK IN CAPS. I own payments and subscriptions on KNKY (30K+ users).",
    type: "profile",
    locale: "en_US",
    url: PERSONAL_INFO.siteUrl,
    siteName: "Roshan Thore",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Roshan Thore — Frontend Engineer, React & Next.js"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Roshan Thore — Frontend Engineer | React & Next.js",
    description:
      "Frontend engineer in Mumbai with 3.5+ years building React and Next.js apps at INK IN CAPS. I own payments and subscriptions on KNKY (30K+ users).",
    images: ["/og.png"]
  }
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${PERSONAL_INFO.siteUrl}/#roshan-thore`,
  name: PERSONAL_INFO.name,
  jobTitle: "Frontend Engineer",
  description: "Frontend engineer building payments, streaming and real-time features for KNKY, a creator monetization platform.",
  knowsAbout: [
    "Frontend engineering",
    "React",
    "Next.js",
    "TypeScript",
    "Payments and subscription billing",
    "HLS adaptive video streaming",
    "WebRTC",
    "Web performance"
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sandip University, Nashik"
  },
  url: PERSONAL_INFO.siteUrl,
  image: `${PERSONAL_INFO.siteUrl}${PERSONAL_INFO.avatar}`,
  sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
  worksFor: { "@type": "Organization", name: "INK IN CAPS" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#090a0f] text-slate-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
