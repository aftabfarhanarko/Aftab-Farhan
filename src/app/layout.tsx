import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

export { metadata, viewport } from "./metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body
        className="min-h-full flex flex-col relative overflow-x-hidden"
        style={{ backgroundColor: "#000000", color: "#ffffff" }}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}