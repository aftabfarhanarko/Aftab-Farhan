import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aftabfarhan.tech"),

  title: {
    default: "Aftab Farhan Arko | Full Stack Developer & Technical Lead",
    template: "%s | Aftab Farhan Arko",
  },

  description:
    "Full Stack Developer and Technical Lead specializing in Next.js, React, TypeScript, Node.js, NestJS, PostgreSQL and scalable web applications.",

  keywords: [
    "Aftab Farhan Arko",
    "Full Stack Developer",
    "Technical Lead",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Software Engineer",
    "PostgreSQL",
    "NestJS",
    "Portfolio",
  ],

  authors: [
    {
      name: "Aftab Farhan Arko",
      url: "https://www.aftabfarhan.tech",
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
    url: "https://www.aftabfarhan.tech",
    siteName: "Aftab Farhan Arko",
    title: "Aftab Farhan Arko | Full Stack Developer & Technical Lead",
    description:
      "Full Stack Developer and Technical Lead specializing in Next.js, React, TypeScript, Node.js, NestJS, PostgreSQL and scalable web applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aftab Farhan Arko — Full Stack Developer & Technical Lead Portfolio",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aftab Farhan Arko | Full Stack Developer & Technical Lead",
    description:
      "Full Stack Developer and Technical Lead specializing in Next.js, React, TypeScript, Node.js, NestJS, PostgreSQL and scalable web applications.",
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
    canonical: "https://www.aftabfarhan.tech",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
