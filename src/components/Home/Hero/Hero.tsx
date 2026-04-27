"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// ─── Animation helpers ───────────────────────────────────────────────────────

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.88 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
});

// ─── Fetcher ─────────────────────────────────────────────────────────────────

async function fetchHero() {
  const res = await fetch("/api/hero"); // ← আপনার actual API route দিন
  if (!res.ok) throw new Error("Failed to fetch hero data");
  return res.json();
}

// ─── Social icon map (platform নাম দিয়ে icon বেছে নেয়) ──────────────────────

function SocialIcon({ platform }) {
  const p = platform?.toLowerCase() ?? "";
  if (p.includes("github"))
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  if (p.includes("linkedin"))
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  // fallback: external link icon
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function HeroSkeleton() {
  return (
    <section className="relative mb-32 flex flex-col lg:flex-row items-center justify-between gap-16 -mt-25 min-h-[90vh] animate-pulse">
      <div className="flex-1 flex flex-col gap-6 max-w-2xl">
        <div className="h-4 w-48 bg-foreground/10 rounded" />
        <div className="h-12 w-80 bg-foreground/10 rounded" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-foreground/10 rounded" />
          <div className="h-3 w-5/6 bg-foreground/10 rounded" />
          <div className="h-3 w-4/6 bg-foreground/10 rounded" />
        </div>
        <div className="flex gap-4 mt-1">
          <div className="h-12 w-40 bg-foreground/10 rounded-xl" />
          <div className="h-12 w-36 bg-foreground/10 rounded-xl" />
        </div>
        <div className="flex gap-12 pt-8 mt-3 border-t border-white/10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-1">
              <div className="h-8 w-12 bg-foreground/10 rounded" />
              <div className="h-2 w-20 bg-foreground/10 rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex-shrink-0 flex items-center justify-center w-[380px] h-[380px]">
        <div className="w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full bg-foreground/10" />
      </div>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Hero() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hero"],
    queryFn: fetchHero,
    staleTime: 1000 * 60 * 5, // 5 মিনিট cache
  });

  if (isLoading) return <HeroSkeleton />;

  if (isError)
    return (
      <section className="min-h-[90vh] flex items-center justify-center">
        <p className="text-foreground/40 text-sm">
          Failed to load hero data. Please try again.
        </p>
      </section>
    );

  // ── API থেকে আসা data destructure ──
  const { name, title, description, image, socials = [], stats = [] } = data;

  return (
    <section
      id="hero"
      className="relative mb-32 flex flex-col lg:flex-row items-center justify-between gap-16 -mt-25  min-h-[90vh]"
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-foreground/5 blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-foreground/4 blur-[120px] -z-10 pointer-events-none" />

      {/* === LEFT COLUMN === */}
      <div className="flex-1 flex flex-col gap-6 z-10 max-w-2xl order-2 md:order-1">
        {/* Greeting */}
        <motion.p
          {...fadeLeft(0.1)}
          className="text-lg font-medium text-foreground/50 tracking-wide"
        >
          Hi, I&apos;m <span className="text-foreground font-bold">{name}</span>
        </motion.p>

        <motion.div {...fadeLeft(0.18)}>
          <h1 className="text-3xl md:text-5xl">
            <span className="block text-foreground">{title}</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          {...fadeLeft(0.34)}
          className="text-sm text-foreground/90 max-w-lg leading-[1.85]"
        >
          {description}
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-4 mt-1">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2.5 rounded-xl bg-foreground px-7 py-3.5 text-sm font-black text-background hover:bg-foreground/90 transition-colors"
          >
            <svg
              xmlns=""
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-y-0.5 transition-transform duration-200"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download Resume
          </motion.a>
          <motion.a
            href="#project"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-xl border border-foreground/40 px-7 py-3.5 text-sm font-black text-foreground/80 hover:bg-foreground/8 hover:border-foreground hover:text-foreground transition-all"
          >
            View Projects →
          </motion.a>
        </motion.div>

        {/* Stats — dynamic */}
        <motion.div
          {...fadeUp(0.6)}
          className="flex gap-12 pt-8 mt-3 border-t border-white/10"
        >
          {stats.map(({ id, value, label }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.65 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group cursor-default"
            >
              <div className="text-3xl font-black text-foreground tracking-tighter group-hover:text-foreground transition-colors duration-300">
                {value}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.10em] mt-1.5">
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* === RIGHT COLUMN === */}
      <motion.div
        {...scaleIn(0.2)}
        className="relative flex-shrink-0 flex items-center md:mt-0 mt-10 justify-center order-1 md:order-2"
      >
        {/* Terminal card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-24 -left-6 hidden xl:block z-20"
        >
          <div className="rounded-xl border border-white/10 bg-background/85 backdrop-blur-md shadow-2xl overflow-hidden w-52">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-foreground/5 border-b border-foreground/15">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/70" />
              <span className="ml-2 text-[10px] text-foreground/30 font-mono">
                terminal
              </span>
            </div>
            <div className="p-3 font-mono text-[11px] space-y-1">
              <p className="text-foreground/40">$ git status</p>
              <p className="text-foreground">On branch main</p>
              <p className="text-foreground/40">$ deploy --prod</p>
              <p className="text-foreground">✓ Build success</p>
            </div>
          </div>
        </motion.div>

        {/* Current Stack chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-20 right-0 hidden xl:block z-20"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="px-4 py-2.5 rounded-xl bg-background/85 border border-foreground/25 backdrop-blur-md shadow-xl"
          >
            <div className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">
              Current Stack
            </div>
            <div className="text-xs font-bold text-foreground mt-0.5">
              TypeScript · React · Next
            </div>
          </motion.div>
        </motion.div>

        {/* Rings */}
        <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-foreground/15 animate-[spin_80s_linear_infinite]" />
        <div className="absolute w-[420px] h-[420px] rounded-full border border-white/10 animate-[spin_50s_linear_infinite_reverse]" />
        <div className="absolute w-[360px] h-[360px] rounded-full bg-foreground/8 blur-[80px]" />

        {/* Profile image circle */}
        <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full border-[3px] border-foreground/60 p-2.5 shadow-[0_0_60px_rgba(57,255,20,0.2),inset_0_0_40px_rgba(57,255,20,0.05)] bg-background z-10 group">
          <div className="w-full h-full rounded-full overflow-hidden bg-foreground/5 relative">
            <Image
              src={image}
              alt={`${name} - ${title}`}
              fill
              sizes="(max-width: 768px) 340px, 380px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>

          {/* Social links bottom arc — dynamic */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2 rounded-full bg-background/95 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-20 whitespace-nowrap">
            {socials.map((social, i) => (
              <div key={social.id} className="flex items-center gap-3">
                {i > 0 && <span className="w-px h-3 bg-foreground/20" />}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-black text-foreground/70 hover:text-foreground transition-colors"
                >
                  <SocialIcon platform={social.platform} />
                  {social.platform}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Floating icon badges */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 right-2 p-3 rounded-xl bg-background/85 border border-foreground/25 backdrop-blur-md text-foreground/70 shadow-xl z-20 hover:text-foreground hover:scale-110 hover:border-white/50 transition-all duration-200 cursor-pointer"
        >
          <svg
            xmlns=""
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-0 p-3 rounded-xl bg-background/85 border border-foreground/25 backdrop-blur-md text-foreground/70 shadow-xl z-20 hover:text-foreground hover:scale-110 hover:border-white/50 transition-all duration-200 cursor-pointer"
        >
          <svg
            xmlns=""
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-background/85 border border-foreground/25 backdrop-blur-md text-foreground/70 shadow-xl z-20 hover:text-foreground hover:scale-110 hover:border-white/50 transition-all duration-200 cursor-pointer"
        >
          <svg
            xmlns=""
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="3" x2="21" y1="9" y2="9" />
            <line x1="9" x2="9" y1="21" y2="9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
