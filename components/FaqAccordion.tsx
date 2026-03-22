"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    question: "What should I do if authentication fails?",
    answer: (
      <div className="space-y-3">
        <p>
          If your login doesn't work, the most reliable fix is to log out completely and log back in.
          This clears any stale tokens:
        </p>
        <CodeBlock code={`fwauto auth logout\nfwauto auth login`} />
        <p className="text-terminal-comment text-sm">
          After running <code className="text-terminal-green">auth login</code>, your browser will open Google's sign-in page automatically. Complete the sign-in there, then return to your terminal.
        </p>
      </div>
    ),
  },
  {
    question: 'Why does FWAuto say it can\'t find ".fwauto/"?',
    answer: (
      <div className="space-y-3">
        <p>
          FWAuto looks for a <code className="text-terminal-green">.fwauto/</code> directory in your current folder or any parent folder. This error means:
        </p>
        <ul className="space-y-1.5 text-terminal-comment text-sm">
          <li className="flex gap-2">
            <span className="text-terminal-green shrink-0">→</span>
            You haven't initialized the project yet, <strong className="text-terminal-text">or</strong>
          </li>
          <li className="flex gap-2">
            <span className="text-terminal-green shrink-0">→</span>
            You're running FWAuto from a directory outside your project tree.
          </li>
        </ul>
        <p className="text-sm text-terminal-comment">
          Always run FWAuto commands from inside your firmware project directory or any of its subdirectories.
        </p>
      </div>
    ),
  },
  {
    question: "How do I update FWAuto to the latest version?",
    answer: (
      <div className="space-y-3">
        <p>
          Since FWAuto is installed via <code className="text-terminal-green">uv</code>, upgrading is a single command:
        </p>
        <CodeBlock code={`uv tool upgrade fwauto`} />
        <p className="text-sm text-terminal-comment">
          After upgrading, verify the new version by running{" "}
          <code className="text-terminal-green">fwauto --help</code>. The version number appears below the ASCII banner.
        </p>
      </div>
    ),
  },
  {
    question: "Why doesn't a build error trigger AI auto-repair?",
    answer: (
      <div className="space-y-3">
        <p>
          AI auto-repair only activates for <strong className="text-terminal-text">compilation errors</strong> — errors that occur while your code is actually being compiled. It does <em>not</em> activate for configuration errors, such as:
        </p>
        <ul className="space-y-1.5 text-terminal-comment text-sm">
          <li className="flex gap-2"><span className="text-yellow-400 shrink-0">⚠</span> Your Makefile doesn't exist at the configured path</li>
          <li className="flex gap-2"><span className="text-yellow-400 shrink-0">⚠</span> The SDK path is wrong in <code className="text-terminal-green">config.toml</code></li>
          <li className="flex gap-2"><span className="text-yellow-400 shrink-0">⚠</span> Missing environment variables</li>
        </ul>
        <p className="text-sm text-terminal-comment">
          Always read the error message carefully to determine whether it's a compilation error or a configuration problem.
        </p>
      </div>
    ),
  },
  {
    question: "How do I switch the AI response language to Chinese?",
    answer: (
      <div className="space-y-3">
        <p>
          The AI responds in English by default. To switch to Traditional Chinese, enter this command while in chat mode:
        </p>
        <CodeBlock code={`/config set project.language zh-TW`} showPrompt={false} />
        <p className="text-sm text-terminal-comment">
          Supported values are <code className="text-terminal-green">en</code> (English) and{" "}
          <code className="text-terminal-green">zh-TW</code> (Traditional Chinese). The change takes effect immediately.
        </p>
      </div>
    ),
  },
  {
    question: "Windows: node and npm commands not found after install?",
    answer: (
      <div className="space-y-3">
        <p>
          This is a PATH issue. After installing Node.js on Windows, you must <strong className="text-terminal-text">close and reopen PowerShell</strong> as Administrator for the PATH changes to take effect.
        </p>
        <p className="text-sm text-terminal-comment">
          Also remember: every new PowerShell session on Windows requires you to set the execution policy again:
        </p>
        <CodeBlock code={`Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process`} />
      </div>
    ),
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl border border-terminal-border overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/3 transition-colors"
          >
            <span className="font-medium text-terminal-text">{faq.question}</span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-terminal-comment shrink-0 transition-transform duration-200",
                openIndex === i ? "rotate-180" : ""
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openIndex === i ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="px-5 pb-5 pt-1 border-t border-terminal-border/50 text-terminal-comment leading-relaxed">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
