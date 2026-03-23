"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  children: ReactNode;
  challenge?: ReactNode;        // the interactive challenge block
  challengeLabel?: string;      // label above the challenge, e.g. "Quick Check"
  isCompleted?: boolean;
  onComplete?: (completed: boolean) => void;
  badge?: string;
  badgeColor?: "green" | "blue" | "yellow" | "purple";
  isLocked?: boolean;           // greyed out until previous step done
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
  challenge,
  challengeLabel = "🎮 Try It",
  isCompleted = false,
  onComplete,
  badge,
  badgeColor = "green",
  isLocked = false,
}: StepCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={cn(
        "relative rounded-2xl border transition-all duration-300",
        isLocked && "opacity-50 pointer-events-none",
        isCompleted
          ? "border-terminal-green/40 bg-[#0d1117]"
          : "border-terminal-border bg-[#0d1117] hover:border-terminal-green/30"
      )}
    >
      {isCompleted && (
        <div className="absolute inset-0 rounded-2xl bg-terminal-green/3 pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-start gap-4 p-6">
        <div className="shrink-0 mt-0.5">
          {isLocked ? (
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#161b22] border border-terminal-border">
              <Lock className="w-4 h-4 text-terminal-comment" />
            </div>
          ) : isCompleted ? (
            <button
              onClick={() => onComplete?.(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-terminal-green/20 border border-terminal-green transition-transform hover:scale-105"
              title="Mark as incomplete"
            >
              <CheckCircle2 className="w-5 h-5 text-terminal-green" />
            </button>
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#161b22] border border-terminal-border">
              <span className="text-terminal-comment text-sm font-bold font-mono">{stepNumber}</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <h3 className="text-lg font-semibold text-terminal-text font-display">{title}</h3>
            {badge && (
              <span className={cn("px-2 py-0.5 text-xs font-mono rounded-full border", badgeStyles[badgeColor])}>
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

        <button
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 p-1 rounded-lg hover:bg-white/5 transition-colors text-terminal-comment hover:text-terminal-text"
        >
          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", expanded ? "rotate-180" : "")} />
        </button>
      </div>

      {/* Body */}
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        expanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        {/* Reading content */}
        <div className="px-6 pb-0 pt-0 border-t border-terminal-border/50">
          <div className="pt-5 space-y-4">{children}</div>
        </div>

        {/* Challenge zone */}
        {challenge && !isCompleted && (
          <div className="mx-6 mt-6 mb-6 rounded-xl border border-terminal-green/25 bg-terminal-green/3 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-terminal-green/8 border-b border-terminal-green/20">
              <span className="text-sm">{challengeLabel}</span>
              <span className="text-xs text-terminal-comment font-mono ml-auto">Complete this to unlock the next step</span>
            </div>
            <div className="p-5">
              {challenge}
            </div>
          </div>
        )}

        {/* Completed challenge state */}
        {challenge && isCompleted && (
          <div className="mx-6 mt-4 mb-6 rounded-xl border border-terminal-green/30 bg-terminal-green/5 px-4 py-3 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-terminal-green shrink-0" />
            <p className="text-xs text-terminal-green font-mono">Challenge complete ✓</p>
          </div>
        )}

        {/* No challenge: manual complete button */}
        {!challenge && !isCompleted && (
          <div className="px-6 pb-6 pt-4">
            <button
              onClick={() => onComplete?.(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-terminal-border text-xs font-mono text-terminal-comment hover:text-terminal-green hover:border-terminal-green/50 transition-all active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Mark as done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
