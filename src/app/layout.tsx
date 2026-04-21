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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased selection:bg-accent/30 selection:text-accent dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 grid-background opacity-20"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] glow-spot opacity-50"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] glow-spot opacity-30"></div>
          <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] glow-spot opacity-20"></div>
        </div>

        <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-accent-muted/30">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <a href="#hero" className="text-lg font-bold tracking-tight text-accent">Arko.</a>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-medium overflow-x-auto pb-2 sm:pb-0">
              <a href="#about" className="text-foreground/60 transition-colors hover:text-accent whitespace-nowrap">About</a>
              <a href="#skill" className="text-foreground/60 transition-colors hover:text-accent whitespace-nowrap">Skill</a>
              <a href="#client-project" className="text-foreground/60 transition-colors hover:text-accent whitespace-nowrap">Client Project</a>
              <a href="#project" className="text-foreground/60 transition-colors hover:text-accent whitespace-nowrap">Project</a>
              <a href="#contact" className="text-foreground/60 transition-colors hover:text-accent whitespace-nowrap">Contact</a>
            </div>
          </nav>
        </header>

        <main className="flex-1 pt-20 relative z-10">
          {children}
        </main>

        <footer className="border-t border-accent-muted/30 py-8 relative z-10 bg-background/80 backdrop-blur-sm">
          <div className="mx-auto max-w-3xl px-6 text-center text-sm text-foreground/40">
            © {new Date().getFullYear()} Aftab Farhan Arko. Built with Next.js and Tailwind CSS.
          </div>
        </footer>
      </body>
    </html>
  );
}