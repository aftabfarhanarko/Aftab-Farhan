import { Bai_Jamjuree } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

export { metadata, viewport } from "./metadata";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${baiJamjuree.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}