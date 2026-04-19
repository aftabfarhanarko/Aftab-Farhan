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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased selection:bg-zinc-100 selection:text-zinc-900 dark:selection:bg-zinc-800 dark:selection:text-zinc-50`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-50">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md dark:bg-black/80">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <a href="#hero" className="text-lg font-bold tracking-tight">Arko.</a>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-medium overflow-x-auto pb-2 sm:pb-0">
              <a href="#about" className="transition-colors hover:text-zinc-500 whitespace-nowrap">About</a>
              <a href="#skill" className="transition-colors hover:text-zinc-500 whitespace-nowrap">Skill</a>
              <a href="#client-project" className="transition-colors hover:text-zinc-500 whitespace-nowrap">Client Project</a>
              <a href="#project" className="transition-colors hover:text-zinc-500 whitespace-nowrap">Project</a>
              <a href="#contact" className="transition-colors hover:text-zinc-500 whitespace-nowrap">Contact</a>
            </div>
          </nav>
        </header>
        <main className="flex-1 pt-20">
          {children}
        </main>
        <footer className="border-t border-zinc-100 py-8 dark:border-zinc-800">
          <div className="mx-auto max-w-3xl px-6 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Aftab Farhan Arko. Built with Next.js and Tailwind CSS.
          </div>
        </footer>
      </body>
    </html>
  );
}