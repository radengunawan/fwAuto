"use client";

import { useState } from "react";
import {
  Terminal,
  Zap,
  Shield,
  Cpu,
  BookOpen,
  Github,
  ExternalLink,
  ChevronRight,
  Package,
  LogIn,
  FolderOpen,
  Hammer,
  Upload,
  MessageSquare,
  HelpCircle,
  Settings,
} from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { StepCard } from "@/components/StepCard";
import { Callout } from "@/components/Callout";
import { OsTabSelector } from "@/components/OsTabSelector";
import { ProgressTracker } from "@/components/ProgressTracker";
import { CommandTable } from "@/components/CommandTable";
import { FaqAccordion } from "@/components/FaqAccordion";

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
      {/* Hero */}
      <header className="relative border-b border-terminal-border overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#3fb950 1px, transparent 1px), linear-gradient(90deg, #3fb950 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0e13]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-terminal-green/10 blur-[80px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-terminal-green/30 bg-terminal-green/10 text-terminal-green text-xs font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
            Interactive Getting Started Guide
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl font-bold text-terminal-text font-display mb-4 tracking-tight">
            <span className="text-terminal-green text-glow-green">FWAuto</span>
          </h1>
          <p className="text-xl text-terminal-comment max-w-2xl mx-auto leading-relaxed mb-3">
            AI-Powered Firmware Development Automation
          </p>
          <p className="text-sm text-terminal-comment/70 max-w-xl mx-auto">
            This guide walks you through every step — from installing prerequisites to analyzing UART logs with AI.
            Check off each step as you go.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {[
              { icon: <Cpu className="w-3.5 h-3.5" />, label: "STM32 & AM62X Support" },
              { icon: <Zap className="w-3.5 h-3.5" />, label: "AI Auto-Repair Builds" },
              { icon: <Shield className="w-3.5 h-3.5" />, label: "Google OAuth Auth" },
              { icon: <Terminal className="w-3.5 h-3.5" />, label: "Interactive Chat Mode" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-terminal-border bg-[#0d1117] text-xs text-terminal-comment"
              >
                <span className="text-terminal-green">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href="https://fwauto.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-terminal-green text-black text-sm font-semibold hover:bg-terminal-green/90 transition-colors"
            >
              FWAuto Dashboard
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="#prerequisites"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-terminal-border text-terminal-text text-sm hover:border-terminal-green/40 hover:bg-white/3 transition-all"
            >
              Start Guide
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-60 shrink-0">
            <ProgressTracker steps={stepsWithStatus} />
          </aside>

          {/* Guide content */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* ─── SECTION HEADER ──────────────────────────────── */}
            <div className="flex items-center gap-3 pt-2">
              <Package className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">Installation</h2>
            </div>

            {/* STEP 1 – Prerequisites */}
            <section id="prerequisites">
              <StepCard
                stepNumber={1}
                title="Install Prerequisites"
                description="FWAuto requires two tools to be installed on your system before running the installer. The installer will check for both automatically."
                badge="Required"
                badgeColor="yellow"
                isCompleted={completedSteps["prerequisites"] ?? false}
                onComplete={(c) => toggleStep("prerequisites", c)}
              >
                {/* Requirements table */}
                <div className="rounded-xl border border-terminal-border overflow-hidden">
                  <div className="px-4 py-3 bg-[#161b22] border-b border-terminal-border">
                    <h4 className="text-sm font-semibold text-terminal-text font-mono">System Requirements</h4>
                  </div>
                  <div className="divide-y divide-terminal-border/50">
                    <div className="grid grid-cols-3 gap-4 px-4 py-3 text-xs text-terminal-comment uppercase tracking-widest font-mono bg-[#0d1117]">
                      <span>Tool</span>
                      <span>Required Version</span>
                      <span>Purpose</span>
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
                  The installer script checks for both <code className="text-blue-300">uv</code> and <code className="text-blue-300">Node.js</code> before proceeding.
                  If either is missing, it will print a clear error message with the exact install command to run.
                  You don't need to guess — just follow the on-screen instructions.
                </Callout>

                <Callout type="warning" title="Windows users: Node.js requires special handling">
                  On Windows, Node.js must be installed using the <strong>.msi installer</strong> from nodejs.org — not through a package manager.
                  After installation, you must close and reopen PowerShell as Administrator.
                  See <a href="#windows-prereqs" className="underline text-yellow-300">Appendix: Windows Prerequisites</a> for the full walkthrough.
                </Callout>
              </StepCard>
            </section>

            {/* STEP 2 – Install */}
            <section id="install">
              <StepCard
                stepNumber={2}
                title="Run the Installer"
                description="A single command handles the entire installation on your platform. The script installs both FWAuto and the AI CLI tools."
                badge="One Command"
                badgeColor="green"
                isCompleted={completedSteps["install"] ?? false}
                onComplete={(c) => toggleStep("install", c)}
              >
                <OsTabSelector
                  content={{
                    linux: (
                      <div className="space-y-3">
                        <p className="text-terminal-comment text-sm">Open a terminal and run:</p>
                        <CodeBlock
                          code={`curl -LsSf https://fwauto.ai/install.sh | bash`}
                          title="Linux Terminal"
                        />
                        <Callout type="tip" title="What does this command do?">
                          <code>curl -LsSf</code> downloads the install script silently and follows any redirects.
                          Piping it to <code>bash</code> runs it immediately. The script then installs both <code>fwauto</code> and the required AI CLI tools.
                        </Callout>
                      </div>
                    ),
                    macos: (
                      <div className="space-y-3">
                        <p className="text-terminal-comment text-sm">Open Terminal (⌘ + Space → "Terminal") and run:</p>
                        <CodeBlock
                          code={`curl -LsSf https://fwauto.ai/install.sh | bash`}
                          title="macOS Terminal"
                        />
                        <Callout type="info">
                          macOS and Linux use the same install script. If you see a security prompt from macOS, that's expected — you can safely proceed.
                        </Callout>
                      </div>
                    ),
                    windows: (
                      <div className="space-y-4">
                        <p className="text-terminal-comment text-sm">
                          Open <strong className="text-terminal-text">PowerShell as Administrator</strong> (right-click the Start menu → Windows PowerShell (Admin)) and run:
                        </p>
                        <CodeBlock
                          code={`powershell -ExecutionPolicy ByPass -c "irm https://fwauto.ai/install.ps1 | iex"`}
                          title="PowerShell (Administrator)"
                        />
                        <Callout type="warning" title="Administrator required">
                          The installer must be run from an elevated PowerShell session (Run as Administrator).
                          If you're not running as Administrator, the install will fail with a permissions error.
                        </Callout>
                        <Callout type="info" title="Why ExecutionPolicy ByPass?">
                          Windows blocks running downloaded scripts by default. The <code className="text-blue-300">-ExecutionPolicy ByPass</code> flag only affects this single session — it doesn't permanently change your system policy.
                        </Callout>
                      </div>
                    ),
                  }}
                />

                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-terminal-text">What the installer does:</p>
                  <div className="space-y-2">
                    {[
                      { step: "1", text: "Checks that uv and Node.js are installed and meet version requirements" },
                      { step: "2", text: "Installs the fwauto CLI tool via uv" },
                      { step: "3", text: "Installs the AI CLI tools via npm" },
                      { step: "4", text: "Prints a success message with verification instructions" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-3 text-sm text-terminal-comment">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-terminal-green/20 text-terminal-green text-xs flex items-center justify-center font-bold mt-0.5">
                          {item.step}
                        </span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </StepCard>
            </section>

            {/* STEP 3 – Verify */}
            <section id="verify">
              <StepCard
                stepNumber={3}
                title="Verify the Installation"
                description="Confirm that FWAuto was installed correctly by running the help command. You should see the FWAuto banner and a list of available commands."
                isCompleted={completedSteps["verify"] ?? false}
                onComplete={(c) => toggleStep("verify", c)}
              >
                <CodeBlock code={`fwauto --help`} title="Verify Installation" />

                <p className="text-terminal-comment text-sm">
                  A successful install displays the <strong className="text-terminal-text">FWAUTO</strong> ASCII banner followed by the version number and the available commands:
                </p>

                <CodeBlock
                  code={`FWAUTO
v0.9.0

Usage: fwauto [OPTIONS] COMMAND [ARGS]...

🚀 STM32 Firmware Automation Tool with AI

Commands:
  dashboard   Show or open FWAuto Dashboard
  build       Build firmware project
  deploy      Deploy firmware to device
  log         Analyze UART log files using AI
  help        Show help information
  auth        Authentication commands
  config      Configuration management
  rag         RAG document search`}
                  title="Expected Output"
                  showPrompt={false}
                />

                <Callout type="success" title="Installation confirmed!">
                  If you see output similar to above, FWAuto is installed correctly and ready to use. Note the version number — it appears just below the ASCII banner.
                </Callout>
              </StepCard>
            </section>

            {/* ─── SECTION HEADER ──────────────────────────────── */}
            <div className="flex items-center gap-3 pt-4">
              <LogIn className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">Authentication</h2>
            </div>

            {/* STEP 4 – Auth */}
            <section id="auth">
              <StepCard
                stepNumber={4}
                title="Log In with Google"
                description="FWAuto uses Google OAuth for secure authentication. You'll need a Google account and an existing FWAuto Dashboard account."
                badge="Google OAuth"
                badgeColor="blue"
                isCompleted={completedSteps["auth"] ?? false}
                onComplete={(c) => toggleStep("auth", c)}
              >
                <CodeBlock code={`fwauto auth login`} title="Authenticate" />

                <p className="text-terminal-comment text-sm leading-relaxed">
                  Running this command automatically opens your default browser to a Google sign-in page. Follow these steps:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      num: "1",
                      title: "Choose your account",
                      desc: 'A "Sign in with Google" page appears. Select the Google account you used when registering on the FWAuto Dashboard.',
                    },
                    {
                      num: "2",
                      title: "Grant access",
                      desc: 'FWAuto requests access to your name, profile photo, and email address. These are used to identify your account. Click "Continue" to approve.',
                    },
                    {
                      num: "3",
                      title: "Login successful",
                      desc: 'Your browser will show a "Login Successful!" confirmation page. You can close the browser tab and return to your terminal.',
                    },
                  ].map((s) => (
                    <div key={s.num} className="flex gap-4 p-4 rounded-xl border border-terminal-border/50 bg-[#161b22]">
                      <div className="shrink-0 w-7 h-7 rounded-full bg-terminal-green/20 border border-terminal-green/40 text-terminal-green text-xs font-bold font-mono flex items-center justify-center">
                        {s.num}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-terminal-text mb-0.5">{s.title}</p>
                        <p className="text-sm text-terminal-comment leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm font-medium text-terminal-text mt-2">Verify your login status:</p>
                <CodeBlock code={`fwauto auth status`} />
                <CodeBlock
                  code={`📋 FWAuto Auth Status
========================================
Status:     ✅ Logged in
User:       Your Name
Email:      you@gmail.com
Server:     https://fwauto-server-xxxxx.run.app
Dashboard:  https://fwauto-server-xxxxx.run.app/dashboard

Verifying token...    Token: ✅ Valid`}
                  showPrompt={false}
                  title="Expected Output"
                />
              </StepCard>
            </section>

            {/* ─── SECTION HEADER ──────────────────────────────── */}
            <div className="flex items-center gap-3 pt-4">
              <FolderOpen className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">Project Setup</h2>
            </div>

            {/* STEP 5 – Project Init */}
            <section id="init">
              <StepCard
                stepNumber={5}
                title="Initialize Your Project"
                description="Navigate to your firmware project directory and run any FWAuto command. If the project hasn't been initialized, the Setup Wizard launches automatically."
                isCompleted={completedSteps["init"] ?? false}
                onComplete={(c) => toggleStep("init", c)}
              >
                <Callout type="info" title="Navigate to your project first">
                  The setup wizard creates configuration files in your current directory. Make sure you're inside your firmware project folder before running this command.
                </Callout>

                <CodeBlock code={`cd /path/to/your/firmware-project\nfwauto build`} title="Trigger Setup Wizard" />

                <p className="text-terminal-comment text-sm">
                  If the project isn't initialized, you'll see the setup wizard with <strong className="text-terminal-text">3 configuration steps</strong>:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      step: "[1/3] SDK Configuration",
                      desc: "Enter the path to your firmware SDK. For AM62X, this is typically something like /home/user/ATK-AM62x-SDK. Press Enter to accept the default shown in brackets.",
                      example: "SDK path [/opt/ti-sdk]: /home/user/ATK-AM62x-SDK",
                    },
                    {
                      step: "[2/3] Build Configuration",
                      desc: "Choose how FWAuto should build your project. Select '1' for Makefile (most common), '2' to run a custom shell command, or press Enter for the default.",
                      example: "Build type:\n  1. makefile\n  2. command\nSelect [1]: 1",
                    },
                    {
                      step: "[3/3] Deploy Configuration",
                      desc: "Choose how FWAuto deploys firmware to your device. 'network' uses SSH (for Linux boards), 'serial' uses a serial port, and 'command' runs a custom script.",
                      example: "Deploy type:\n  1. network\n  2. serial\n  3. command\nSelect [1]: 1",
                    },
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

                <p className="text-sm font-medium text-terminal-text mt-2">After setup, a <code className="text-terminal-green">.fwauto/</code> directory is created:</p>
                <CodeBlock
                  code={`.fwauto/
├── config.toml      # Project configuration (edit to customize)
├── build/
│   └── Makefile     # Build script template (you must customize this)
└── logs/            # Directory where UART logs are stored`}
                  showPrompt={false}
                  title="Generated Project Structure"
                />

                <Callout type="warning" title="You must customize the Makefile">
                  The generated <code className="text-yellow-300">.fwauto/build/Makefile</code> is a template. You need to edit it to match your project's source paths, compiler settings, and output directories before running <code className="text-yellow-300">fwauto build</code>.
                </Callout>
              </StepCard>
            </section>

            {/* ─── SECTION HEADER ──────────────────────────────── */}
            <div className="flex items-center gap-3 pt-4">
              <Hammer className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">Basic Usage</h2>
            </div>

            {/* STEP 6 – Build */}
            <section id="build">
              <StepCard
                stepNumber={6}
                title="Build Your Firmware"
                description="Compile your firmware project with a single command. If the build fails, FWAuto's AI will automatically attempt to diagnose and fix the error — up to 3 times."
                badge="AI Auto-Repair"
                badgeColor="purple"
                isCompleted={completedSteps["build"] ?? false}
                onComplete={(c) => toggleStep("build", c)}
              >
                <CodeBlock code={`fwauto build`} title="Build Firmware" />

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border border-green-800 bg-green-950/20">
                    <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">✓ Build Success</p>
                    <p className="text-sm text-terminal-comment">
                      Output files are placed in the directory configured in your Makefile. FWAuto will display a success message.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-yellow-800 bg-yellow-950/20">
                    <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-2">⚡ Build Failure → AI Repair</p>
                    <p className="text-sm text-terminal-comment">
                      If the build fails, FWAuto captures the error output and sends it to the AI. The AI suggests a fix, applies it, and retries — up to 3 attempts.
                    </p>
                  </div>
                </div>

                <Callout type="info" title="AI auto-repair only fixes compilation errors">
                  The AI repair loop only activates for actual <strong>compilation errors</strong> — errors that occur when your code is being compiled.
                  Configuration errors (like a missing Makefile) will <em>not</em> trigger auto-repair. Always read the error message first.
                </Callout>
              </StepCard>
            </section>

            {/* STEP 7 – Deploy */}
            <section id="deploy">
              <StepCard
                stepNumber={7}
                title="Deploy to Your Device"
                description="Flash the compiled firmware to your hardware device. FWAuto supports network (SSH), serial port, and custom command deployment."
                isCompleted={completedSteps["deploy"] ?? false}
                onComplete={(c) => toggleStep("deploy", c)}
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">Basic deploy (uses your configured method):</p>
                    <CodeBlock code={`fwauto deploy`} />
                  </div>
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">Deploy and pass startup arguments to the binary:</p>
                    <CodeBlock code={`fwauto deploy --binary-args "on"`} />
                    <p className="text-xs text-terminal-comment mt-2">
                      The <code className="text-blue-400">--binary-args</code> flag passes arguments directly to the firmware binary on the device when it starts.
                      This is useful when your firmware has startup modes (e.g., <code className="text-terminal-green">"on"</code>, <code className="text-terminal-green">"debug"</code>, <code className="text-terminal-green">"test"</code>).
                    </p>
                  </div>
                </div>

                <Callout type="tip" title="Network deployment (AM62X, Linux boards)">
                  For network deploy, FWAuto uses SSH to copy the binary to your board and run it. Make sure the board is on the same network and you've configured <code className="text-purple-300">board_ip</code>, <code className="text-purple-300">board_user</code>, and <code className="text-purple-300">deploy_path</code> in your <code className="text-purple-300">config.toml</code>.
                </Callout>
              </StepCard>
            </section>

            {/* STEP 8 – Logs */}
            <section id="logs">
              <StepCard
                stepNumber={8}
                title="Analyze UART Logs with AI"
                description="Ask the AI questions about your firmware's runtime behavior using UART log files. The AI reads the log and answers in plain language."
                badge="AI Analysis"
                badgeColor="blue"
                isCompleted={completedSteps["logs"] ?? false}
                onComplete={(c) => toggleStep("logs", c)}
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">Analyze the most recent log (auto-detected from <code className="text-terminal-green">.fwauto/logs/</code>):</p>
                    <CodeBlock code={`fwauto log "Are there any errors?"`} />
                  </div>
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">Analyze a specific log file at any path:</p>
                    <CodeBlock code={`fwauto log "Summarize this log" --log-path /path/to/uart.log`} />
                  </div>
                </div>

                <p className="text-sm text-terminal-comment leading-relaxed">
                  You can ask any natural-language question about the log. For example:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    '"Are there any errors?"',
                    '"What happened during boot?"',
                    '"Why did the device reset?"',
                    '"Summarize this log for me"',
                  ].map((q, i) => (
                    <div key={i} className="px-3 py-2 rounded-lg border border-terminal-border bg-[#161b22] text-sm font-mono text-terminal-green">
                      {q}
                    </div>
                  ))}
                </div>
              </StepCard>
            </section>

            {/* STEP 9 – Chat */}
            <section id="chat">
              <StepCard
                stepNumber={9}
                title="Use Interactive Chat Mode"
                description="Launch FWAuto's conversational interface to control your firmware workflow using natural language or slash commands."
                isCompleted={completedSteps["chat"] ?? false}
                onComplete={(c) => toggleStep("chat", c)}
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">Start chat mode (interactive REPL):</p>
                    <CodeBlock code={`fwauto`} />
                  </div>
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">Start chat with an initial message:</p>
                    <CodeBlock code={`fwauto "Make the LED blink faster"`} />
                  </div>
                </div>

                <p className="text-sm font-medium text-terminal-text">Two ways to trigger actions in chat:</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border border-terminal-border bg-[#161b22]">
                    <p className="text-xs font-semibold text-terminal-green uppercase tracking-wider mb-2">Explicit — Slash Commands</p>
                    <p className="text-sm text-terminal-comment mb-3">Type a slash command for direct, predictable behavior.</p>
                    <div className="space-y-1 font-mono text-xs text-terminal-green">
                      <div>/build</div>
                      <div>/deploy</div>
                      <div>/log</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-terminal-border bg-[#161b22]">
                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Implicit — Natural Language</p>
                    <p className="text-sm text-terminal-comment mb-3">Describe what you want in plain English (or Chinese).</p>
                    <div className="space-y-1 font-mono text-xs text-terminal-text">
                      <div>"Compile the project"</div>
                      <div>"Deploy to the board"</div>
                      <div>"Any errors in logs?"</div>
                    </div>
                  </div>
                </div>

                <CommandTable commands={slashCommands} title="All Slash Commands" />

                <Callout type="tip" title="Switch to Traditional Chinese responses">
                  To have the AI respond in Traditional Chinese, run this while in chat mode:{" "}
                  <code className="text-purple-300">/config set project.language zh-TW</code>
                </Callout>
              </StepCard>
            </section>

            {/* ─── SECTION HEADER ──────────────────────────────── */}
            <div className="flex items-center gap-3 pt-4">
              <HelpCircle className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">Troubleshooting & FAQ</h2>
            </div>

            {/* STEP 10 – FAQ */}
            <section id="faq">
              <StepCard
                stepNumber={10}
                title="Common Issues & Answers"
                description="Solutions to the most frequently encountered problems. Click a question to expand the answer."
                isCompleted={completedSteps["faq"] ?? false}
                onComplete={(c) => toggleStep("faq", c)}
              >
                <FaqAccordion />
              </StepCard>
            </section>

            {/* ─── APPENDIX ──────────────────────────────────────── */}
            <div className="flex items-center gap-3 pt-4">
              <BookOpen className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">Appendices</h2>
            </div>

            {/* Windows prereqs */}
            <div id="windows-prereqs" className="rounded-2xl border border-terminal-border bg-[#0d1117] p-6 space-y-5">
              <h3 className="text-lg font-bold text-terminal-text font-display">Appendix A: Windows Prerequisites</h3>
              <p className="text-terminal-comment text-sm leading-relaxed">
                Windows requires a few extra steps compared to Linux/macOS. Node.js must be installed via the official .msi installer, and PowerShell needs specific configuration.
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-terminal-text mb-2">Step 1: Install uv (in PowerShell as Admin)</p>
                  <CodeBlock code={`powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`} />
                  <p className="text-xs text-terminal-comment mt-2">
                    After running, <strong>close and reopen PowerShell as Administrator</strong> to let the PATH changes take effect.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-terminal-text mb-2">Step 2: Install Node.js via .msi</p>
                  <p className="text-sm text-terminal-comment mb-2">
                    Visit <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer" className="text-terminal-blue underline">nodejs.org/en/download</a> and download the <strong>Windows Installer (.msi)</strong>. Make sure to select version 20 or newer.
                  </p>
                  <Callout type="warning">
                    During installation, ensure <strong>"Add to PATH"</strong> is checked. After installation completes, you must close and reopen PowerShell — otherwise <code>node</code> and <code>npm</code> commands won't work.
                  </Callout>
                </div>

                <div>
                  <p className="text-sm font-semibold text-terminal-text mb-2">Step 3: Set execution policy each session</p>
                  <CodeBlock code={`Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process`} />
                  <p className="text-xs text-terminal-comment mt-2">
                    This only affects the current PowerShell session. You need to run this each time you open a new PowerShell window before using FWAuto.
                  </p>
                </div>
              </div>
            </div>

            {/* Makefile spec */}
            <div className="rounded-2xl border border-terminal-border bg-[#0d1117] p-6 space-y-5">
              <h3 className="text-lg font-bold text-terminal-text font-display">Appendix B: Makefile Requirements</h3>
              <p className="text-terminal-comment text-sm leading-relaxed">
                When you choose "makefile" as the build type, FWAuto copies a template to <code className="text-terminal-green">.fwauto/build/Makefile</code>.
                You must customize this template to match your project.
              </p>

              <CommandTable
                title="Required Makefile Rules"
                commands={[
                  { cmd: "build (target)", description: "Must exist. FWAuto calls 'make build' by default. Customizable in config.toml." },
                  { cmd: "Return code 0", description: "A return code of 0 means success. Any non-zero code is treated as a failure and may trigger AI repair." },
                  { cmd: "stdout/stderr", description: "All output is captured and sent to the AI for error analysis. Keep output informative." },
                ]}
              />

              <CommandTable
                title="Key Variables to Configure (AM62X example)"
                commands={[
                  { cmd: "ARAGO_ENV", description: "Path to your SDK environment setup script", example: "/home/user/ATK-AM62x-SDK/environment-setup-*" },
                  { cmd: "SYSROOT", description: "Path to the cross-compilation sysroot", example: "/home/user/ATK-AM62x-SDK/sysroots/cortexa53-crypto-..." },
                  { cmd: "CC", description: "Cross-compiler binary path", example: "aarch64-linux-gnu-gcc" },
                  { cmd: "SRC_DIR", description: "Directory containing your C/C++ source files", example: "./src" },
                  { cmd: "BUILD_DIR", description: "Output directory for compiled binaries", example: "./build" },
                ]}
              />
            </div>

            {/* Config examples */}
            <div className="rounded-2xl border border-terminal-border bg-[#0d1117] p-6 space-y-5">
              <h3 className="text-lg font-bold text-terminal-text font-display">Appendix C–E: config.toml Examples</h3>
              <p className="text-terminal-comment text-sm">Complete configuration examples for common hardware targets.</p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-terminal-text mb-2">🔵 Arduino (Nano) — Appendix D</p>
                  <CodeBlock
                    code={`[project]
name = "Blink"

[sdk]
path = "~/.arduino15"

[build]
type = "command"
command = "arduino-cli compile --fqbn arduino:avr:nano ."

[deploy]
type = "command"
command = "arduino-cli upload -p /dev/ttyUSB0 --fqbn arduino:avr:nano ."

[log]
type = "serial"
serial_port = "/dev/ttyUSB0"
baudrate = 9600`}
                    title="Arduino config.toml"
                    showPrompt={false}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-terminal-text mb-2">🟠 AM62X Development Board — Appendix E</p>
                  <CodeBlock
                    code={`[project]
name = "my-am62x-project"

[sdk]
path = "/home/alientek/ATK-AM62x-SDK"

[build]
type = "makefile"
makefile = ".fwauto/build/Makefile"
target = "build"

[deploy]
type = "network"

[deployment]
board_ip = "192.168.50.169"
board_user = "root"
deploy_path = "/home/root"`}
                    title="AM62X config.toml"
                    showPrompt={false}
                  />
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="rounded-2xl border border-terminal-green/30 bg-terminal-green/5 p-8 text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-terminal-text font-display mb-2">You're ready to go!</h3>
              <p className="text-terminal-comment text-sm max-w-md mx-auto mb-6">
                You've covered everything from installation to AI log analysis. Head to the FWAuto Dashboard to manage your projects and explore advanced features.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://fwauto.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-terminal-green text-black text-sm font-semibold hover:bg-terminal-green/90 transition-colors"
                >
                  Open Dashboard <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-terminal-border mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-terminal-comment font-mono">
            FWAuto Quickstart Guide — Built with Next.js & Tailwind CSS
          </p>
          <p className="text-xs text-terminal-comment font-mono">
            <a href="https://fwauto.ai" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-green transition-colors">
              fwauto.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
