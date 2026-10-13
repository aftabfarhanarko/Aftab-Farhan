import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aftabfarhan.tech"),

  title: {
    default:
      "Aftab Farhan Arko | Backend Software Engineer | Full Stack Engineer",
    template: "%s | Aftab Farhan Arko",
  },

  description:
    "Backend Software Engineer | Full Stack Engineer | Go (Golang) • Node.js • NestJS • TypeScript • PostgreSQL • System Design • Scalable Backend Systems • API Development • Cloud & DevOps",

  keywords: [
    "Aftab Farhan Arko",
    "Backend Software Engineer",
    "Full Stack Engineer",
    "Go (Golang)",
    "Golang",
    "Node.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "System Design",
    "Scalable Backend Systems",
    "API Development",
    "Cloud & DevOps",
    "Software Engineer",
    "Backend Developer",
    "Microservices",
    "Distributed Systems",
    "Docker",
    "Kubernetes",
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
    title:
      "Aftab Farhan Arko | Backend Software Engineer | Full Stack Engineer",
    description:
      "Backend Software Engineer | Full Stack Engineer | Go (Golang) • Node.js • NestJS • TypeScript • PostgreSQL • System Design • Scalable Backend Systems • API Development • Cloud & DevOps",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aftab Farhan Arko — Backend Software Engineer | Full Stack Engineer Portfolio",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Aftab Farhan Arko | Backend Software Engineer | Full Stack Engineer",
    description:
      "Backend Software Engineer | Full Stack Engineer | Go (Golang) • Node.js • NestJS • TypeScript • PostgreSQL • System Design • Scalable Backend Systems • API Development • Cloud & DevOps",
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
