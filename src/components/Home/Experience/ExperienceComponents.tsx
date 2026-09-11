"use client";
import React from "react";
import { Briefcase, MapPin, ExternalLink, CheckCircle2 } from "lucide-react";
import { Experience, Role, Achievement, ICON_MAP } from "./types";

interface ExperienceHeaderProps {
  exp: Experience;
}

export function ExperienceHeader({ exp }: ExperienceHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center bg-orange-50 border border-orange-200 shrink-0 shadow-sm">
          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6014]" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {exp.company}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-600 font-medium">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{exp.location}</span>
            {exp.url && exp.url !== "#" && (
              <>
                <span className="text-slate-300">·</span>
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#FF6014] hover:underline font-semibold"
                >
                  {exp.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Period + present badge */}
      <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0 sm:w-auto w-full">
        {exp.type === "current" && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-200 text-xs font-bold uppercase tracking-wider text-[#FF6014] bg-orange-50 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#FF6014]" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6014]" />
            </span>
            Present
          </span>
        )}
        <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full whitespace-nowrap shadow-sm">
          {exp.period}
        </span>
      </div>
    </div>
  );
}

function normalizeResponsibilities(raw: string[]): string[] {
  if (!raw || raw.length === 0) return [];
  if (raw.length > 1) {
    return raw.map((r) => r.trim()).filter(Boolean);
  }
  const single = raw[0]?.trim() ?? "";
  if (!single) return [];
  if (single.length < 120) return [single];
  const byNewline = single.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  if (byNewline.length > 1) return byNewline;
  const bySentence = single
    .split(/\.\s+(?=[A-Z])/)
    .map((s) => s.trim().replace(/\.$/, "").trim())
    .filter((s) => s.length > 4);
  return bySentence.length > 1 ? bySentence : [single];
}

interface ExperienceRolesProps {
  roles: Role[];
}

export function ExperienceRoles({ roles }: ExperienceRolesProps) {
  return (
    <div className="space-y-6">
      {roles.map((role, ri) => {
        const RIcon = ICON_MAP[role.iconName] || Briefcase;
        const items = normalizeResponsibilities(role.responsibilities);
        return (
          <div key={ri}>
            {ri > 0 && <div className="h-px bg-slate-200 mb-6" />}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800">
                <RIcon className="w-4 h-4 text-[#FF6014]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 leading-tight">
                  {role.title}
                </h4>
                {role.subtitle && (
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    {role.subtitle}
                  </p>
                )}
              </div>
            </div>

            <ul className="grid sm:grid-cols-1 gap-3 ml-0 sm:ml-9">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#FF6014]" />
                  <span className="text-base sm:text-lg text-slate-600 leading-[1.7] font-normal">
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
    <div className="mt-6 pt-5 border-t border-slate-200">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
        Key Deliverables & Metrics
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {achievements.map((a, i) => (
          <div
            key={i}
            className="text-center p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-center"
          >
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {a.metric}
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
              {a.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
