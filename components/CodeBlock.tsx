"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  showPrompt?: boolean;
}

export function CodeBlock({
  code,
  language = "bash",
  title,
  className,
  showPrompt = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for bash
  const highlightCode = (raw: string) => {
    return raw
      .replace(/(".*?")/g, '<span class="text-yellow-300">$1</span>')
      .replace(/(\-\-[\w-]+)/g, '<span class="text-blue-400">$1</span>')
      .replace(/(\-[a-zA-Z](?=\s|$))/g, '<span class="text-blue-400">$1</span>')
      .replace(/\b(fwauto|curl|powershell|bash|uv|npm|node)\b/g, '<span class="text-terminal-green font-semibold">$1</span>')
      .replace(/\b(auth|build|deploy|log|help|config|dashboard|rag)\b/g, '<span class="text-terminal-blue">$1</span>')
      .replace(/(https?:\/\/[^\s"]+)/g, '<span class="text-terminal-cyan underline">$1</span>');
  };

  const lines = code.split("\n");

  return (
    <div className={cn("rounded-xl overflow-hidden border border-terminal-border shadow-xl", className)}>
      {/* Terminal title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-terminal-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#f85149] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#d29922] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#3fb950] opacity-80" />
          </div>
          {title && (
            <div className="flex items-center gap-2 text-terminal-comment text-xs font-mono">
              <Terminal className="w-3 h-3" />
              {title}
            </div>
          )}
          {!title && (
            <span className="text-terminal-comment text-xs font-mono">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono text-terminal-comment hover:text-terminal-text hover:bg-white/5 transition-all duration-200"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-terminal-green" />
              <span className="text-terminal-green">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="bg-terminal-bg p-5 overflow-x-auto scanline">
        <pre className="font-mono text-sm leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showPrompt && line.trim() && (
                <span className="select-none text-terminal-comment mr-3 shrink-0">$</span>
              )}
              <span
                className="text-terminal-text flex-1"
                dangerouslySetInnerHTML={{ __html: highlightCode(line) || "&nbsp;" }}
              />
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
