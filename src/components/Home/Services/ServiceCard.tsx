"use client";
import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  tech: string[];
  color: string;
  borderColor: string;
  iconColor: string;
}

export default function ServiceCard({ service }: { service: Service }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative rounded-2xl bg-gradient-to-br ${service.color} border ${service.borderColor} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        {/* Icon */}
        <div className={`mb-4 ${service.iconColor} transition-transform duration-300 group-hover:scale-110`}>
          {service.icon}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-foreground mb-2">
          {service.title}
        </h3>
        <p className="text-foreground/60 text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {service.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-card/50 border border-border rounded-md text-foreground/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features List */}
        <div
          className={`space-y-2 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-80"
          }`}
        >
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">
            Key Features
          </p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {service.features.slice(0, 6).map((feature) => (
              <div key={feature} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-foreground flex-shrink-0" />
                <span className="text-xs text-foreground/70">{feature}</span>
              </div>
            ))}
          </div>
          {service.features.length > 6 && (
            <p className="text-xs text-foreground/40 mt-1">
              +{service.features.length - 6} more features
            </p>
          )}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
