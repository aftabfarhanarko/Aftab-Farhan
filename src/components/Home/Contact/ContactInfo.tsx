"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 11 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function ContactCardItem({ item }: { item: { icon: React.ReactNode; label: string; value: string; href: string } }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, show: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 5;

    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 0, y: 0, show: false });
  };

  return (
    <motion.a
      href={item.href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      whileHover={{
        borderColor: "rgba(255, 255, 255, 0.12)",
        boxShadow: "0 15px 30px -10px rgba(255, 255, 255, 0.06)",
        x: 4,
      }}
      className="flex items-center gap-4 px-4 py-4.5 rounded-[1.5rem] border border-white/[0.06] bg-[#0E0E10]/85 backdrop-blur-xl transition-all duration-300 relative group overflow-hidden"
    >
      {/* Spotlight */}
      {spotlight.show && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(150px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.04), transparent 80%)`,
          }}
        />
      )}

      {/* Sweep Glare Shine */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

      {/* Spring rotation/scale on icon wrapper */}
      <motion.div 
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-inner flex items-center justify-center text-white/60 group-hover:text-white transition-colors shrink-0"
        style={{ transform: "translateZ(20px)" }}
      >
        {item.icon}
      </motion.div>

      <div className="min-w-0" style={{ transform: "translateZ(15px)" }}>
        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1 font-mono">{item.label}</p>
        <p className="text-sm font-bold text-white/70 group-hover:text-white truncate transition-colors">{item.value}</p>
      </div>
    </motion.a>
  );
}

export default function ContactInfo() {
  return (
    <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-4">
      {/* Opportunities Badge */}
      <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-green-500/20 bg-green-500/5 select-none">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
        </span>
        <span className="text-sm text-green-300/80 font-mono">
          open_to_opportunities=<span className="text-green-400">true</span>
        </span>
      </div>

      {/* Paragraph Card with custom border/background */}
      <div className="p-6 rounded-[1.5rem] border border-white/[0.06] bg-[#0E0E10]/85 backdrop-blur-xl">
        <p className="text-sm text-white/50 leading-relaxed font-medium">
          Whether it&apos;s a{" "}
          <span className="text-white font-semibold">freelance project</span>, a{" "}
          <span className="text-white font-semibold">full-time role</span>, or just a
          technical conversation, my inbox is open.
        </p>
      </div>

      {/* Social Links with Spring-Twists */}
      <div className="flex gap-3 mb-2">
        {[
          { icon: <LinkedinIcon />, href: "https://linkedin.com/in/arko", color: "hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5" },
          { icon: <GithubIcon />, href: "https://github.com/aftabfarhanarko", color: "hover:text-white hover:border-white/30 hover:bg-white/5" },
          { icon: <WhatsAppIcon />, href: "https://wa.me/880613410880", color: "hover:text-green-400 hover:border-green-400/30 hover:bg-green-400/5" },
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className={`w-11 h-11 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-white/40 transition-colors ${social.color}`}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>

      {/* Contact Cards */}
      {[
        { icon: <Mail size={18} />, label: "Email", value: "aftabfarhan324@gmail.com", href: "mailto:aftabfarhan324@gmail.com" },
        { icon: <MapPin size={18} />, label: "Location", value: "Rangpur, Bangladesh", href: "#" },
        { icon: <Phone size={18} />, label: "Phone", value: "+8801613410880", href: "tel:+8801613410880" },
      ].map((item, i) => (
        <ContactCardItem key={i} item={item} />
      ))}
    </motion.div>
  );
}
