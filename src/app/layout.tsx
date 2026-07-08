import React from "react";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/navbar";
import MouseMoveEffect from "@/components/mouse-move-effect";
import JumpToTop from "@/components/jump-to-top";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import FramerLazyMotion from "@/components/framer-lazy-motion";
import AnalyticsBeacon from "@/components/analytics-beacon";

const inter = Inter({ subsets: ["latin"] });
// const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Yogita Singh – Video Editor & Designer",
    template: "%s | Yogita Singh",
  },
  description:
    "Turning raw footage into visual stories — with style, precision, and a touch of cinematic magic. Yogita Singh specializes in Premiere Pro, After Effects, and Photoshop — delivering cinematic edits, motion graphics, and polished storytelling.",
  keywords: [
    "Yogita Singh",
    "Video Editor",
    "Motion Graphics Designer",
    "Premiere Pro",
    "After Effects",
    "Photoshop",
    "CapCut",
    "Canva",
    "Color Grading",
    "YouTube Video Editing",
    "Course Video Editing",
    "Logo Animation",
    "Visual Storytelling",
    "Freelance Video Editor",
    "India Video Editor",
    "Cinematic Editing",
    "Content Creator",
    "Lower Thirds",
    "Audio Sync",
  ],
  authors: [{ name: "Yogita Singh", url: "mailto:yukta062@gmail.com" }],
  creator: "Yogita Singh",
  publisher: "Yogita Singh",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yogitasingh.vercel.app",
    title: "Yogita Singh – Video Editor & Designer",
    description:
      "Passionate Video Editor and Designer delivering clean, cinematic edits and dynamic visual storytelling using Premiere Pro, After Effects, and Photoshop.",
    siteName: "Yogita Singh Portfolio",
    images: [
      {
        url: "/yogitasingh.jpg",
        width: 1200,
        height: 630,
        alt: "Yogita Singh - Video Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yogita Singh – Video Editor & Designer",
    description:
      "Crafting cinematic edits, motion graphics, and powerful stories. Let's make your content stand out.",
    creator: "@yogita_singh",
    images: ["/yogitasingh.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://yogitasingh.vercel.app",
  },
  category: "Video Editing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#020817" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Yogita Singh",
              url: "https://yogitasingh.vercel.app",
              image: "/yogitasingh.jpg",
              sameAs: [
                "https://linkedin.com/in/yogitasingh",
                "https://youtube.com/@yogitasingh",
              ],
              jobTitle: "Video Editor & Designer",
              knowsAbout: [
                "Video Editing",
                "Motion Graphics",
                "Adobe Premiere Pro",
                "Adobe After Effects",
                "Adobe Photoshop",
                "CapCut",
                "Canva",
                "Color Grading",
                "Audio Syncing",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen text-white`}
        style={{
          background: "#020817",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="grid-background-large min-h-screen">
          <SmoothScroll>
            <FramerLazyMotion>
              <MouseMoveEffect />
              <Navbar />
              <main className="">{children}</main>
              <Footer />
              <JumpToTop />
              <Toaster position="top-center" />
            </FramerLazyMotion>
          </SmoothScroll>
        </div>
        <AnalyticsBeacon />
      </body>
    </html>
  );
}
