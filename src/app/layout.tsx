import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://roshanthore.dev"),
  title: "Roshan Thore — Frontend Developer | React & Next.js",
  description:
    "Frontend Developer with 3.5+ years of experience building web applications using React.js, Next.js, TypeScript, and modern JavaScript. SDE at INK IN CAPS.",
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
    title: "Roshan Thore — Frontend Developer | React & Next.js",
    description:
      "Frontend Developer with 3.5+ years of experience building web applications with React.js, Next.js, and TypeScript.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Roshan Thore"
      }
    ]
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
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#090a0f] text-slate-100">{children}</body>
    </html>
  );
}
