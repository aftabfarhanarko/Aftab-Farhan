import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Threads from "@/components/Threads";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arko's Portfolio",
  description: "A professional portfolio of Aftab Farhan Arko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased selection:bg-zinc-800 selection:text-zinc-50 dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-zinc-50 relative">
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">      
          <Threads
            amplitude={1.5}
            distance={0.2}
            enableMouseInteraction={true}
            color={[1, 1, 1]}
          />
        </div>

        <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-zinc-800/50">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <a href="#hero" className="text-lg font-bold tracking-tight text-white">Arko.</a>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-medium overflow-x-auto pb-2 sm:pb-0">
              <a href="#about" className="text-zinc-400 transition-colors hover:text-white whitespace-nowrap">About</a>
              <a href="#skill" className="text-zinc-400 transition-colors hover:text-white whitespace-nowrap">Skill</a>
              <a href="#client-project" className="text-zinc-400 transition-colors hover:text-white whitespace-nowrap">Client Project</a>
              <a href="#project" className="text-zinc-400 transition-colors hover:text-white whitespace-nowrap">Project</a>
              <a href="#contact" className="text-zinc-400 transition-colors hover:text-white whitespace-nowrap">Contact</a>
            </div>
          </nav>
        </header>

        <main className="flex-1 pt-20 relative z-10">
          {children}
        </main>

        <footer className="border-t border-zinc-800 py-8 relative z-10 bg-black">
          <div className="mx-auto max-w-3xl px-6 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Aftab Farhan Arko. Built with Next.js and Tailwind CSS.
          </div>
        </footer>
      </body>
    </html>
  );
}