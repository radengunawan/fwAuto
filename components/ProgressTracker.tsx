"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep?: string;
}

export function ProgressTracker({ steps, currentStep }: ProgressTrackerProps) {
  const completedCount = steps.filter((s) => s.completed).length;
  const progress = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="sticky top-6 rounded-2xl border border-terminal-border bg-[#0d1117] p-5">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-terminal-comment uppercase tracking-widest">
            Progress
          </span>
          <span className="text-xs font-mono text-terminal-green">
            {completedCount}/{steps.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden">
          <div
            className="h-full bg-terminal-green rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-terminal-comment mt-1.5">{progress}% complete</p>
      </div>

      {/* Step list */}
      <nav className="space-y-1">
        {steps.map((step, index) => (
          <a
            key={step.id}
            href={`#${step.id}`}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
              currentStep === step.id
                ? "bg-terminal-green/10 text-terminal-green"
                : step.completed
                ? "text-terminal-comment hover:text-terminal-text hover:bg-white/3"
                : "text-terminal-comment hover:text-terminal-text hover:bg-white/3"
            )}
          >
            <div className="shrink-0">
              {step.completed ? (
                <CheckCircle2 className="w-4 h-4 text-terminal-green" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-terminal-border flex items-center justify-center">
                  <span className="text-[9px] font-mono text-terminal-comment">{index + 1}</span>
                </div>
              )}
            </div>
            <span
              className={cn(
                "truncate",
                step.completed && "line-through opacity-60"
              )}
            >
              {step.label}
            </span>
          </a>
        ))}
      </nav>

      {progress === 100 && (
        <div className="mt-4 p-3 rounded-xl bg-terminal-green/10 border border-terminal-green/30 text-center">
          <p className="text-terminal-green text-xs font-semibold">🎉 All done! You&apos;re set.</p>
        </div>
      )}
    </div>
  );
}
