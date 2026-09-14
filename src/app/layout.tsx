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
    "Frontend engineer at INK IN CAPS with 3.5+ years of experience. Owns payments and subscriptions on KNKY, handling 45K+ transactions a year for a creator platform with 30K+ users, and builds with React, Next.js, and TypeScript.",
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
  authors: [{ name: "Roshan Thore" }],
  openGraph: {
    title: "Roshan Thore — Frontend Engineer | React & Next.js",
    description:
      "Frontend engineer at INK IN CAPS with 3.5+ years of experience. Owns payments and subscriptions on KNKY, handling 45K+ transactions a year for a creator platform with 30K+ users, and builds with React, Next.js, and TypeScript.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/profile.jpg",
        width: 900,
        height: 1200,
        alt: "Roshan Thore"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "Roshan Thore — Frontend Engineer | React & Next.js",
    description:
      "Frontend engineer at INK IN CAPS with 3.5+ years of experience. Owns payments and subscriptions on KNKY, handling 45K+ transactions a year for a creator platform with 30K+ users, and builds with React, Next.js, and TypeScript.",
    images: ["/profile.jpg"]
  }
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL_INFO.name,
  jobTitle: "Software Development Engineer",
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
