import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://aftabfarhanarko.dev"),

  title: {
    default: "Aftab Farhan Arko — Full Stack Developer",
    template: "%s | Aftab Farhan Arko",
  },

  description:
    "Portfolio of Aftab Farhan Arko — a passionate Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, and modern web technologies. Building production-grade applications with clean code and great UX.",

  keywords: [
    "Aftab Farhan Arko",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "JavaScript",
    "Web Developer Bangladesh",
    "Software Engineer",
    "Portfolio",
    "Frontend Developer",
    "Backend Developer",
  ],

  authors: [
    {
      name: "Aftab Farhan Arko",
      url: "https://aftabfarhanarko.dev",
    },
  ],
  creator: "Aftab Farhan Arko",
  publisher: "Aftab Farhan Arko",

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
    url: "https://aftabfarhanarko.dev",
    siteName: "Aftab Farhan Arko",
    title: "Aftab Farhan Arko — Full Stack Developer",
    description:
      "Full Stack Developer building production-grade web apps with React, Next.js, Node.js & more. Explore my projects, skills, and experience.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aftab Farhan Arko — Full Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aftab Farhan Arko — Full Stack Developer",
    description:
      "Full Stack Developer building production-grade web apps with React, Next.js, Node.js & more.",
    images: ["/og-image.png"],
    creator: "@aftabfarhanarko",
    site: "@aftabfarhanarko",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  category: "technology",

  alternates: {
    canonical: "https://aftabfarhanarko.dev",
  },

  verification: {
    google: "your-google-site-verification-token", // 🔁 Google Search Console থেকে নাও
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
