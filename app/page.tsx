"use client";

import { useState } from "react";
import {
  Terminal, Zap, Shield, Cpu, BookOpen, ExternalLink,
  ChevronRight, Package, LogIn, FolderOpen, Hammer,
  MessageSquare, HelpCircle, Sparkles, Play,
} from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { StepCard } from "@/components/StepCard";
import { Callout } from "@/components/Callout";
import { OsTabSelector } from "@/components/OsTabSelector";
import { ProgressTracker } from "@/components/ProgressTracker";
import { CommandTable } from "@/components/CommandTable";
import { FaqAccordion } from "@/components/FaqAccordion";
import { TerminalDemo, INSTALL_DEMO, BUILD_DEMO, AUTH_DEMO } from "@/components/TerminalDemo";
import { ParticleBackground, useTypewriter, AnimatedCounter } from "@/components/HeroTerminal";
import { ScrollReveal } from "@/components/ScrollReveal";

const STEPS = [
  { id: "prerequisites", label: "Prerequisites" },
  { id: "install", label: "Installation" },
  { id: "verify", label: "Verify Install" },
  { id: "auth", label: "Authentication" },
  { id: "init", label: "Project Init" },
  { id: "build", label: "Build Firmware" },
  { id: "deploy", label: "Deploy" },
  { id: "logs", label: "Log Analysis" },
  { id: "chat", label: "Chat Mode" },
  { id: "faq", label: "Troubleshooting" },
];

const slashCommands = [
  { cmd: "/build", description: "Compile your firmware project", example: "/build" },
  { cmd: "/deploy", description: "Deploy firmware to the connected device", example: "/deploy" },
  { cmd: "/log", description: "Analyze the most recent UART log with AI", example: "/log" },
  { cmd: "/config", description: "View or edit project configuration settings", example: "/config set project.language zh-TW" },
  { cmd: "/help", description: "Display all available commands and usage hints", example: "/help" },
  { cmd: "/exit", description: "Exit chat mode and return to your shell", example: "/exit" },
];

function HeroTitle() {
  const verb = useTypewriter(["build", "deploy", "debug", "automate", "fix"], 70, 2000);
  return (
    <span>
      firmware that{" "}
      <span className="text-terminal-green text-glow-green relative">
        {verb}
        <span className="animate-cursor-blink border-r-2 border-terminal-green">&nbsp;</span>
      </span>
    </span>
  );
}

function StatCard({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <div className="flex flex-col items-center px-6 py-4">
      <span className="text-3xl font-bold text-terminal-green font-mono">
        <AnimatedCounter target={value} suffix={suffix ?? ""} />
      </span>
      <span className="text-xs text-terminal-comment mt-1 uppercase tracking-widest">{label}</span>
    </div>
  );
}

export default function Home() {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (stepId: string, completed: boolean) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: completed }));
  };

  const stepsWithStatus = STEPS.map((s) => ({
    ...s,
    completed: completedSteps[s.id] ?? false,
  }));

  return (
    <div className="min-h-screen bg-[#0a0e13]">

      {/* ═══ HERO ══════════════════════════════════════════════════════ */}
      <header className="relative border-b border-terminal-border overflow-hidden min-h-[520px] flex flex-col">
        <ParticleBackground />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#3fb950 1px, transparent 1px), linear-gradient(90deg, #3fb950 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-terminal-green/8 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-terminal-green/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center flex-1 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-terminal-green/30 bg-terminal-green/10 text-terminal-green text-xs font-mono mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
            Interactive Getting Started Guide
            <Sparkles className="w-3 h-3" />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-terminal-text font-display mb-4 tracking-tight leading-tight max-w-3xl" style={{ animation: "slideUp 0.7s ease-out 0.2s both" }}>
            AI that helps you <HeroTitle />
          </h1>

          <p className="text-lg text-terminal-comment max-w-xl mx-auto leading-relaxed mb-2" style={{ animation: "slideUp 0.7s ease-out 0.4s both" }}>
            FWAuto — the command-line tool that brings AI into every step of embedded firmware development.
          </p>
          <p className="text-sm text-terminal-comment/60 max-w-lg mx-auto mb-10" style={{ animation: "slideUp 0.7s ease-out 0.5s both" }}>
            Follow along step by step. Check off each section as you complete it.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10" style={{ animation: "slideUp 0.7s ease-out 0.6s both" }}>
            {[
              { icon: <Cpu className="w-3.5 h-3.5" />, label: "STM32 & AM62X" },
              { icon: <Zap className="w-3.5 h-3.5" />, label: "AI Auto-Repair" },
              { icon: <Shield className="w-3.5 h-3.5" />, label: "Google OAuth" },
              { icon: <Terminal className="w-3.5 h-3.5" />, label: "Chat Mode" },
              { icon: <MessageSquare className="w-3.5 h-3.5" />, label: "UART Log AI" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-terminal-border bg-[#0d1117]/80 backdrop-blur text-xs text-terminal-comment">
                <span className="text-terminal-green">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3" style={{ animation: "slideUp 0.7s ease-out 0.7s both" }}>
            <a href="https://fwauto.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-terminal-green text-black text-sm font-bold hover:bg-terminal-green/90 transition-all hover:shadow-lg hover:shadow-terminal-green/20 active:scale-95">
              FWAuto Dashboard <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a href="#prerequisites" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-terminal-border text-terminal-text text-sm hover:border-terminal-green/40 hover:bg-white/3 transition-all active:scale-95">
              Start Guide <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ═══ LIVE DEMO SHOWCASE ════════════════════════════════════════ */}
      <section className="border-b border-terminal-border bg-[#0d1117]/60">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-terminal-green/20 bg-terminal-green/5 text-terminal-green text-xs font-mono mb-4">
                <Play className="w-3 h-3 fill-current" />
                Live Interactive Demos
              </div>
              <h2 className="text-2xl font-bold text-terminal-text font-display">See FWAuto in action</h2>
              <p className="text-terminal-comment text-sm mt-2">
                Press <span className="text-terminal-green font-semibold">Run Demo</span> on any terminal to watch it play out in real time.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-4">
            {[
              { title: "Installation", script: INSTALL_DEMO, delay: 0 },
              { title: "AI Build & Auto-Repair", script: BUILD_DEMO, delay: 100 },
              { title: "Authentication", script: AUTH_DEMO, delay: 200 },
            ].map((demo, i) => (
              <ScrollReveal key={i} delay={demo.delay} direction="up">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-terminal-text font-mono pl-1">{demo.title}</p>
                  <TerminalDemo title={demo.title} script={demo.script} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ════════════════════════════════════════════════ */}
      <section className="border-b border-terminal-border">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex flex-wrap items-center justify-center divide-x divide-terminal-border">
              <StatCard value={3} suffix=" platforms" label="Supported OS" />
              <StatCard value={3} suffix="x" label="AI Repair Attempts" />
              <StatCard value={2} suffix=" langs" label="Chat Languages" />
              <StatCard value={6} suffix=" cmds" label="Slash Commands" />
              <StatCard value={10} label="Setup Steps" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ MAIN GUIDE ═══════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          <aside className="lg:w-60 shrink-0">
            <ProgressTracker steps={stepsWithStatus} />
          </aside>

          <div className="flex-1 min-w-0 space-y-6">

            {/* INSTALLATION */}
            <ScrollReveal>
              <div className="flex items-center gap-3 pt-2">
                <Package className="w-5 h-5 text-terminal-green" />
                <h2 className="text-xl font-bold text-terminal-text font-display">Installation</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <section id="prerequisites">
                <StepCard stepNumber={1} title="Install Prerequisites" description="FWAuto requires two tools to be installed on your system before running the installer. The installer will check for both automatically." badge="Required" badgeColor="yellow" isCompleted={completedSteps["prerequisites"] ?? false} onComplete={(c) => toggleStep("prerequisites", c)}>
                  <div className="rounded-xl border border-terminal-border overflow-hidden">
                    <div className="px-4 py-3 bg-[#161b22] border-b border-terminal-border">
                      <h4 className="text-sm font-semibold text-terminal-text font-mono">System Requirements</h4>
                    </div>
                    <div className="divide-y divide-terminal-border/50">
                      <div className="grid grid-cols-3 gap-4 px-4 py-3 text-xs text-terminal-comment uppercase tracking-widest font-mono bg-[#0d1117]">
                        <span>Tool</span><span>Required</span><span>Purpose</span>
                      </div>
                      {[
                        { tool: "FWAuto Account", version: "Registered", purpose: "Create a free account at FWAuto Dashboard" },
                        { tool: "uv", version: "latest", purpose: "Python package manager (installs FWAuto)" },
                        { tool: "Node.js", version: "≥ 20", purpose: "Includes npm — used for the AI CLI tooling" },
                      ].map((row, i) => (
                        <div key={i} className="grid grid-cols-3 gap-4 px-4 py-3 hover:bg-white/2 transition-colors">
                          <code className="text-sm text-terminal-green font-mono">{row.tool}</code>
                          <span className="text-sm text-terminal-text font-mono">{row.version}</span>
                          <span className="text-sm text-terminal-comment">{row.purpose}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Callout type="info" title="What happens if a tool is missing?">
                    The installer script checks for both <code className="text-blue-300">uv</code> and <code className="text-blue-300">Node.js</code> before proceeding. If either is missing, it prints a clear error message with the exact install command to run. No guessing required.
                  </Callout>
                  <Callout type="warning" title="Windows users: Node.js requires special handling">
                    On Windows, Node.js must be installed via the <strong>.msi installer</strong> from nodejs.org. After installation, close and reopen PowerShell as Administrator. See <a href="#windows-prereqs" className="underline text-yellow-300">Appendix A</a>.
                  </Callout>
                </StepCard>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <section id="install">
                <StepCard stepNumber={2} title="Run the Installer" description="A single command handles the entire installation. Use the OS tabs below to select your platform, then press Run Demo to watch it happen." badge="One Command" badgeColor="green" isCompleted={completedSteps["install"] ?? false} onComplete={(c) => toggleStep("install", c)}>
                  <OsTabSelector content={{
                    linux: (
                      <div className="space-y-3">
                        <p className="text-terminal-comment text-sm">Open a terminal and run:</p>
                        <CodeBlock code={`curl -LsSf https://fwauto.ai/install.sh | bash`} title="Linux Terminal" />
                        <Callout type="tip" title="What does this command do?">
                          <code>curl -LsSf</code> downloads the install script silently and follows redirects. Piping to <code>bash</code> runs it immediately. The script installs both <code>fwauto</code> and the AI CLI tools.
                        </Callout>
                      </div>
                    ),
                    macos: (
                      <div className="space-y-3">
                        <p className="text-terminal-comment text-sm">Open Terminal (⌘+Space → "Terminal") and run:</p>
                        <CodeBlock code={`curl -LsSf https://fwauto.ai/install.sh | bash`} title="macOS Terminal" />
                        <Callout type="info">macOS and Linux use the same script. If macOS shows a security prompt, you can safely proceed.</Callout>
                      </div>
                    ),
                    windows: (
                      <div className="space-y-4">
                        <p className="text-terminal-comment text-sm">Open <strong className="text-terminal-text">PowerShell as Administrator</strong> and run:</p>
                        <CodeBlock code={`powershell -ExecutionPolicy ByPass -c "irm https://fwauto.ai/install.ps1 | iex"`} title="PowerShell (Administrator)" />
                        <Callout type="warning" title="Administrator required">Must be run from an elevated PowerShell session. Right-click the Start menu → "Windows PowerShell (Admin)".</Callout>
                      </div>
                    ),
                  }} />
                  <div className="mt-2">
                    <p className="text-sm font-medium text-terminal-text mb-3">▶ Watch the full install process:</p>
                    <TerminalDemo title="Installation Demo" script={INSTALL_DEMO} />
                  </div>
                </StepCard>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <section id="verify">
                <StepCard stepNumber={3} title="Verify the Installation" description="Confirm FWAuto was installed correctly. You should see the ASCII banner and a list of commands." isCompleted={completedSteps["verify"] ?? false} onComplete={(c) => toggleStep("verify", c)}>
                  <CodeBlock code={`fwauto --help`} title="Verify Installation" />
                  <p className="text-terminal-comment text-sm">A successful install displays:</p>
                  <CodeBlock code={`FWAUTO  v0.9.0\n\nUsage: fwauto [OPTIONS] COMMAND [ARGS]...\n\n🚀 STM32 Firmware Automation Tool with AI\n\nCommands:\n  dashboard   Show or open FWAuto Dashboard\n  build       Build firmware project\n  deploy      Deploy firmware to device\n  log         Analyze UART log files using AI\n  auth        Authentication commands\n  config      Configuration management`} title="Expected Output" showPrompt={false} />
                  <Callout type="success" title="Installation confirmed!">
                    If you see output similar to above, FWAuto is installed and ready. The version number appears just below the ASCII banner.
                  </Callout>
                </StepCard>
              </section>
            </ScrollReveal>

            {/* AUTH */}
            <ScrollReveal>
              <div className="flex items-center gap-3 pt-4">
                <LogIn className="w-5 h-5 text-terminal-green" />
                <h2 className="text-xl font-bold text-terminal-text font-display">Authentication</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <section id="auth">
                <StepCard stepNumber={4} title="Log In with Google" description="FWAuto uses Google OAuth. Run the demo to watch the full authentication flow in a simulated terminal." badge="Google OAuth" badgeColor="blue" isCompleted={completedSteps["auth"] ?? false} onComplete={(c) => toggleStep("auth", c)}>
                  <CodeBlock code={`fwauto auth login`} title="Authenticate" />
                  <div className="space-y-3">
                    {[
                      { num: "1", title: "Choose your account", desc: "Select the Google account you registered with on the FWAuto Dashboard." },
                      { num: "2", title: "Grant access", desc: 'FWAuto requests your name, photo, and email. Click "Continue" to approve.' },
                      { num: "3", title: "Login successful", desc: 'Your browser shows "Login Successful!". Close it and return to your terminal.' },
                    ].map((s) => (
                      <div key={s.num} className="flex gap-4 p-4 rounded-xl border border-terminal-border/50 bg-[#161b22]">
                        <div className="shrink-0 w-7 h-7 rounded-full bg-terminal-green/20 border border-terminal-green/40 text-terminal-green text-xs font-bold font-mono flex items-center justify-center">{s.num}</div>
                        <div>
                          <p className="text-sm font-semibold text-terminal-text mb-0.5">{s.title}</p>
                          <p className="text-sm text-terminal-comment leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-terminal-text mb-3">▶ Interactive auth demo:</p>
                    <TerminalDemo title="Authentication Demo" script={AUTH_DEMO} />
                  </div>
                  <p className="text-sm font-medium text-terminal-text mt-2">Verify your login status:</p>
                  <CodeBlock code={`fwauto auth status`} />
                  <CodeBlock code={`📋 FWAuto Auth Status\n========================================\nStatus:     ✅ Logged in\nUser:       Your Name\nEmail:      you@gmail.com\nToken:      ✅ Valid`} showPrompt={false} title="Expected Output" />
                </StepCard>
              </section>
            </ScrollReveal>

            {/* PROJECT SETUP */}
            <ScrollReveal>
              <div className="flex items-center gap-3 pt-4">
                <FolderOpen className="w-5 h-5 text-terminal-green" />
                <h2 className="text-xl font-bold text-terminal-text font-display">Project Setup</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <section id="init">
                <StepCard stepNumber={5} title="Initialize Your Project" description="Navigate to your firmware project and run any FWAuto command. If not yet initialized, the 3-step Setup Wizard launches automatically." isCompleted={completedSteps["init"] ?? false} onComplete={(c) => toggleStep("init", c)}>
                  <Callout type="info" title="Navigate to your project first">Make sure you're inside your firmware project folder before running this command.</Callout>
                  <CodeBlock code={`cd /path/to/your/firmware-project\nfwauto build`} title="Trigger Setup Wizard" />
                  <div className="space-y-3">
                    {[
                      { step: "[1/3] SDK Configuration", desc: "Enter the path to your firmware SDK. Press Enter to accept the default in brackets.", example: "SDK path [/opt/ti-sdk]: /home/user/ATK-AM62x-SDK" },
                      { step: "[2/3] Build Configuration", desc: "Select '1' for Makefile (most common) or '2' for a custom shell command.", example: "Build type:\n  1. makefile\n  2. command\nSelect [1]: 1" },
                      { step: "[3/3] Deploy Configuration", desc: "'network' uses SSH, 'serial' uses a serial port, 'command' runs a custom script.", example: "Deploy type:\n  1. network\n  2. serial\n  3. command\nSelect [1]: 1" },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl border border-terminal-border/50 overflow-hidden">
                        <div className="px-4 py-2.5 bg-[#161b22] border-b border-terminal-border/50">
                          <code className="text-xs text-terminal-green font-mono">{item.step}</code>
                        </div>
                        <div className="p-4 space-y-2">
                          <p className="text-sm text-terminal-comment leading-relaxed">{item.desc}</p>
                          <CodeBlock code={item.example} showPrompt={false} className="text-xs" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <CodeBlock code={`.fwauto/\n├── config.toml      # Project configuration\n├── build/\n│   └── Makefile     # Build script (customize this!)\n└── logs/            # UART log storage`} showPrompt={false} title="Generated Project Structure" />
                  <Callout type="warning" title="You must customize the Makefile">The generated Makefile is a template. Edit it for your project's source paths, compiler, and output directories before building.</Callout>
                </StepCard>
              </section>
            </ScrollReveal>

            {/* BASIC USAGE */}
            <ScrollReveal>
              <div className="flex items-center gap-3 pt-4">
                <Hammer className="w-5 h-5 text-terminal-green" />
                <h2 className="text-xl font-bold text-terminal-text font-display">Basic Usage</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <section id="build">
                <StepCard stepNumber={6} title="Build Your Firmware" description="Compile your firmware with one command. Watch the demo below to see AI auto-repair kick in when a build error occurs." badge="AI Auto-Repair" badgeColor="purple" isCompleted={completedSteps["build"] ?? false} onComplete={(c) => toggleStep("build", c)}>
                  <CodeBlock code={`fwauto build`} title="Build Firmware" />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl border border-green-800 bg-green-950/20">
                      <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">✓ Build Success</p>
                      <p className="text-sm text-terminal-comment">Output files are placed in the directory configured in your Makefile.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-yellow-800 bg-yellow-950/20">
                      <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-2">⚡ Failure → AI Repair</p>
                      <p className="text-sm text-terminal-comment">FWAuto captures the error, asks the AI for a fix, applies it, and retries — up to 3 times.</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-terminal-text mb-3">▶ Watch AI auto-repair a build error:</p>
                    <TerminalDemo title="Build & AI Repair Demo" script={BUILD_DEMO} />
                  </div>
                  <Callout type="info" title="AI auto-repair only fixes compilation errors">Configuration errors (like a missing Makefile) do not trigger AI repair. Always read the error message first.</Callout>
                </StepCard>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <section id="deploy">
                <StepCard stepNumber={7} title="Deploy to Your Device" description="Flash compiled firmware to your hardware. Supports network (SSH), serial port, and custom command deployment." isCompleted={completedSteps["deploy"] ?? false} onComplete={(c) => toggleStep("deploy", c)}>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-terminal-comment mb-2">Basic deploy (uses your configured method):</p>
                      <CodeBlock code={`fwauto deploy`} />
                    </div>
                    <div>
                      <p className="text-sm text-terminal-comment mb-2">Deploy with startup arguments passed to the binary:</p>
                      <CodeBlock code={`fwauto deploy --binary-args "on"`} />
                      <p className="text-xs text-terminal-comment mt-2"><code className="text-blue-400">--binary-args</code> passes arguments to the firmware when it starts. Useful for modes like <code className="text-terminal-green">"debug"</code> or <code className="text-terminal-green">"test"</code>.</p>
                    </div>
                  </div>
                  <Callout type="tip" title="Network deployment (AM62X / Linux boards)">Configure <code className="text-purple-300">board_ip</code>, <code className="text-purple-300">board_user</code>, and <code className="text-purple-300">deploy_path</code> in your <code className="text-purple-300">config.toml</code>. FWAuto uses SSH to copy and run the binary.</Callout>
                </StepCard>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <section id="logs">
                <StepCard stepNumber={8} title="Analyze UART Logs with AI" description="Ask the AI natural-language questions about your firmware's runtime behavior. Just point it at a log file and ask anything." badge="AI Analysis" badgeColor="blue" isCompleted={completedSteps["logs"] ?? false} onComplete={(c) => toggleStep("logs", c)}>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-terminal-comment mb-2">Analyze the most recent auto-detected log:</p>
                      <CodeBlock code={`fwauto log "Are there any errors?"`} />
                    </div>
                    <div>
                      <p className="text-sm text-terminal-comment mb-2">Analyze a specific log file:</p>
                      <CodeBlock code={`fwauto log "Summarize this log" --log-path /path/to/uart.log`} />
                    </div>
                  </div>
                  <p className="text-sm text-terminal-comment">Example questions you can ask:</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {['"Are there any errors?"', '"What happened during boot?"', '"Why did the device reset?"', '"Summarize this log for me"'].map((q, i) => (
                      <div key={i} className="px-3 py-2 rounded-lg border border-terminal-border bg-[#161b22] text-sm font-mono text-terminal-green hover:border-terminal-green/40 transition-colors cursor-default">{q}</div>
                    ))}
                  </div>
                </StepCard>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <section id="chat">
                <StepCard stepNumber={9} title="Use Interactive Chat Mode" description="Launch FWAuto's conversational interface. Control your entire firmware workflow with natural language or slash commands." isCompleted={completedSteps["chat"] ?? false} onComplete={(c) => toggleStep("chat", c)}>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-terminal-comment mb-2">Start interactive chat mode:</p>
                      <CodeBlock code={`fwauto`} />
                    </div>
                    <div>
                      <p className="text-sm text-terminal-comment mb-2">Start with an initial message:</p>
                      <CodeBlock code={`fwauto "Make the LED blink faster"`} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl border border-terminal-border bg-[#161b22]">
                      <p className="text-xs font-semibold text-terminal-green uppercase tracking-wider mb-2">Explicit — Slash Commands</p>
                      <p className="text-sm text-terminal-comment mb-3">Direct, predictable commands.</p>
                      <div className="space-y-1 font-mono text-xs text-terminal-green"><div>/build</div><div>/deploy</div><div>/log</div></div>
                    </div>
                    <div className="p-4 rounded-xl border border-terminal-border bg-[#161b22]">
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Implicit — Natural Language</p>
                      <p className="text-sm text-terminal-comment mb-3">Describe what you want in plain English.</p>
                      <div className="space-y-1 font-mono text-xs text-terminal-text"><div>"Compile the project"</div><div>"Deploy to the board"</div><div>"Any errors in logs?"</div></div>
                    </div>
                  </div>
                  <CommandTable commands={slashCommands} title="All Slash Commands" />
                  <Callout type="tip" title="Switch to Traditional Chinese responses">
                    Enter this in chat mode: <code className="text-purple-300">/config set project.language zh-TW</code>
                  </Callout>
                </StepCard>
              </section>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal>
              <div className="flex items-center gap-3 pt-4">
                <HelpCircle className="w-5 h-5 text-terminal-green" />
                <h2 className="text-xl font-bold text-terminal-text font-display">Troubleshooting & FAQ</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <section id="faq">
                <StepCard stepNumber={10} title="Common Issues & Answers" description="Solutions to the most frequently encountered problems. Click any question to expand." isCompleted={completedSteps["faq"] ?? false} onComplete={(c) => toggleStep("faq", c)}>
                  <FaqAccordion />
                </StepCard>
              </section>
            </ScrollReveal>

            {/* APPENDICES */}
            <ScrollReveal>
              <div className="flex items-center gap-3 pt-4">
                <BookOpen className="w-5 h-5 text-terminal-green" />
                <h2 className="text-xl font-bold text-terminal-text font-display">Appendices</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <div id="windows-prereqs" className="rounded-2xl border border-terminal-border bg-[#0d1117] p-6 space-y-5">
                <h3 className="text-lg font-bold text-terminal-text font-display">Appendix A: Windows Prerequisites</h3>
                <p className="text-terminal-comment text-sm leading-relaxed">Windows requires extra steps. Node.js must be installed via the official .msi installer, and PowerShell needs specific configuration.</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-terminal-text mb-2">Step 1: Install uv (PowerShell as Admin)</p>
                    <CodeBlock code={`powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`} />
                    <p className="text-xs text-terminal-comment mt-2">After running, <strong>close and reopen PowerShell as Administrator</strong> to let PATH changes take effect.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-terminal-text mb-2">Step 2: Install Node.js via .msi</p>
                    <p className="text-sm text-terminal-comment mb-2">Visit <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer" className="text-terminal-blue underline">nodejs.org/en/download</a> and download the Windows Installer (.msi), version 20+.</p>
                    <Callout type="warning">Ensure <strong>"Add to PATH"</strong> is checked. After install, close and reopen PowerShell.</Callout>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-terminal-text mb-2">Step 3: Set execution policy each session</p>
                    <CodeBlock code={`Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process`} />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <div className="rounded-2xl border border-terminal-border bg-[#0d1117] p-6 space-y-5">
                <h3 className="text-lg font-bold text-terminal-text font-display">Appendix B: Makefile Requirements</h3>
                <CommandTable title="Required Rules" commands={[
                  { cmd: "build (target)", description: "Must exist. FWAuto calls 'make build' by default. Configurable in config.toml." },
                  { cmd: "Return code 0", description: "Return 0 for success, non-zero for failure (may trigger AI repair)." },
                  { cmd: "stdout/stderr", description: "All output is captured and sent to the AI for error analysis." },
                ]} />
                <CommandTable title="Key Variables (AM62X example)" commands={[
                  { cmd: "ARAGO_ENV", description: "SDK environment setup script path" },
                  { cmd: "SYSROOT", description: "Cross-compilation sysroot path" },
                  { cmd: "CC", description: "Cross-compiler binary", example: "aarch64-linux-gnu-gcc" },
                  { cmd: "SRC_DIR", description: "Source code directory", example: "./src" },
                  { cmd: "BUILD_DIR", description: "Output directory for compiled binaries", example: "./build" },
                ]} />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <div className="rounded-2xl border border-terminal-border bg-[#0d1117] p-6 space-y-5">
                <h3 className="text-lg font-bold text-terminal-text font-display">Appendix C–E: config.toml Examples</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-terminal-text mb-2">🔵 Arduino (Nano)</p>
                    <CodeBlock code={`[project]\nname = "Blink"\n\n[sdk]\npath = "~/.arduino15"\n\n[build]\ntype = "command"\ncommand = "arduino-cli compile --fqbn arduino:avr:nano ."\n\n[deploy]\ntype = "command"\ncommand = "arduino-cli upload -p /dev/ttyUSB0 --fqbn arduino:avr:nano ."\n\n[log]\ntype = "serial"\nserial_port = "/dev/ttyUSB0"\nbaudrate = 9600`} title="Arduino config.toml" showPrompt={false} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-terminal-text mb-2">🟠 AM62X Development Board</p>
                    <CodeBlock code={`[project]\nname = "my-am62x-project"\n\n[sdk]\npath = "/home/alientek/ATK-AM62x-SDK"\n\n[build]\ntype = "makefile"\nmakefile = ".fwauto/build/Makefile"\ntarget = "build"\n\n[deploy]\ntype = "network"\n\n[deployment]\nboard_ip = "192.168.50.169"\nboard_user = "root"\ndeploy_path = "/home/root"`} title="AM62X config.toml" showPrompt={false} />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Final CTA */}
            <ScrollReveal delay={100}>
              <div className="rounded-2xl border border-terminal-green/30 bg-terminal-green/5 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/5 via-transparent to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="text-4xl mb-3 animate-pulse-slow">🚀</div>
                  <h3 className="text-xl font-bold text-terminal-text font-display mb-2">You&apos;re ready to go!</h3>
                  <p className="text-terminal-comment text-sm max-w-md mx-auto mb-6">You&apos;ve covered everything from installation to AI log analysis. Head to the FWAuto Dashboard to manage your projects.</p>
                  <a href="https://fwauto.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-terminal-green text-black text-sm font-bold hover:bg-terminal-green/90 transition-all hover:shadow-lg hover:shadow-terminal-green/20 active:scale-95">
                    Open Dashboard <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </main>

      <footer className="border-t border-terminal-border mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-terminal-comment font-mono">FWAuto Quickstart Guide — Built with Next.js & Tailwind CSS</p>
          <p className="text-xs text-terminal-comment font-mono">
            <a href="https://fwauto.ai" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-green transition-colors">fwauto.ai</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
