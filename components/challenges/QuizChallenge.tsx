"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Option {
  id: string;
  label: string;
  correct?: boolean;
  explanation?: string;
}

interface QuizChallengeProps {
  question: string;
  options: Option[];
  onSuccess: () => void;
  multiSelect?: boolean;
}

export function QuizChallenge({ question, options, onSuccess, multiSelect = false }: QuizChallengeProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const correctIds = options.filter((o) => o.correct).map((o) => o.id);

  const toggle = (id: string) => {
    if (submitted) return;
    if (multiSelect) {
      setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
    } else {
      setSelected([id]);
    }
  };

  const isCorrect = () => {
    if (selected.length !== correctIds.length) return false;
    return correctIds.every((id) => selected.includes(id));
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;
    setSubmitted(true);
    setAttempts((a) => a + 1);
    if (isCorrect()) {
      setTimeout(onSuccess, 900);
    }
  };

  const handleRetry = () => {
    setSelected([]);
    setSubmitted(false);
  };

  const correct = submitted && isCorrect();
  const wrong = submitted && !isCorrect();

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <span className="text-lg shrink-0">🧠</span>
        <p className="text-sm font-medium text-terminal-text leading-relaxed">{question}</p>
      </div>

      <div className="space-y-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.id);
          const isRight = submitted && opt.correct;
          const isWrong = submitted && isSelected && !opt.correct;

          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              disabled={submitted && correct}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 flex items-start gap-3",
                !submitted && !isSelected && "border-terminal-border bg-[#161b22] hover:border-terminal-green/40 hover:bg-terminal-green/5 text-terminal-comment hover:text-terminal-text",
                !submitted && isSelected && "border-terminal-green/60 bg-terminal-green/10 text-terminal-text",
                isRight && "border-green-500 bg-green-950/40 text-green-300",
                isWrong && "border-red-500/60 bg-red-950/30 text-red-300",
                submitted && !isSelected && !opt.correct && "border-terminal-border/40 bg-[#161b22]/50 text-terminal-comment/50",
              )}
            >
              <span className={cn(
                "shrink-0 w-5 h-5 rounded border flex items-center justify-center text-xs font-bold mt-0.5 transition-all",
                !submitted && isSelected && "border-terminal-green bg-terminal-green text-black",
                !submitted && !isSelected && "border-terminal-border/60",
                isRight && "border-green-500 bg-green-500 text-white",
                isWrong && "border-red-500 bg-red-500/30 text-red-300",
              )}>
                {isRight ? "✓" : isWrong ? "✗" : isSelected ? "●" : ""}
              </span>
              <div>
                <span>{opt.label}</span>
                {submitted && opt.explanation && (
                  <p className="text-xs mt-1 opacity-80">{opt.explanation}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className={cn(
              "px-5 py-2 rounded-xl text-sm font-semibold transition-all",
              selected.length > 0
                ? "bg-terminal-green text-black hover:bg-terminal-green/90 active:scale-95"
                : "bg-[#21262d] text-terminal-comment cursor-not-allowed"
            )}
          >
            Check Answer
          </button>
        )}

        {wrong && (
          <button
            onClick={handleRetry}
            className="px-5 py-2 rounded-xl text-sm font-semibold border border-terminal-border text-terminal-comment hover:text-terminal-text hover:border-terminal-green/40 transition-all active:scale-95"
          >
            Try Again
          </button>
        )}

        {wrong && (
          <p className="text-xs text-red-400 font-mono">
            ✗ Not quite{attempts > 1 ? ` (attempt ${attempts})` : ""}. Check the explanations and try again.
          </p>
        )}

        {correct && (
          <p className="text-xs text-terminal-green font-mono animate-fade-in">
            ✓ Correct! Unlocking next step…
          </p>
        )}
      </div>
    </div>
  );
}
