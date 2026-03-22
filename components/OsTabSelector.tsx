"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type OS = "linux" | "macos" | "windows";

interface OsTabSelectorProps {
  content: Record<OS, React.ReactNode>;
}

const tabs: { id: OS; label: string; icon: string }[] = [
  { id: "linux", label: "Linux", icon: "🐧" },
  { id: "macos", label: "macOS", icon: "🍎" },
  { id: "windows", label: "Windows", icon: "🪟" },
];

export function OsTabSelector({ content }: OsTabSelectorProps) {
  const [activeOS, setActiveOS] = useState<OS>("linux");

  return (
    <div className="space-y-3">
      {/* Tab buttons */}
      <div className="flex gap-1 p-1 bg-[#161b22] rounded-xl border border-terminal-border w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveOS(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              activeOS === tab.id
                ? "bg-terminal-green text-black font-semibold shadow-lg shadow-green-900/50"
                : "text-terminal-comment hover:text-terminal-text hover:bg-white/5"
            )}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="animate-fade-in">{content[activeOS]}</div>
    </div>
  );
}
