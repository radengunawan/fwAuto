"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface SequenceItem {
  id: string;
  label: string;
  sublabel?: string;
}

interface SequenceChallengeProps {
  question: string;
  items: SequenceItem[];          // pass in SHUFFLED order
  correctOrder: string[];         // correct sequence of ids
  onSuccess: () => void;
}

export function SequenceChallenge({ question, items: initialItems, correctOrder, onSuccess }: SequenceChallengeProps) {
  const [items, setItems] = useState(initialItems);
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const dragIndex = useRef<number | null>(null);
  const successFired = useRef(false);

  const handleDragStart = (index: number) => { dragIndex.current = index; };

  const handleDrop = (dropIndex: number) => {
    if (dragIndex.current === null || dragIndex.current === dropIndex) return;
    const next = [...items];
    const [moved] = next.splice(dragIndex.current, 1);
    next.splice(dropIndex, 0, moved);
    setItems(next);
    dragIndex.current = null;
    setChecked(false);
    setResult(null);
  };

  const handleCheck = () => {
    setChecked(true);
    const correct = items.every((item, i) => item.id === correctOrder[i]);
    setResult(correct ? "correct" : "wrong");
    if (correct && !successFired.current) {
      successFired.current = true;
      setTimeout(onSuccess, 900);
    }
  };

  const handleReset = () => {
    setItems(initialItems);
    setChecked(false);
    setResult(null);
  };

  const isItemCorrect = (item: SequenceItem, index: number) => item.id === correctOrder[index];

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <span className="text-lg shrink-0">🔢</span>
        <p className="text-sm font-medium text-terminal-text leading-relaxed">{question}</p>
      </div>
      <p className="text-xs text-terminal-comment font-mono">Drag to reorder. Then press Check Order.</p>

      <div className="space-y-2">
        {items.map((item, index) => {
          const correct = checked && isItemCorrect(item, index);
          const wrong = checked && result === "wrong" && !isItemCorrect(item, index);

          return (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border cursor-grab active:cursor-grabbing transition-all duration-150 select-none",
                !checked && "border-terminal-border bg-[#161b22] hover:border-terminal-green/40 hover:bg-terminal-green/5",
                correct && "border-green-500/60 bg-green-950/30",
                wrong && "border-red-500/50 bg-red-950/20",
              )}
            >
              {/* Position number */}
              <div className={cn(
                "shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono font-bold",
                correct ? "border-green-500 text-green-400 bg-green-900/30" :
                wrong ? "border-red-500/60 text-red-400" :
                "border-terminal-border text-terminal-comment"
              )}>
                {index + 1}
              </div>

              {/* Drag handle */}
              <span className="text-terminal-comment/40 text-xs select-none">⠿⠿</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-mono", correct ? "text-green-300" : wrong ? "text-red-300" : "text-terminal-text")}>
                  {item.label}
                </p>
                {item.sublabel && (
                  <p className="text-xs text-terminal-comment mt-0.5">{item.sublabel}</p>
                )}
              </div>

              {/* Status icon */}
              {correct && <span className="text-green-400 text-sm shrink-0">✓</span>}
              {wrong && <span className="text-red-400 text-sm shrink-0">✗</span>}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {!checked && (
          <button
            onClick={handleCheck}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-terminal-green text-black hover:bg-terminal-green/90 active:scale-95 transition-all"
          >
            Check Order
          </button>
        )}
        {result === "wrong" && (
          <button onClick={handleReset} className="px-5 py-2 rounded-xl text-sm font-semibold border border-terminal-border text-terminal-comment hover:text-terminal-text transition-all active:scale-95">
            Reset
          </button>
        )}
        {result === "wrong" && (
          <p className="text-xs text-red-400 font-mono">✗ Order isn't right yet. Try dragging again.</p>
        )}
        {result === "correct" && (
          <p className="text-xs text-terminal-green font-mono animate-fade-in">✓ Correct order! Unlocking next step…</p>
        )}
      </div>
    </div>
  );
}
