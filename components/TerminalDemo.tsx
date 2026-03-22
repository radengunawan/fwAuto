"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalLine {
  type: "input" | "output" | "success" | "error" | "info" | "blank";
  text: string;
  delay?: number; // ms delay before this line appears
}

interface TerminalDemoProps {
  title?: string;
  script: TerminalLine[];
  autoPlay?: boolean;
  className?: string;
}

export function TerminalDemo({
  title = "Terminal",
  script,
  autoPlay = false,
  className,
}: TerminalDemoProps) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [currentTyping, setCurrentTyping] = useState<string | null>(null);
  const [typedChars, setTypedChars] = useState(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const reset = () => {
    clearAllTimeouts();
    setVisibleLines([]);
    setIsPlaying(false);
    setIsDone(false);
    setCurrentTyping(null);
    setTypedChars(0);
  };

  const play = () => {
    reset();
    setIsPlaying(true);

    let cumulativeDelay = 300;

    script.forEach((line, lineIndex) => {
      const lineDelay = line.delay ?? (line.type === "input" ? 600 : 80);
      cumulativeDelay += lineDelay;

      if (line.type === "input") {
        // Typewriter effect for input lines
        const startDelay = cumulativeDelay;

        const t = setTimeout(() => {
          setCurrentTyping(line.text);
          setTypedChars(0);

          let charIndex = 0;
          const typeInterval = setInterval(() => {
            charIndex++;
            setTypedChars(charIndex);
            if (charIndex >= line.text.length) {
              clearInterval(typeInterval);
              // After typing, commit the line
              setTimeout(() => {
                setVisibleLines((prev) => [...prev, line]);
                setCurrentTyping(null);
                setTypedChars(0);
              }, 200);
            }
          }, 40);

          timeoutsRef.current.push(
            setTimeout(() => clearInterval(typeInterval), line.text.length * 40 + 500)
          );
        }, startDelay);

        timeoutsRef.current.push(t);
        cumulativeDelay += line.text.length * 40 + 400;
      } else {
        const t = setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
          if (lineIndex === script.length - 1) {
            setIsPlaying(false);
            setIsDone(true);
          }
        }, cumulativeDelay);
        timeoutsRef.current.push(t);
      }
    });
  };

  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(play, 800);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input": return "text-terminal-text";
      case "success": return "text-terminal-green";
      case "error": return "text-terminal-red";
      case "info": return "text-terminal-comment";
      case "output": return "text-[#c9d1d9]";
      default: return "";
    }
  };

  return (
    <div className={cn("rounded-xl overflow-hidden border border-terminal-border shadow-2xl", className)}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-terminal-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#f85149]" />
            <div className="w-3 h-3 rounded-full bg-[#d29922]" />
            <div className="w-3 h-3 rounded-full bg-[#3fb950]" />
          </div>
          <span className="text-terminal-comment text-xs font-mono">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {!isPlaying && !isDone && (
            <button
              onClick={play}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-terminal-green text-black text-xs font-semibold hover:bg-terminal-green/80 transition-all active:scale-95"
            >
              <Play className="w-3 h-3 fill-black" />
              Run Demo
            </button>
          )}
          {isPlaying && (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/40 border border-red-800 text-red-400 text-xs font-semibold hover:bg-red-900/60 transition-all"
            >
              <Square className="w-3 h-3 fill-current" />
              Stop
            </button>
          )}
          {isDone && (
            <button
              onClick={play}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#21262d] border border-terminal-border text-terminal-comment text-xs font-semibold hover:text-terminal-text hover:border-terminal-green/40 transition-all active:scale-95"
            >
              <RotateCcw className="w-3 h-3" />
              Replay
            </button>
          )}
        </div>
      </div>

      {/* Terminal body */}
      <div className="bg-terminal-bg p-5 h-72 overflow-y-auto font-mono text-sm leading-relaxed">
        {visibleLines.length === 0 && !isPlaying && !currentTyping && (
          <div className="flex items-center justify-center h-full text-terminal-comment/40 text-xs flex-col gap-2">
            <div className="text-3xl">▶</div>
            <p>Press <span className="text-terminal-green">Run Demo</span> to see FWAuto in action</p>
          </div>
        )}

        {visibleLines.map((line, i) => (
          <div key={i} className={cn("flex gap-2", line.type === "blank" ? "h-3" : "")}>
            {line.type === "input" && (
              <span className="text-terminal-green select-none shrink-0">$</span>
            )}
            {line.type === "success" && (
              <span className="text-terminal-green select-none shrink-0">✓</span>
            )}
            {line.type === "error" && (
              <span className="text-terminal-red select-none shrink-0">✗</span>
            )}
            {line.type === "info" && (
              <span className="text-terminal-blue select-none shrink-0">[INFO]</span>
            )}
            {line.type !== "blank" && (
              <span
                className={cn("flex-1 animate-fade-in", getLineColor(line.type))}
                style={{ animationDuration: "0.2s" }}
              >
                {line.text}
              </span>
            )}
          </div>
        ))}

        {/* Currently typing line */}
        {currentTyping !== null && (
          <div className="flex gap-2">
            <span className="text-terminal-green select-none shrink-0">$</span>
            <span className="text-terminal-text">
              {currentTyping.slice(0, typedChars)}
              <span className="animate-cursor-blink border-r-2 border-terminal-green">&nbsp;</span>
            </span>
          </div>
        )}

        {/* Idle cursor when done */}
        {isDone && (
          <div className="flex gap-2 mt-1">
            <span className="text-terminal-green select-none shrink-0">$</span>
            <span className="animate-cursor-blink border-r-2 border-terminal-green text-transparent">_</span>
          </div>
        )}

      </div>
    </div>
  );
}

// Pre-built demo scripts
export const INSTALL_DEMO: TerminalLine[] = [
  { type: "input", text: "curl -LsSf https://fwauto.ai/install.sh | bash", delay: 500 },
  { type: "blank", text: "", delay: 200 },
  { type: "info", text: "FWAuto Installation Script", delay: 100 },
  { type: "info", text: "Checking environment...", delay: 300 },
  { type: "info", text: "uv installed: uv 0.9.28 ✓", delay: 400 },
  { type: "info", text: "Node.js installed: v24.13.0 ✓", delay: 300 },
  { type: "info", text: "Environment check passed!", delay: 500 },
  { type: "blank", text: "", delay: 100 },
  { type: "info", text: "Installing fwauto (this may take a while)...", delay: 200 },
  { type: "info", text: "fwauto installation complete", delay: 1200 },
  { type: "info", text: "Installing AI CLI tools...", delay: 300 },
  { type: "info", text: "AI CLI tools installation complete", delay: 900 },
  { type: "blank", text: "", delay: 100 },
  { type: "success", text: "Installation complete!", delay: 300 },
  { type: "output", text: "Run: fwauto --help", delay: 200 },
];

export const BUILD_DEMO: TerminalLine[] = [
  { type: "input", text: "fwauto build", delay: 500 },
  { type: "blank", text: "", delay: 100 },
  { type: "info", text: "Starting build process...", delay: 300 },
  { type: "output", text: "Compiling src/main.c ...", delay: 400 },
  { type: "output", text: "Compiling src/led.c ...", delay: 300 },
  { type: "output", text: "Compiling src/uart.c ...", delay: 350 },
  { type: "error", text: "src/uart.c:42: error: 'BAUDRATE' undeclared", delay: 400 },
  { type: "blank", text: "", delay: 100 },
  { type: "info", text: "Build failed. Invoking AI repair (attempt 1/3)...", delay: 500 },
  { type: "output", text: "AI analyzing error...", delay: 800 },
  { type: "output", text: "AI fix: add #define BAUDRATE 115200 in uart.h", delay: 600 },
  { type: "output", text: "Applying fix...", delay: 400 },
  { type: "output", text: "Retrying build...", delay: 500 },
  { type: "blank", text: "", delay: 100 },
  { type: "output", text: "Compiling src/uart.c ...", delay: 350 },
  { type: "output", text: "Linking firmware.elf ...", delay: 400 },
  { type: "success", text: "Build successful! → build/firmware.elf (128 KB)", delay: 500 },
];

export const AUTH_DEMO: TerminalLine[] = [
  { type: "input", text: "fwauto auth login", delay: 500 },
  { type: "blank", text: "", delay: 100 },
  { type: "info", text: "Opening browser for Google authentication...", delay: 400 },
  { type: "output", text: "Waiting for login...", delay: 600 },
  { type: "blank", text: "", delay: 1500 },
  { type: "success", text: "Login successful!", delay: 300 },
  { type: "output", text: "Welcome, Developer!", delay: 200 },
  { type: "blank", text: "", delay: 100 },
  { type: "input", text: "fwauto auth status", delay: 600 },
  { type: "blank", text: "", delay: 100 },
  { type: "output", text: "Status:  ✅ Logged in", delay: 200 },
  { type: "output", text: "Token:   ✅ Valid", delay: 150 },
];
