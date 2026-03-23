"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalTypingProps {
  prompt: string;           // the command they must type
  onSuccess: () => void;
  hint?: string;
}

export function TerminalTyping({ prompt, onSuccess, hint }: TerminalTypingProps) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [shakeKey, setShakeKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const successFired = useRef(false);

  // Ghost text: show what's matched vs what's left
  const matchedPart = prompt.slice(0, value.length);
  const remainingPart = prompt.slice(value.length);
  const isCorrectSoFar = prompt.startsWith(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    setStatus("idle");

    if (v === prompt) {
      setStatus("success");
      if (!successFired.current) {
        successFired.current = true;
        setTimeout(onSuccess, 600);
      }
    } else if (!prompt.startsWith(v) && v.length > 0) {
      setStatus("error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value !== prompt) {
      setShakeKey((k) => k + 1);
      setStatus("error");
    }
  };

  // Tab autocomplete
  const handleTab = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (prompt.startsWith(value)) {
        setValue(prompt);
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-xs text-terminal-comment font-mono uppercase tracking-widest">
        ↳ Type the command to continue <span className="text-terminal-green/60">(Tab to autocomplete)</span>
      </p>

      {/* Terminal input */}
      <div
        key={shakeKey}
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "relative rounded-xl border bg-terminal-bg p-4 cursor-text transition-all duration-200 font-mono",
          status === "success" && "border-terminal-green shadow-lg shadow-terminal-green/20",
          status === "error" && "border-red-500/60",
          status === "idle" && "border-terminal-border hover:border-terminal-green/30",
          shakeKey > 0 && "animate-[shake_0.3s_ease-in-out]"
        )}
        style={shakeKey > 0 ? { animation: "shake 0.3s ease-in-out" } : {}}
      >
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-6px); }
            40% { transform: translateX(6px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
          }
        `}</style>

        <div className="flex items-center gap-3">
          <span className="text-terminal-green select-none shrink-0 text-sm">$</span>

          {/* Ghost text display */}
          <div className="flex-1 relative text-sm">
            {/* Ghost (remaining hint) */}
            <span className="pointer-events-none select-none">
              <span className={cn(
                "font-mono",
                isCorrectSoFar ? "text-terminal-text" : "text-red-400"
              )}>
                {value}
              </span>
              {isCorrectSoFar && status !== "success" && (
                <span className="text-terminal-comment/40 font-mono">{remainingPart}</span>
              )}
            </span>

            {/* Invisible real input overlaid */}
            <input
              ref={inputRef}
              value={value}
              onChange={handleChange}
              onKeyDown={(e) => { handleKeyDown(e); handleTab(e); }}
              className="absolute inset-0 w-full bg-transparent text-transparent caret-terminal-green outline-none font-mono text-sm"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>

          {/* Blinking cursor when focused */}
          {status !== "success" && (
            <span className="animate-cursor-blink border-r-2 border-terminal-green h-4 w-0" />
          )}

          {status === "success" && (
            <span className="text-terminal-green text-sm font-bold">✓</span>
          )}
        </div>
      </div>

      {/* Feedback */}
      {status === "error" && (
        <p className="text-xs text-red-400 font-mono pl-1">
          ✗ Not quite. {hint && <span className="text-terminal-comment">{hint}</span>}
        </p>
      )}
      {status === "success" && (
        <p className="text-xs text-terminal-green font-mono pl-1 animate-fade-in">
          ✓ Command accepted — unlocking next step…
        </p>
      )}
    </div>
  );
}
