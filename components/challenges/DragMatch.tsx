"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface DragMatchProps {
  title?: string;
  items: { id: string; label: string }[];       // draggable items (left)
  targets: { id: string; label: string; matchId: string }[]; // drop zones (right)
  onSuccess: () => void;
}

export function DragMatch({ title, items, targets, onSuccess }: DragMatchProps) {
  // Map: targetId → matchId placed there
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [overTarget, setOverTarget] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const successFired = useRef(false);

  // Which item ids are already placed somewhere?
  const placedItems = new Set(Object.values(placements));

  const unplacedItems = items.filter((i) => !placedItems.has(i.id));

  const handleDragStart = (id: string) => setDragging(id);
  const handleDragEnd = () => { setDragging(null); setOverTarget(null); };

  const handleDrop = (targetId: string) => {
    if (!dragging) return;
    setPlacements((prev) => {
      // Remove dragging item from any existing slot
      const cleared = Object.fromEntries(
        Object.entries(prev).filter(([, v]) => v !== dragging)
      );
      return { ...cleared, [targetId]: dragging };
    });
    setDragging(null);
    setOverTarget(null);
    setChecked(false);
    setResult(null);
  };

  const handleRemovePlacement = (targetId: string) => {
    if (checked && result === "correct") return;
    setPlacements((prev) => {
      const next = { ...prev };
      delete next[targetId];
      return next;
    });
    setChecked(false);
    setResult(null);
  };

  const allFilled = targets.every((t) => placements[t.id]);

  const handleCheck = () => {
    setChecked(true);
    const correct = targets.every((t) => placements[t.id] === t.matchId);
    setResult(correct ? "correct" : "wrong");
    if (correct && !successFired.current) {
      successFired.current = true;
      setTimeout(onSuccess, 900);
    }
  };

  const handleReset = () => {
    setPlacements({});
    setChecked(false);
    setResult(null);
  };

  const isCorrectPlacement = (targetId: string) => {
    const t = targets.find((t) => t.id === targetId);
    return placements[targetId] === t?.matchId;
  };

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <p className="text-sm font-medium text-terminal-text">{title}</p>
        </div>
      )}
      <p className="text-xs text-terminal-comment font-mono">Drag each item to its matching description.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left: draggable items pool */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-terminal-comment font-mono mb-3">Items</p>
          <div className="min-h-[60px] space-y-2">
            {unplacedItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "px-3 py-2.5 rounded-lg border text-sm font-mono cursor-grab active:cursor-grabbing transition-all duration-150 select-none",
                  dragging === item.id
                    ? "border-terminal-green/60 bg-terminal-green/10 opacity-60 scale-95"
                    : "border-terminal-border bg-[#161b22] text-terminal-green hover:border-terminal-green/50 hover:bg-terminal-green/5"
                )}
              >
                ⠿ {item.label}
              </div>
            ))}
            {unplacedItems.length === 0 && (
              <p className="text-xs text-terminal-comment/50 font-mono italic px-1">All items placed</p>
            )}
          </div>
        </div>

        {/* Right: drop targets */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-terminal-comment font-mono mb-3">Descriptions</p>
          {targets.map((target) => {
            const placed = placements[target.id];
            const placedItem = items.find((i) => i.id === placed);
            const isOver = overTarget === target.id;
            const correct = checked && isCorrectPlacement(target.id);
            const wrong = checked && placed && !isCorrectPlacement(target.id);

            return (
              <div
                key={target.id}
                onDragOver={(e) => { e.preventDefault(); setOverTarget(target.id); }}
                onDragLeave={() => setOverTarget(null)}
                onDrop={() => handleDrop(target.id)}
                className={cn(
                  "rounded-lg border p-3 min-h-[52px] transition-all duration-150",
                  isOver && "border-terminal-green/60 bg-terminal-green/10",
                  !isOver && !placed && "border-dashed border-terminal-border/60 bg-[#161b22]/50",
                  placed && !checked && "border-terminal-border bg-[#161b22]",
                  correct && "border-green-500/60 bg-green-950/30",
                  wrong && "border-red-500/50 bg-red-950/20",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs text-terminal-comment leading-relaxed">{target.label}</p>
                    {placed && (
                      <div className={cn(
                        "mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono border",
                        correct ? "bg-green-900/30 border-green-700/50 text-green-300" :
                        wrong ? "bg-red-900/20 border-red-700/40 text-red-300" :
                        "bg-terminal-green/10 border-terminal-green/30 text-terminal-green"
                      )}>
                        {correct ? "✓" : wrong ? "✗" : "⠿"} {placedItem?.label}
                      </div>
                    )}
                    {!placed && (
                      <p className="mt-2 text-xs text-terminal-comment/30 font-mono italic">drop here…</p>
                    )}
                  </div>
                  {placed && !(checked && result === "correct") && (
                    <button
                      onClick={() => handleRemovePlacement(target.id)}
                      className="text-terminal-comment/40 hover:text-terminal-comment text-xs mt-0.5 shrink-0"
                      title="Remove"
                    >✕</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        {!checked && (
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
            Check Matches
          </button>
        )}
        {result === "wrong" && (
          <button onClick={handleReset} className="px-5 py-2 rounded-xl text-sm font-semibold border border-terminal-border text-terminal-comment hover:text-terminal-text transition-all active:scale-95">
            Reset
          </button>
        )}
        {result === "wrong" && (
          <p className="text-xs text-red-400 font-mono">✗ Some matches are wrong. Red items need to move.</p>
        )}
        {result === "correct" && (
          <p className="text-xs text-terminal-green font-mono animate-fade-in">✓ Perfect! All matches correct. Unlocking next step…</p>
        )}
      </div>
    </div>
  );
}
