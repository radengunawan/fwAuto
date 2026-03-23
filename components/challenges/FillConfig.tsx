"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ConfigBlank {
  id: string;
  placeholder: string;  // shown as hint
  answer: string;       // exact expected value
  hint?: string;
}

interface FillConfigProps {
  title?: string;
  lines: (string | ConfigBlank)[];   // mix of string lines and blanks
  onSuccess: () => void;
}

export function FillConfig({ title, lines, onSuccess }: FillConfigProps) {
  const blanks = lines.filter((l): l is ConfigBlank => typeof l !== "string");
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(blanks.map((b) => [b.id, ""]))
  );
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const successFired = useRef(false);

  const allFilled = blanks.every((b) => values[b.id].trim() !== "");

  const handleCheck = () => {
    const r: Record<string, boolean> = {};
    blanks.forEach((b) => {
      r[b.id] = values[b.id].trim() === b.answer;
    });
    setResults(r);
    setChecked(true);

    const allCorrect = Object.values(r).every(Boolean);
    if (allCorrect && !successFired.current) {
      successFired.current = true;
      setTimeout(onSuccess, 900);
    }
  };

  const handleReset = () => {
    setValues(Object.fromEntries(blanks.map((b) => [b.id, ""])));
    setChecked(false);
    setResults({});
    successFired.current = false;
  };

  const allCorrect = checked && Object.values(results).every(Boolean);
  const anyWrong = checked && Object.values(results).some((v) => !v);

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center gap-2">
          <span className="text-lg">📝</span>
          <p className="text-sm font-medium text-terminal-text">{title}</p>
        </div>
      )}
      <p className="text-xs text-terminal-comment font-mono">Fill in the blanks in this config file.</p>

      {/* Config editor */}
      <div className="rounded-xl border border-terminal-border bg-terminal-bg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-terminal-border">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#d29922]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
          </div>
          <span className="text-terminal-comment text-xs font-mono">config.toml</span>
        </div>

        <div className="p-4 font-mono text-sm space-y-0.5">
          {lines.map((line, i) => {
            if (typeof line === "string") {
              // Colorize toml
              const colored = line
                .replace(/^(\[.+\])$/, '<span class="text-terminal-blue font-semibold">$1</span>')
                .replace(/^([\w.]+)\s*=/, '<span class="text-[#79c0ff]">$1</span> =')
                .replace(/"([^"]+)"/g, '"<span class="text-yellow-300">$1</span>"')
                .replace(/#(.+)$/, '<span class="text-terminal-comment">#$1</span>');
              return (
                <div key={i} className="leading-relaxed">
                  <span
                    className="text-terminal-text"
                    dangerouslySetInnerHTML={{ __html: colored || "&nbsp;" }}
                  />
                </div>
              );
            }

            // It's a blank
            const blank = line;
            const val = values[blank.id];
            const res = results[blank.id];
            const isCorrect = checked && res;
            const isWrong = checked && res === false;

            return (
              <div key={blank.id} className="flex items-center gap-1 leading-relaxed">
                <input
                  value={val}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, [blank.id]: e.target.value }));
                    if (checked) { setChecked(false); setResults({}); }
                  }}
                  placeholder={blank.placeholder}
                  spellCheck={false}
                  className={cn(
                    "bg-transparent border-b-2 outline-none font-mono text-sm px-1 min-w-[80px] transition-all duration-200",
                    "placeholder:text-terminal-comment/40 placeholder:italic",
                    !checked && "border-terminal-green/40 text-terminal-green focus:border-terminal-green",
                    isCorrect && "border-green-500 text-green-300",
                    isWrong && "border-red-500 text-red-300",
                  )}
                  style={{ width: `${Math.max(blank.answer.length + 4, 10)}ch` }}
                  disabled={isCorrect && allCorrect}
                />
                {isCorrect && <span className="text-green-400 text-xs">✓</span>}
                {isWrong && (
                  <span className="text-red-400 text-xs" title={blank.hint ?? `Expected: ${blank.answer}`}>✗ {blank.hint ?? ""}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {!allCorrect && (
          <button
            onClick={handleCheck}
            disabled={!allFilled}
            className={cn(
              "px-5 py-2 rounded-xl text-sm font-semibold transition-all",
              allFilled
                ? "bg-terminal-green text-black hover:bg-terminal-green/90 active:scale-95"
                : "bg-[#21262d] text-terminal-comment cursor-not-allowed"
            )}
          >
            Check Config
          </button>
        )}
        {anyWrong && (
          <button onClick={handleReset} className="px-5 py-2 rounded-xl text-sm font-semibold border border-terminal-border text-terminal-comment hover:text-terminal-text transition-all active:scale-95">
            Clear All
          </button>
        )}
        {anyWrong && <p className="text-xs text-red-400 font-mono">✗ Some values are wrong. Check the red fields.</p>}
        {allCorrect && <p className="text-xs text-terminal-green font-mono animate-fade-in">✓ Config complete! Unlocking next step…</p>}
      </div>
    </div>
  );
}
