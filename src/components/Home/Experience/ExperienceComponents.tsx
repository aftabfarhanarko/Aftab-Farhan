"use client";
import React from "react";
import { Briefcase, MapPin, ExternalLink, CheckCircle2 } from "lucide-react";
import { Experience, Role, Achievement, ICON_MAP } from "./types";

interface ExperienceHeaderProps {
  exp: Experience;
}

export function ExperienceHeader({ exp }: ExperienceHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-black/[0.08] dark:bg-white/[0.08] border border-black/10 dark:border-white/10 shrink-0">
          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-black/70 dark:text-white/70" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
            {exp.company}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-xs text-black/40 dark:text-white/40">
            <MapPin className="w-3 h-3" />
            <span>{exp.location}</span>
            {exp.url && exp.url !== "#" && (
              <>
                <span>·</span>
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors"
                >
                  {exp.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Period + present badge */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        {exp.type === "current" && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/20 dark:border-white/20 text-[10px] font-bold uppercase tracking-wider text-foreground bg-black/[0.08] dark:bg-white/[0.08]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-black dark:bg-white" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-black dark:bg-white" />
            </span>
            Present
          </span>
        )}
        <span className="text-xs font-semibold text-black/50 dark:text-white/50 bg-black/[0.05] dark:bg-white/[0.06] px-3 py-1 rounded-full border border-black/10 dark:border-white/10 whitespace-nowrap">
          {exp.period}
        </span>
      </div>
    </div>
  );
}

interface ExperienceRolesProps {
  roles: Role[];
}

export function ExperienceRoles({ roles }: ExperienceRolesProps) {
  return (
    <div className="space-y-5">
      {roles.map((role, ri) => {
        const RIcon = ICON_MAP[role.iconName] || Briefcase;
        return (
          <div key={ri}>
            {ri > 0 && <div className="h-px bg-black/10 dark:bg-white/10 mb-5" />}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.06] dark:bg-white/[0.06]">
                <RIcon className="w-4 h-4 text-black/70 dark:text-white/70" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                  {role.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-black/40 dark:text-white/40">
                  {role.subtitle}
                </p>
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 ml-0 sm:ml-9">
              {role.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-black/50 dark:text-white/50" />
                  <span className="text-xs sm:text-sm text-black/65 dark:text-white/65 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

interface ExperienceAchievementsProps {
  achievements: Achievement[];
}

export function ExperienceAchievements({ achievements }: ExperienceAchievementsProps) {
  return (
    <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
      <p className="text-[10px] font-bold text-black/30 dark:text-white/30 uppercase tracking-widest mb-3">
        Key Achievements
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {achievements.map((a, i) => (
          <div
            key={i}
            className="text-center p-2 sm:p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10"
          >
            <div className="text-base sm:text-lg font-black text-foreground">
              {a.metric}
            </div>
            <div className="text-[9px] sm:text-[10px] text-black/40 dark:text-white/40 leading-tight mt-0.5">
              {a.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
