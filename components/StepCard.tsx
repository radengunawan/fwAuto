"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  children: ReactNode;
  isCompleted?: boolean;
  onComplete?: (completed: boolean) => void;
  badge?: string;
  badgeColor?: "green" | "blue" | "yellow" | "purple";
}

const badgeStyles = {
  green: "bg-green-900/40 text-green-400 border-green-800",
  blue: "bg-blue-900/40 text-blue-400 border-blue-800",
  yellow: "bg-yellow-900/40 text-yellow-400 border-yellow-800",
  purple: "bg-purple-900/40 text-purple-400 border-purple-800",
};

export function StepCard({
  stepNumber,
  title,
  description,
  children,
  isCompleted = false,
  onComplete,
  badge,
  badgeColor = "green",
}: StepCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={cn(
        "relative rounded-2xl border transition-all duration-300",
        isCompleted
          ? "border-terminal-green/40 bg-[#0d1117]"
          : "border-terminal-border bg-[#0d1117] hover:border-terminal-green/30"
      )}
    >
      {/* Completed glow effect */}
      {isCompleted && (
        <div className="absolute inset-0 rounded-2xl bg-terminal-green/3 pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-start gap-4 p-6">
        {/* Step indicator */}
        <div className="shrink-0 mt-0.5">
          {isCompleted ? (
            <button
              onClick={() => onComplete?.(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-terminal-green/20 border border-terminal-green transition-transform hover:scale-105"
              title="Mark as incomplete"
            >
              <CheckCircle2 className="w-5 h-5 text-terminal-green" />
            </button>
          ) : (
            <button
              onClick={() => onComplete?.(true)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#161b22] border border-terminal-border hover:border-terminal-green/50 transition-all group"
              title="Mark as complete"
            >
              <span className="text-terminal-comment text-sm font-bold font-mono group-hover:text-terminal-green transition-colors">
                {stepNumber}
              </span>
            </button>
          )}
        </div>

        {/* Title & description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <h3 className="text-lg font-semibold text-terminal-text font-display">
              {title}
            </h3>
            {badge && (
              <span
                className={cn(
                  "px-2 py-0.5 text-xs font-mono rounded-full border",
                  badgeStyles[badgeColor]
                )}
              >
                {badge}
              </span>
            )}
            {isCompleted && (
              <span className="px-2 py-0.5 text-xs font-mono rounded-full border bg-green-900/40 text-green-400 border-green-800">
                ✓ Done
              </span>
            )}
          </div>
          <p className="text-terminal-comment text-sm leading-relaxed">{description}</p>
        </div>

        {/* Expand/collapse */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 p-1 rounded-lg hover:bg-white/5 transition-colors text-terminal-comment hover:text-terminal-text"
        >
          <ChevronDown
            className={cn("w-5 h-5 transition-transform duration-200", expanded ? "rotate-180" : "")}
          />
        </button>
      </div>

      {/* Expandable content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 pb-6 pt-0 border-t border-terminal-border/50">
          <div className="pt-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
