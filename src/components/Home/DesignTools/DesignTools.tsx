"use client";
import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  PenTool,
  Layers,
  Brush,
  Play,
  Code2,
  Globe,
  Sparkles,
  StickyNote,
  Presentation,
  Megaphone,
  ArrowUpRight,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "@/components/Common/SectionHeader";

/* ─── Brand logos ─────────────────────────────────── */
const FigmaLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 38 57" fill="none" className={className} aria-hidden="true">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z" fill="#1ABCFE" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0Z" fill="#0ACF83" />
    <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19Z" fill="#FF7262" />
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#F24E1E" />
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#A259FF" />
  </svg>
);

const PixsoLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#6C5CE7" />
    <path d="M12 14h14a8 8 0 0 1 0 16H12V14Z" fill="white" opacity="0.9" />
    <circle cx="34" cy="34" r="6" fill="#00CEC9" />
    <rect x="12" y="34" width="14" height="6" rx="3" fill="white" opacity="0.6" />
  </svg>
);

/* ─── Data ────────────────────────────────────────── */
/*
  EDIT THE LEVELS to match your real skill:
  5 = Expert, 4 = Advanced, 3 = Proficient
*/
type Level = 3 | 4 | 5;
const levelLabel: Record<Level, string> = {
  5: "Expert",
  4: "Advanced",
  3: "Proficient",
};

interface Capability {
  name: string;
  detail: string;
}

interface Tool {
  id: string;
  name: string;
  group: "design" | "build" | "collab";
  Icon: LucideIcon;
  color: string;
  level: Level;
  tagline: string;
  description: string;
  capabilities: Capability[];
}

const groups: { id: Tool["group"]; label: string }[] = [
  { id: "design", label: "Design" },
  { id: "build", label: "Build and ship" },
  { id: "collab", label: "Collaborate and present" },
];

const tools: Tool[] = [
  {
    id: "design",
    name: "Figma Design",
    group: "design",
    Icon: Layers,
    color: "#F24E1E",
    level: 5,
    tagline: "Interface design, systems and prototyping",
    description:
      "My home base. I build scalable design systems, responsive layouts and interactive prototypes that are ready for production.",
    capabilities: [
      { name: "Auto layout & constraints", detail: "Responsive frames that reflow cleanly across breakpoints." },
      { name: "Components, variants & properties", detail: "Reusable building blocks with states, sizes and toggles." },
      { name: "Variables & modes", detail: "Design tokens for color, spacing and type, with light and dark modes." },
      { name: "Prototyping & Smart Animate", detail: "Clickable flows with transitions to test before development." },
      { name: "Shared libraries & styles", detail: "One source of truth that stays in sync across files and teams." },
      { name: "Plugins & Community files", detail: "Extend the workflow with plugins, widgets and starter kits." },
    ],
  },
  {
    id: "draw",
    name: "Figma Draw",
    group: "design",
    Icon: Brush,
    color: "#FF7262",
    level: 4,
    tagline: "Illustration inside the design file",
    description:
      "Custom icons, spot illustrations and expressive artwork, created next to the UI so everything stays on brand.",
    capabilities: [
      { name: "Brushes & textures", detail: "A hand-drawn feel without leaving the design file." },
      { name: "Strokes, gradients & fills", detail: "Richer strokes and layered fills for expressive artwork." },
      { name: "Custom icons & illustrations", detail: "On-brand icon sets and spot illustrations built as vectors." },
      { name: "Vector editing & transforms", detail: "Precise control for clean, scalable shapes." },
    ],
  },
  {
    id: "motion",
    name: "Figma Motion",
    group: "design",
    Icon: Play,
    color: "#7C3AED",
    level: 3,
    tagline: "Timeline-based animation",
    description:
      "Motion design on the canvas: micro-interactions and transitions that make an interface feel responsive and polished.",
    capabilities: [
      { name: "Timeline animation", detail: "Keyframe motion designed directly on the canvas." },
      { name: "Reusable animation systems", detail: "Shared motion presets that keep animation consistent." },
      { name: "Micro-interactions", detail: "Loaders, hover states and feedback that make UI feel alive." },
      { name: "Handoff-ready motion", detail: "Motion intent that engineers can read and build from." },
    ],
  },
  {
    id: "devmode",
    name: "Dev Mode",
    group: "build",
    Icon: Code2,
    color: "#0ACF83",
    level: 5,
    tagline: "Design-to-code handoff",
    description:
      "I design with the engineer in mind. Dev Mode and Code Connect keep what I design and what ships closely aligned.",
    capabilities: [
      { name: "Inspect specs & measurements", detail: "Spacing, sizes and typography read straight from the design." },
      { name: "Code Connect", detail: "Maps design components to real components in the codebase." },
      { name: "Ready-for-dev statuses", detail: "Clear signals on what is final and what to build next." },
      { name: "Compare changes", detail: "See exactly what changed between design versions." },
      { name: "Variables in Dev Mode", detail: "Tokens exposed to developers, matching the design system." },
      { name: "Figma for VS Code", detail: "Open specs and assets without leaving the editor." },
    ],
  },
  {
    id: "sites",
    name: "Figma Sites",
    group: "build",
    Icon: Globe,
    color: "#0891B2",
    level: 4,
    tagline: "Design and publish websites",
    description:
      "Turn finished designs into live, responsive pages straight from the canvas, ideal for landing pages and launches.",
    capabilities: [
      { name: "Design to live site", detail: "Turn Figma designs into published pages." },
      { name: "Responsive layouts", detail: "Auto layout and breakpoints keep pages flexible." },
      { name: "Component-based pages", detail: "Reuse sections and keep the design consistent." },
      { name: "Publish from the canvas", detail: "Ship updates without a separate build step." },
    ],
  },
  {
    id: "make",
    name: "Figma Make",
    group: "build",
    Icon: Sparkles,
    color: "#6366F1",
    level: 4,
    tagline: "AI prototyping from prompts",
    description:
      "I use AI to explore ideas fast, then ground the results in real components and constraints so prototypes stay credible.",
    capabilities: [
      { name: "Prompt to prototype", detail: "Turn an idea or a design into a working prototype." },
      { name: "Make kits & attachments", detail: "Ground output in real components, files and constraints." },
      { name: "Chat & visual edits", detail: "Refine results by describing changes or editing directly." },
      { name: "Design-to-code workflow", detail: "Move from prototype toward production code faster." },
    ],
  },
  {
    id: "figjam",
    name: "FigJam",
    group: "collab",
    Icon: StickyNote,
    color: "#8B5CF6",
    level: 4,
    tagline: "Whiteboarding and workshops",
    description:
      "Where projects start. I map user flows, run workshops and align the team on scope before any pixels are drawn.",
    capabilities: [
      { name: "Flowcharts & user journeys", detail: "Map screens, steps and decisions before designing." },
      { name: "Brainstorms & affinity maps", detail: "Cluster ideas and research into clear themes." },
      { name: "Sticky notes, voting & timers", detail: "Run focused workshops with the whole team." },
      { name: "Templates & widgets", detail: "Start retros, roadmaps and planning sessions faster." },
    ],
  },
  {
    id: "slides",
    name: "Figma Slides",
    group: "collab",
    Icon: Presentation,
    color: "#F59E0B",
    level: 4,
    tagline: "Collaborative presentations",
    description:
      "Pitch decks and design reviews built from the same libraries as the product, with live prototypes instead of screenshots.",
    capabilities: [
      { name: "Design-system-powered decks", detail: "Brand libraries bring real components into every slide." },
      { name: "Live prototypes in slides", detail: "Show working interactions instead of static screenshots." },
      { name: "Import & export", detail: "Bring in PowerPoint files and export when needed." },
      { name: "Real-time co-editing", detail: "Review and edit decks together with the team." },
    ],
  },
  {
    id: "buzz",
    name: "Figma Buzz",
    group: "collab",
    Icon: Megaphone,
    color: "#EC4899",
    level: 3,
    tagline: "On-brand assets at scale",
    description:
      "Social posts, banners and campaign visuals produced from locked brand templates, so marketing can move fast without breaking the system.",
    capabilities: [
      { name: "Brand-locked templates", detail: "Teammates edit content while brand rules stay intact." },
      { name: "Social & marketing assets", detail: "Posts, banners and ads built from one visual system." },
      { name: "Assets at scale", detail: "Produce many on-brand variations quickly." },
      { name: "Team co-creation", detail: "Marketing and design work in the same file." },
    ],
  },
];

const workflow = [
  { label: "Explore", tool: "FigJam", desc: "Map user flows and align on scope before any pixels." },
  { label: "Design", tool: "Figma Design", desc: "Components, variables and auto layout from the start." },
  { label: "Prototype", tool: "Prototyping & Make", desc: "Click-through prototypes to test before building." },
  { label: "Hand off", tool: "Dev Mode", desc: "Specs, statuses and Code Connect so engineers ship faster." },
];

const pixsoFeatures = [
  "Real-time team collaboration",
  "Component & style libraries",
  "Prototype to code export",
  "Version history & branching",
];

/* ─── Small pieces ────────────────────────────────── */
function LevelMeter({ level, color }: { level: Level; color: string }) {
  return (
    <div className="flex items-center gap-3" aria-label={`Proficiency: ${levelLabel[level]}`}>
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className="h-1.5 w-6 rounded-full"
            style={{ backgroundColor: n <= level ? color : "#e2e8f0" }}
          />
        ))}
      </div>
      <span className="text-sm font-bold text-slate-800">{levelLabel[level]}</span>
    </div>
  );
}

/* Figma-style selection frame: blue outline with corner handles */
function SelectionHandles() {
  const handle =
    "absolute h-[7px] w-[7px] bg-white border border-[#0D99FF] pointer-events-none";
  return (
    <>
      <span className={`${handle} -left-[4px] -top-[4px]`} />
      <span className={`${handle} -right-[4px] -top-[4px]`} />
      <span className={`${handle} -left-[4px] -bottom-[4px]`} />
      <span className={`${handle} -right-[4px] -bottom-[4px]`} />
    </>
  );
}

/* ─── Main Section ────────────────────────────────── */
export default function DesignTools() {
  const [activeId, setActiveId] = useState<string>(tools[0].id);
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const active = tools.find((t) => t.id === activeId) ?? tools[0];

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const n = tools.length;
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    const id = tools[next].id;
    setActiveId(id);
    tabRefs.current[id]?.focus();
  };

  return (
    <section id="design-tools" className="scroll-mt-24 w-full relative py-14 sm:py-20">
      <div className="relative">
        <SectionHeader
          badge="DESIGN EXPERTISE"
          titlePrefix="The full"
          titleHighlight="Figma"
          titleSuffix="toolkit"
          subtitle="From first sketch to shipped code, I work across the whole Figma platform: design, illustration, motion, handoff, workshops and publishing."
          align="center"
          icon={PenTool}
        />

        {/* ── Editor window ── */}
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_56px_-24px_rgba(15,23,42,0.18)]">
          {/* Window bar */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3 min-w-0">
              <FigmaLogo className="h-5 w-auto shrink-0" />
              <span className="truncate text-sm font-bold text-slate-900">
                Figma products I work in
              </span>
            </div>
            <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              {tools.length} tools
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[272px_1fr]">
            {/* Tool list (layers panel) */}
            <div className="border-b border-slate-200 bg-slate-50 lg:border-b-0 lg:border-r">
              <div
                role="tablist"
                aria-orientation="vertical"
                aria-label="Figma tools"
                className="flex gap-2 overflow-x-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:gap-0 lg:overflow-visible lg:p-4"
              >
                {groups.map((g, gi) => (
                  <React.Fragment key={g.id}>
                    <p
                      className={`hidden px-2 pb-1.5 text-xs font-semibold text-slate-500 lg:block ${
                        gi === 0 ? "" : "pt-5"
                      }`}
                    >
                      {g.label}
                    </p>
                    {tools
                      .filter((t) => t.group === g.id)
                      .map((tool) => {
                        const index = tools.indexOf(tool);
                        const isActive = tool.id === active.id;
                        return (
                          <button
                            key={tool.id}
                            ref={(el) => {
                              tabRefs.current[tool.id] = el;
                            }}
                            id={`tool-tab-${tool.id}`}
                            role="tab"
                            type="button"
                            aria-selected={isActive}
                            aria-controls="tool-panel"
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setActiveId(tool.id)}
                            onKeyDown={(e) => onKeyDown(e, index)}
                            className={`relative flex shrink-0 items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF6014] ${
                              isActive
                                ? "bg-white text-slate-900 ring-1 ring-[#0D99FF]"
                                : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
                            }`}
                          >
                            {isActive && <SelectionHandles />}
                            <span
                              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                              style={{ backgroundColor: `${tool.color}1A`, color: tool.color }}
                            >
                              <tool.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                            <span className="whitespace-nowrap">{tool.name}</span>
                          </button>
                        );
                      })}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Canvas (detail panel) */}
            <div
              id="tool-panel"
              role="tabpanel"
              aria-labelledby={`tool-tab-${active.id}`}
              className="relative min-h-[440px] bg-slate-50/60 p-5 sm:p-8 lg:p-10 [background-image:radial-gradient(circle,#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"
            >
              <motion.div
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                {/* Tool header */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-white shadow-sm"
                      style={{ borderColor: `${active.color}40`, color: active.color }}
                    >
                      <active.Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                        {active.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-slate-600">
                        {active.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <LevelMeter level={active.level} color={active.color} />
                  </div>
                </div>

                <p className="max-w-[62ch] text-base leading-relaxed text-slate-700">
                  {active.description}
                </p>

                {/* Capability frames */}
                <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
                  {active.capabilities.map((cap) => (
                    <div key={cap.name} className="group">
                      {/* Figma-style frame label */}
                      <p className="mb-1.5 truncate text-xs font-semibold text-slate-500 transition-colors group-hover:text-[#0D99FF]">
                        {cap.name}
                      </p>
                      <div
                        className="relative rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 group-hover:border-[#0D99FF] group-hover:shadow-md"
                      >
                        <span
                          className="absolute inset-y-3 left-0 w-[3px] rounded-r-full"
                          style={{ backgroundColor: active.color }}
                          aria-hidden="true"
                        />
                        <p className="pl-2 text-sm font-medium leading-relaxed text-slate-700">
                          {cap.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Workflow ── */}
        <div className="mt-14 sm:mt-20">
          <h3 className="mx-auto max-w-xl text-center text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            From first idea to shipped interface
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600 sm:text-base">
            Each stage uses the Figma tool that fits it best.
          </p>

          <ol className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {/* connector line (desktop) */}
            <div
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[18px] hidden h-px bg-slate-300 lg:block"
              aria-hidden="true"
            />
            {workflow.map((w, i) => (
              <li key={w.label} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FF6014] bg-white font-mono text-sm font-black text-[#FF6014]">
                  {i + 1}
                </span>
                <p className="mt-4 text-lg font-black text-slate-900">{w.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-[#FF6014]">{w.tool}</p>
                <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-slate-600">
                  {w.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Also fluent in Pixso ── */}
        <div className="mt-14 sm:mt-20 flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4 lg:max-w-md">
            <PixsoLogo className="h-12 w-12 shrink-0" />
            <div>
              <h3 className="text-lg font-black text-slate-900">Also fluent in Pixso</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Real-time co-editing and cross-platform component handoff for teams that work
                outside the Figma ecosystem.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:max-w-lg">
            {pixsoFeatures.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800"
              >
                <Check className="h-4 w-4 shrink-0 text-[#6C5CE7]" strokeWidth={3} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 sm:mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl bg-slate-900 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <FigmaLogo className="h-9 w-auto shrink-0" />
            <div>
              <p className="text-lg font-black text-white">
                Need a design system, a prototype or a handoff-ready UI?
              </p>
              <p className="mt-1 text-sm text-slate-300">
                I can take it from workshop to Dev Mode, all inside Figma.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#FF6014] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(255,96,20,0.8)] transition-all hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-95"
          >
            Start a project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}