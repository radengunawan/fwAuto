'use client';

import { useState } from 'react';
import {
  Terminal,
  Zap,
  Shield,
  Cpu,
  BookOpen,
  ExternalLink,
  ChevronRight,
  Package,
  LogIn,
  FolderOpen,
  Hammer,
  MessageSquare,
  HelpCircle,
  Sparkles,
  Play,
} from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { StepCard } from '@/components/StepCard';
import { Callout } from '@/components/Callout';
import { OsTabSelector } from '@/components/OsTabSelector';
import { ProgressTracker } from '@/components/ProgressTracker';
import { CommandTable } from '@/components/CommandTable';
import { FaqAccordion } from '@/components/FaqAccordion';
import {
  TerminalDemo,
  INSTALL_DEMO,
  BUILD_DEMO,
  AUTH_DEMO,
} from '@/components/TerminalDemo';
import {
  ParticleBackground,
  useTypewriter,
  AnimatedCounter,
} from '@/components/HeroTerminal';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TerminalTyping } from '@/components/challenges/TerminalTyping';
import { QuizChallenge } from '@/components/challenges/QuizChallenge';
import { DragMatch } from '@/components/challenges/DragMatch';
import { SequenceChallenge } from '@/components/challenges/SequenceChallenge';
import { FillConfig } from '@/components/challenges/FillConfig';

// ─── STEP DEFINITIONS ──────────────────────────────────────────────
const STEP_IDS = [
  'prerequisites',
  'install',
  'verify',
  'auth',
  'init',
  'build',
  'deploy',
  'logs',
  'chat',
  'faq',
];

const slashCommands = [
  {
    cmd: '/build',
    description: 'Compile your firmware project',
    example: '/build',
  },
  {
    cmd: '/deploy',
    description: 'Deploy firmware to the connected device',
    example: '/deploy',
  },
  {
    cmd: '/log',
    description: 'Analyze the most recent UART log with AI',
    example: '/log',
  },
  {
    cmd: '/config',
    description: 'View or edit project configuration settings',
    example: '/config set project.language zh-TW',
  },
  {
    cmd: '/help',
    description: 'Display all available commands and usage hints',
    example: '/help',
  },
  {
    cmd: '/exit',
    description: 'Exit chat mode and return to your shell',
    example: '/exit',
  },
];

// ─── HERO TYPEWRITER ───────────────────────────────────────────────
function HeroTitle() {
  const verb = useTypewriter(
    ['build', 'deploy', 'debug', 'automate', 'fix'],
    70,
    2000
  );
  return (
    <span>
      firmware that{' '}
      <span className="text-terminal-green text-glow-green">
        {verb}
        <span className="animate-cursor-blink border-r-2 border-terminal-green">
          &nbsp;
        </span>
      </span>
    </span>
  );
}

function StatCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-4">
      <span className="text-3xl font-bold text-terminal-green font-mono">
        <AnimatedCounter target={value} suffix={suffix ?? ''} />
      </span>
      <span className="text-xs text-terminal-comment mt-1 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────
export default function Home() {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    {}
  );

  const complete = (id: string) =>
    setCompletedSteps((prev) => ({ ...prev, [id]: true }));
  const uncomplete = (id: string) =>
    setCompletedSteps((prev) => ({ ...prev, [id]: false }));

  const isCompleted = (id: string) => completedSteps[id] ?? false;

  const stepsWithStatus = STEP_IDS.map((id, i) => ({
    id,
    label: [
      'Prerequisites',
      'Installation',
      'Verify Install',
      'Authentication',
      'Project Init',
      'Build Firmware',
      'Deploy',
      'Log Analysis',
      'Chat Mode',
      'Troubleshooting',
    ][i],
    completed: isCompleted(id),
  }));

  return (
    <div className="min-h-screen bg-[#0a0e13]">
      {/* ═══ HERO ═════════════════════════════════════════════════ */}
      <header className="relative border-b border-terminal-border overflow-hidden min-h-[500px] flex flex-col">
        <ParticleBackground />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#3fb950 1px, transparent 1px), linear-gradient(90deg, #3fb950 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-terminal-green/8 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-terminal-green/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center flex-1 flex flex-col items-center justify-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-terminal-green/30 bg-terminal-green/10 text-terminal-green text-xs font-mono mb-8"
            style={{ animation: 'fadeIn 0.6s ease-out' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
            Interactive Getting Started Guide
            <Sparkles className="w-3 h-3" />
          </div>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-terminal-text font-display mb-4 tracking-tight leading-tight max-w-3xl"
            style={{ animation: 'slideUp 0.7s ease-out 0.2s both' }}
          >
            AI that helps you <HeroTitle />
          </h1>
          <p
            className="text-lg text-terminal-comment max-w-xl mx-auto leading-relaxed mb-2"
            style={{ animation: 'slideUp 0.7s ease-out 0.4s both' }}
          >
            FWAuto brings AI into every step of embedded firmware development.
          </p>
          <p
            className="text-sm text-terminal-comment/60 max-w-lg mx-auto mb-10"
            style={{ animation: 'slideUp 0.7s ease-out 0.5s both' }}
          >
            Read each section, then complete the interactive challenge to unlock
            the next step.
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
            style={{ animation: 'slideUp 0.7s ease-out 0.6s both' }}
          >
            {[
              { icon: <Cpu className="w-3.5 h-3.5" />, label: 'STM32 & AM62X' },
              {
                icon: <Zap className="w-3.5 h-3.5" />,
                label: 'AI Auto-Repair',
              },
              {
                icon: <Shield className="w-3.5 h-3.5" />,
                label: 'Google OAuth',
              },
              {
                icon: <Terminal className="w-3.5 h-3.5" />,
                label: 'Chat Mode',
              },
              {
                icon: <MessageSquare className="w-3.5 h-3.5" />,
                label: 'UART Log AI',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-terminal-border bg-[#0d1117]/80 text-xs text-terminal-comment"
              >
                <span className="text-terminal-green">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
          <div
            className="flex flex-wrap items-center justify-center gap-3"
            style={{ animation: 'slideUp 0.7s ease-out 0.7s both' }}
          >
            <a
              href="https://fwauto.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-terminal-green text-black text-sm font-bold hover:bg-terminal-green/90 transition-all active:scale-95"
            >
              FWAuto Dashboard <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="#prerequisites"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-terminal-border text-terminal-text text-sm hover:border-terminal-green/40 hover:bg-white/3 transition-all active:scale-95"
            >
              Start Guide <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ═══ DEMO SHOWCASE ════════════════════════════════════════ */}
      <section className="border-b border-terminal-border bg-[#0d1117]/60">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-terminal-green/20 bg-terminal-green/5 text-terminal-green text-xs font-mono mb-4">
              <Play className="w-3 h-3 fill-current" /> Live Interactive Demos
            </div>
            <h2 className="text-2xl font-bold text-terminal-text font-display">
              See FWAuto in action
            </h2>
            <p className="text-terminal-comment text-sm mt-2">
              Press{' '}
              <span className="text-terminal-green font-semibold">
                Run Demo
              </span>{' '}
              to watch each flow in a real terminal.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            {[
              { title: 'Installation', script: INSTALL_DEMO },
              { title: 'AI Build & Auto-Repair', script: BUILD_DEMO },
              { title: 'Authentication', script: AUTH_DEMO },
            ].map((demo, i) => (
              <div key={i} className="space-y-2">
                <p className="text-sm font-semibold text-terminal-text font-mono pl-1">
                  {demo.title}
                </p>
                <TerminalDemo title={demo.title} script={demo.script} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ════════════════════════════════════════════════ */}
      <section className="border-b border-terminal-border">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-center divide-x divide-terminal-border">
            <StatCard value={3} suffix=" platforms" label="Supported OS" />
            <StatCard value={3} suffix="x" label="AI Repair Attempts" />
            <StatCard value={2} suffix=" langs" label="Chat Languages" />
            <StatCard value={6} suffix=" cmds" label="Slash Commands" />
            <StatCard value={10} label="Setup Steps" />
          </div>
        </div>
      </section>

      {/* ═══ GUIDE ════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-60 shrink-0">
            <ProgressTracker steps={stepsWithStatus} />
          </aside>

          <div className="flex-1 min-w-0 space-y-6">
            {/* ── INSTALLATION ── */}
            <div className="flex items-center gap-3 pt-2">
              <Package className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">
                Installation
              </h2>
            </div>

            {/* STEP 1 — Prerequisites */}
            <section id="prerequisites">
              <StepCard
                stepNumber={1}
                title="Install Prerequisites"
                description="FWAuto needs two tools installed before you can run the installer."
                badge="Required"
                badgeColor="yellow"
                isCompleted={isCompleted('prerequisites')}
                onComplete={(c) =>
                  c ? complete('prerequisites') : uncomplete('prerequisites')
                }
                challengeLabel="🧠 Quick Knowledge Check"
                challenge={
                  <QuizChallenge
                    question="Which two tools must be installed before running the FWAuto installer?"
                    options={[
                      {
                        id: 'a',
                        label: 'Python and pip',
                        explanation: 'FWAuto uses uv, not plain pip.',
                      },
                      {
                        id: 'b',
                        label: 'uv and Node.js',
                        correct: true,
                        explanation:
                          'Correct! uv is the Python package manager and Node.js provides npm for the AI CLI tools.',
                      },
                      {
                        id: 'c',
                        label: 'Docker and Git',
                        explanation:
                          "FWAuto doesn't require Docker or Git to install.",
                      },
                      {
                        id: 'd',
                        label: 'Node.js and Go',
                        explanation:
                          "Go isn't needed. FWAuto uses uv for Python tooling.",
                      },
                    ]}
                    onSuccess={() => complete('prerequisites')}
                  />
                }
              >
                <div className="rounded-xl border border-terminal-border overflow-hidden">
                  <div className="px-4 py-3 bg-[#161b22] border-b border-terminal-border">
                    <h4 className="text-sm font-semibold text-terminal-text font-mono">
                      System Requirements
                    </h4>
                  </div>
                  <div className="divide-y divide-terminal-border/50">
                    <div className="grid grid-cols-3 gap-4 px-4 py-2 text-xs text-terminal-comment uppercase tracking-widest font-mono bg-[#0d1117]">
                      <span>Tool</span>
                      <span>Required</span>
                      <span>Purpose</span>
                    </div>
                    {[
                      {
                        tool: 'FWAuto Account',
                        version: 'Registered',
                        purpose: 'Create free account at FWAuto Dashboard',
                      },
                      {
                        tool: 'uv',
                        version: 'latest',
                        purpose: 'Python package manager — installs FWAuto',
                      },
                      {
                        tool: 'Node.js',
                        version: '≥ 20',
                        purpose: 'Includes npm — used for the AI CLI tooling',
                      },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-3 gap-4 px-4 py-3 hover:bg-white/2 transition-colors"
                      >
                        <code className="text-sm text-terminal-green font-mono">
                          {row.tool}
                        </code>
                        <span className="text-sm text-terminal-text font-mono">
                          {row.version}
                        </span>
                        <span className="text-sm text-terminal-comment">
                          {row.purpose}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <Callout
                  type="warning"
                  title="Windows: Node.js needs MSI installer"
                >
                  On Windows, install Node.js via the{' '}
                  <strong>.msi installer</strong> from nodejs.org and run
                  PowerShell as Administrator. See Appendix A.
                </Callout>
              </StepCard>
            </section>

            {/* STEP 2 — Install */}
            <section id="install">
              <StepCard
                stepNumber={2}
                title="Run the Installer"
                description="A single command installs FWAuto and all AI CLI tools. Select your OS and run it."
                badge="One Command"
                badgeColor="green"
                isCompleted={isCompleted('install')}
                onComplete={(c) =>
                  c ? complete('install') : uncomplete('install')
                }
                challengeLabel="⌨️ Type the Command"
                challenge={
                  <TerminalTyping
                    prompt="curl -LsSf https://fwauto.ai/install.sh | bash"
                    hint="This is the Linux/macOS install command."
                    onSuccess={() => complete('install')}
                  />
                }
              >
                <OsTabSelector
                  content={{
                    linux: (
                      <div className="space-y-3">
                        <p className="text-terminal-comment text-sm">
                          Open a terminal and run:
                        </p>
                        <CodeBlock
                          code={`curl -LsSf https://fwauto.ai/install.sh | bash`}
                          title="Linux Terminal"
                        />
                        <Callout type="tip" title="What does this do?">
                          Downloads the install script and pipes it directly to{' '}
                          <code>bash</code>. Installs both <code>fwauto</code>{' '}
                          and the AI CLI tools.
                        </Callout>
                      </div>
                    ),
                    macos: (
                      <div className="space-y-3">
                        <p className="text-terminal-comment text-sm">
                          Open Terminal (⌘+Space → "Terminal") and run:
                        </p>
                        <CodeBlock
                          code={`curl -LsSf https://fwauto.ai/install.sh | bash`}
                          title="macOS Terminal"
                        />
                      </div>
                    ),
                    windows: (
                      <div className="space-y-3">
                        <p className="text-terminal-comment text-sm">
                          Open{' '}
                          <strong className="text-terminal-text">
                            PowerShell as Administrator
                          </strong>
                          :
                        </p>
                        <CodeBlock
                          code={`powershell -ExecutionPolicy ByPass -c "irm https://fwauto.ai/install.ps1 | iex"`}
                          title="PowerShell (Admin)"
                        />
                        <Callout type="warning">
                          Must be run from an elevated (Admin) PowerShell
                          session.
                        </Callout>
                      </div>
                    ),
                  }}
                />
                <p className="text-sm text-terminal-comment">
                  Watch the installer:
                </p>
                <TerminalDemo title="Installation Demo" script={INSTALL_DEMO} />
              </StepCard>
            </section>

            {/* STEP 3 — Verify */}
            <section id="verify">
              <StepCard
                stepNumber={3}
                title="Verify the Installation"
                description="Run the help command to confirm FWAuto is installed. You'll see the ASCII banner and list of commands."
                isCompleted={isCompleted('verify')}
                onComplete={(c) =>
                  c ? complete('verify') : uncomplete('verify')
                }
                challengeLabel="⌨️ Type the Command"
                challenge={
                  <TerminalTyping
                    prompt="fwauto --help"
                    hint="This shows the FWAuto banner and all available commands."
                    onSuccess={() => complete('verify')}
                  />
                }
              >
                <CodeBlock code={`fwauto --help`} />
                <CodeBlock
                  code={`FWAUTO  v0.9.0\nUsage: fwauto [OPTIONS] COMMAND [ARGS]...\n\n🚀 STM32 Firmware Automation Tool with AI\n\nCommands:\n  dashboard, build, deploy, log, auth, config, rag`}
                  showPrompt={false}
                  title="Expected Output"
                />
                <Callout
                  type="success"
                  title="If you see the banner, you're good to go!"
                >
                  The version number appears just below the ASCII art.
                </Callout>
              </StepCard>
            </section>

            {/* ── AUTH ── */}
            <div className="flex items-center gap-3 pt-4">
              <LogIn className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">
                Authentication
              </h2>
            </div>

            {/* STEP 4 — Auth */}
            <section id="auth">
              <StepCard
                stepNumber={4}
                title="Log In with Google"
                description="FWAuto uses Google OAuth. One command opens your browser to the sign-in page."
                badge="Google OAuth"
                badgeColor="blue"
                isCompleted={isCompleted('auth')}
                onComplete={(c) => (c ? complete('auth') : uncomplete('auth'))}
                challengeLabel="🧠 Knowledge Check"
                challenge={
                  <QuizChallenge
                    question="After running `fwauto auth login`, what should you do when the browser opens?"
                    options={[
                      {
                        id: 'a',
                        label: 'Copy the URL and paste it into the terminal',
                        explanation:
                          'No, you interact with the browser directly — no copy-pasting needed.',
                      },
                      {
                        id: 'b',
                        label:
                          'Sign in with the Google account you registered with on the FWAuto Dashboard, then grant access',
                        correct: true,
                        explanation:
                          'Correct! Select your registered Google account and click Continue to grant access.',
                      },
                      {
                        id: 'c',
                        label: 'Close the browser and re-run the command',
                        explanation:
                          'No — wait for the browser flow to complete first.',
                      },
                      {
                        id: 'd',
                        label: 'Enter your FWAuto password in the browser',
                        explanation:
                          "FWAuto uses Google OAuth — there's no separate FWAuto password.",
                      },
                    ]}
                    onSuccess={() => complete('auth')}
                  />
                }
              >
                <CodeBlock code={`fwauto auth login`} />
                <div className="space-y-3">
                  {[
                    {
                      num: '1',
                      title: 'Choose your Google account',
                      desc: 'Select the account you registered on the FWAuto Dashboard.',
                    },
                    {
                      num: '2',
                      title: 'Grant access',
                      desc: 'FWAuto requests name, photo, and email. Click "Continue".',
                    },
                    {
                      num: '3',
                      title: 'Login successful',
                      desc: 'Browser shows "Login Successful!". Close it and return to the terminal.',
                    },
                  ].map((s) => (
                    <div
                      key={s.num}
                      className="flex gap-4 p-4 rounded-xl border border-terminal-border/50 bg-[#161b22]"
                    >
                      <div className="shrink-0 w-7 h-7 rounded-full bg-terminal-green/20 border border-terminal-green/40 text-terminal-green text-xs font-bold font-mono flex items-center justify-center">
                        {s.num}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-terminal-text mb-0.5">
                          {s.title}
                        </p>
                        <p className="text-sm text-terminal-comment">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <TerminalDemo title="Auth Demo" script={AUTH_DEMO} />
              </StepCard>
            </section>

            {/* ── PROJECT SETUP ── */}
            <div className="flex items-center gap-3 pt-4">
              <FolderOpen className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">
                Project Setup
              </h2>
            </div>

            {/* STEP 5 — Init */}
            <section id="init">
              <StepCard
                stepNumber={5}
                title="Initialize Your Project"
                description="Run any FWAuto command inside your firmware project directory. The 3-step Setup Wizard starts automatically if the project isn't initialized."
                isCompleted={isCompleted('init')}
                onComplete={(c) => (c ? complete('init') : uncomplete('init'))}
                challengeLabel="🎯 Match the Setup Wizard Steps"
                challenge={
                  <DragMatch
                    title="Match each wizard step to what it configures"
                    items={[
                      { id: 'sdk', label: '[1/3] SDK Configuration' },
                      { id: 'build', label: '[2/3] Build Configuration' },
                      { id: 'deploy', label: '[3/3] Deploy Configuration' },
                    ]}
                    targets={[
                      {
                        id: 't1',
                        label:
                          'Choose how firmware gets onto the device: network (SSH), serial port, or custom command.',
                        matchId: 'deploy',
                      },
                      {
                        id: 't2',
                        label:
                          'Enter the path to your firmware SDK (e.g. /home/user/ATK-AM62x-SDK).',
                        matchId: 'sdk',
                      },
                      {
                        id: 't3',
                        label:
                          'Choose your build method: Makefile or custom shell command.',
                        matchId: 'build',
                      },
                    ]}
                    onSuccess={() => complete('init')}
                  />
                }
              >
                <Callout type="info">
                  Navigate into your firmware project directory before running
                  this.
                </Callout>
                <CodeBlock
                  code={`cd /path/to/your/firmware-project\nfwauto build`}
                />
                <div className="space-y-3">
                  {[
                    {
                      step: '[1/3] SDK Configuration',
                      desc: 'Enter the path to your firmware SDK. Press Enter to accept the default.',
                      example:
                        'SDK path [/opt/ti-sdk]: /home/user/ATK-AM62x-SDK',
                    },
                    {
                      step: '[2/3] Build Configuration',
                      desc: "Select '1' for Makefile or '2' for a custom command.",
                      example:
                        'Build type:\n  1. makefile\n  2. command\nSelect [1]:',
                    },
                    {
                      step: '[3/3] Deploy Configuration',
                      desc: "Select 'network' (SSH), 'serial', or 'command'.",
                      example:
                        'Deploy type:\n  1. network\n  2. serial\n  3. command\nSelect [1]:',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-terminal-border/50 overflow-hidden"
                    >
                      <div className="px-4 py-2 bg-[#161b22] border-b border-terminal-border/50">
                        <code className="text-xs text-terminal-green font-mono">
                          {item.step}
                        </code>
                      </div>
                      <div className="p-4 space-y-2">
                        <p className="text-sm text-terminal-comment">
                          {item.desc}
                        </p>
                        <CodeBlock
                          code={item.example}
                          showPrompt={false}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <CodeBlock
                  code={`.fwauto/\n├── config.toml      # Project configuration\n├── build/\n│   └── Makefile     # Build script (customize this!)\n└── logs/            # UART log storage`}
                  showPrompt={false}
                  title="Generated Structure"
                />
                <Callout type="warning">
                  The generated Makefile is a template. Customize it for your
                  project before building.
                </Callout>
              </StepCard>
            </section>

            {/* ── BASIC USAGE ── */}
            <div className="flex items-center gap-3 pt-4">
              <Hammer className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">
                Basic Usage
              </h2>
            </div>

            {/* STEP 6 — Build */}
            <section id="build">
              <StepCard
                stepNumber={6}
                title="Build Your Firmware"
                description="Compile firmware with one command. When a build fails, the AI automatically diagnoses and patches the error — up to 3 attempts."
                badge="AI Auto-Repair"
                badgeColor="purple"
                isCompleted={isCompleted('build')}
                onComplete={(c) =>
                  c ? complete('build') : uncomplete('build')
                }
                challengeLabel="🔢 Put the Build Flow in Order"
                challenge={
                  <SequenceChallenge
                    question="When a build fails, what order does FWAuto follow?"
                    items={[
                      {
                        id: 'apply',
                        label: 'Apply the AI-suggested fix to the source code',
                        sublabel: 'AI patches the file automatically',
                      },
                      {
                        id: 'fail',
                        label: 'Build fails with a compilation error',
                        sublabel: 'Non-zero return code from make',
                      },
                      {
                        id: 'retry',
                        label: 'Retry the build (up to 3 attempts)',
                        sublabel: 'fwauto build retries automatically',
                      },
                      {
                        id: 'ai',
                        label: 'AI analyzes the error output',
                        sublabel: 'stdout/stderr sent to AI',
                      },
                      {
                        id: 'success',
                        label: 'Build succeeds ✓',
                        sublabel: 'Return code 0',
                      },
                    ]}
                    correctOrder={['fail', 'ai', 'apply', 'retry', 'success']}
                    onSuccess={() => complete('build')}
                  />
                }
              >
                <CodeBlock code={`fwauto build`} />
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border border-green-800 bg-green-950/20">
                    <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">
                      ✓ Build Success
                    </p>
                    <p className="text-sm text-terminal-comment">
                      Output placed in the directory configured in your
                      Makefile.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-yellow-800 bg-yellow-950/20">
                    <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-2">
                      ⚡ Failure → AI Repair
                    </p>
                    <p className="text-sm text-terminal-comment">
                      AI captures the error, suggests a fix, applies it,
                      retries. Up to 3 attempts.
                    </p>
                  </div>
                </div>
                <TerminalDemo
                  title="Build & AI Repair Demo"
                  script={BUILD_DEMO}
                />
                <Callout type="info">
                  AI repair only triggers on compilation errors — not config
                  errors like a missing Makefile.
                </Callout>
              </StepCard>
            </section>

            {/* STEP 7 — Deploy */}
            <section id="deploy">
              <StepCard
                stepNumber={7}
                title="Deploy to Your Device"
                description="Flash compiled firmware to hardware via network (SSH), serial port, or a custom command."
                isCompleted={isCompleted('deploy')}
                onComplete={(c) =>
                  c ? complete('deploy') : uncomplete('deploy')
                }
                challengeLabel="📝 Fill in the Config"
                challenge={
                  <FillConfig
                    title="Complete this AM62X network deploy config"
                    lines={[
                      '[project]',
                      {
                        id: 'name',
                        placeholder: 'your-project',
                        answer: 'my-firmware',
                        hint: "Any project name works — try 'my-firmware'",
                      },
                      '',
                      '[deploy]',
                      {
                        id: 'type',
                        placeholder: 'network / serial / command',
                        answer: 'network',
                        hint: "For SSH deploy, the type is 'network'",
                      },
                      '',
                      '[deployment]',
                      {
                        id: 'ip',
                        placeholder: 'board IP address',
                        answer: '192.168.1.100',
                        hint: "Try '192.168.1.100'",
                      },
                      {
                        id: 'user',
                        placeholder: 'login user on the board',
                        answer: 'root',
                        hint: "Embedded Linux boards usually log in as 'root'",
                      },
                      {
                        id: 'path',
                        placeholder: 'path on the board',
                        answer: '/home/root',
                        hint: "Try '/home/root'",
                      },
                    ]}
                    onSuccess={() => complete('deploy')}
                  />
                }
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">
                      Basic deploy:
                    </p>
                    <CodeBlock code={`fwauto deploy`} />
                  </div>
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">
                      Deploy with startup args:
                    </p>
                    <CodeBlock code={`fwauto deploy --binary-args "on"`} />
                  </div>
                </div>
                <Callout type="tip" title="Network deploy (SSH)">
                  Configure <code className="text-purple-300">board_ip</code>,{' '}
                  <code className="text-purple-300">board_user</code>, and{' '}
                  <code className="text-purple-300">deploy_path</code> in{' '}
                  <code>config.toml</code>.
                </Callout>
              </StepCard>
            </section>

            {/* STEP 8 — Logs */}
            <section id="logs">
              <StepCard
                stepNumber={8}
                title="Analyze UART Logs with AI"
                description="Ask the AI natural-language questions about your firmware's runtime behavior. Just point it at a log and ask."
                badge="AI Analysis"
                badgeColor="blue"
                isCompleted={isCompleted('logs')}
                onComplete={(c) => (c ? complete('logs') : uncomplete('logs'))}
                challengeLabel="⌨️ Type the Log Command"
                challenge={
                  <TerminalTyping
                    prompt={`fwauto log "Are there any errors?"`}
                    hint="Remember to include the question in double quotes."
                    onSuccess={() => complete('logs')}
                  />
                }
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">
                      Analyze the most recent log:
                    </p>
                    <CodeBlock code={`fwauto log "Are there any errors?"`} />
                  </div>
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">
                      Analyze a specific file:
                    </p>
                    <CodeBlock
                      code={`fwauto log "Summarize this log" --log-path /path/to/uart.log`}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    '"Are there any errors?"',
                    '"What happened during boot?"',
                    '"Why did the device reset?"',
                    '"Summarize this log"',
                  ].map((q, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-lg border border-terminal-border bg-[#161b22] text-sm font-mono text-terminal-green"
                    >
                      {q}
                    </div>
                  ))}
                </div>
              </StepCard>
            </section>

            {/* STEP 9 — Chat */}
            <section id="chat">
              <StepCard
                stepNumber={9}
                title="Use Interactive Chat Mode"
                description="Launch FWAuto's conversational AI interface. Use slash commands or natural language."
                isCompleted={isCompleted('chat')}
                onComplete={(c) => (c ? complete('chat') : uncomplete('chat'))}
                challengeLabel="🎯 Match Commands to Their Function"
                challenge={
                  <DragMatch
                    title="Drag each slash command to what it does"
                    items={[
                      { id: 'build', label: '/build' },
                      { id: 'deploy', label: '/deploy' },
                      { id: 'log', label: '/log' },
                      { id: 'config', label: '/config' },
                      { id: 'exit', label: '/exit' },
                    ]}
                    targets={[
                      {
                        id: 't1',
                        label: 'View or change project settings like language',
                        matchId: 'config',
                      },
                      {
                        id: 't2',
                        label: 'Compile the firmware project',
                        matchId: 'build',
                      },
                      {
                        id: 't3',
                        label: 'Quit the interactive chat session',
                        matchId: 'exit',
                      },
                      {
                        id: 't4',
                        label: 'Flash firmware onto the connected device',
                        matchId: 'deploy',
                      },
                      {
                        id: 't5',
                        label: 'Analyze the latest UART log with AI',
                        matchId: 'log',
                      },
                    ]}
                    onSuccess={() => complete('chat')}
                  />
                }
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">
                      Start interactive chat mode:
                    </p>
                    <CodeBlock code={`fwauto`} />
                  </div>
                  <div>
                    <p className="text-sm text-terminal-comment mb-2">
                      Start with a message:
                    </p>
                    <CodeBlock code={`fwauto "Make the LED blink faster"`} />
                  </div>
                </div>
                <CommandTable
                  commands={slashCommands}
                  title="All Slash Commands"
                />
                <Callout type="tip">
                  Switch AI to Traditional Chinese:{' '}
                  <code className="text-purple-300">
                    /config set project.language zh-TW
                  </code>
                </Callout>
              </StepCard>
            </section>

            {/* ── FAQ ── */}
            <div className="flex items-center gap-3 pt-4">
              <HelpCircle className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">
                Troubleshooting & FAQ
              </h2>
            </div>

            <section id="faq">
              <StepCard
                stepNumber={10}
                title="Common Issues & Answers"
                description="Click any question to expand the answer."
                isCompleted={isCompleted('faq')}
                onComplete={(c) => (c ? complete('faq') : uncomplete('faq'))}
                challengeLabel="🧠 Final Challenge"
                challenge={
                  <QuizChallenge
                    question="When a build error occurs, which of these will trigger AI auto-repair? (Select all that apply)"
                    multiSelect
                    options={[
                      {
                        id: 'a',
                        label: "src/main.c:55: error: 'LED_PIN' undeclared",
                        correct: true,
                        explanation:
                          '✓ This is a real compilation error — AI repair will activate.',
                      },
                      {
                        id: 'b',
                        label:
                          'make: .fwauto/build/Makefile: No such file or directory',
                        explanation:
                          '✗ This is a configuration error (missing Makefile), not a compilation error.',
                      },
                      {
                        id: 'c',
                        label:
                          "src/uart.c:12: error: implicit declaration of function 'UART_Init'",
                        correct: true,
                        explanation:
                          '✓ Compilation error — AI repair will activate.',
                      },
                      {
                        id: 'd',
                        label: 'fwauto: SDK path not found: /opt/ti-sdk',
                        explanation:
                          '✗ This is a configuration error — SDK path is wrong.',
                      },
                    ]}
                    onSuccess={() => complete('faq')}
                  />
                }
              >
                <FaqAccordion />
              </StepCard>
            </section>

            {/* ── APPENDICES ── */}
            <div className="flex items-center gap-3 pt-4">
              <BookOpen className="w-5 h-5 text-terminal-green" />
              <h2 className="text-xl font-bold text-terminal-text font-display">
                Appendices
              </h2>
            </div>

            <div
              id="windows-prereqs"
              className="rounded-2xl border border-terminal-border bg-[#0d1117] p-6 space-y-5"
            >
              <h3 className="text-lg font-bold text-terminal-text font-display">
                Appendix A: Windows Prerequisites
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-terminal-text mb-2">
                    Step 1: Install uv (PowerShell as Admin)
                  </p>
                  <CodeBlock
                    code={`powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`}
                  />
                  <p className="text-xs text-terminal-comment mt-2">
                    Close and reopen PowerShell as Administrator after running
                    this.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-terminal-text mb-2">
                    Step 2: Install Node.js via .msi
                  </p>
                  <p className="text-sm text-terminal-comment mb-2">
                    Download from{' '}
                    <a
                      href="https://nodejs.org/en/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terminal-blue underline"
                    >
                      nodejs.org
                    </a>
                    . Version ≥ 20. Ensure "Add to PATH" is checked.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-terminal-text mb-2">
                    Step 3: Set execution policy each session
                  </p>
                  <CodeBlock
                    code={`Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process`}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-terminal-border bg-[#0d1117] p-6 space-y-5">
              <h3 className="text-lg font-bold text-terminal-text font-display">
                Appendix B: Makefile Requirements
              </h3>
              <CommandTable
                title="Required Rules"
                commands={[
                  {
                    cmd: 'build (target)',
                    description:
                      "Must exist. FWAuto calls 'make build' by default.",
                  },
                  {
                    cmd: 'Return code 0',
                    description: 'Non-zero = failure. May trigger AI repair.',
                  },
                  {
                    cmd: 'stdout/stderr',
                    description: 'Captured and sent to AI for analysis.',
                  },
                ]}
              />
            </div>

            <div className="rounded-2xl border border-terminal-border bg-[#0d1117] p-6 space-y-5">
              <h3 className="text-lg font-bold text-terminal-text font-display">
                Appendix C–E: config.toml Examples
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-terminal-text mb-2">
                    🔵 Arduino (Nano)
                  </p>
                  <CodeBlock
                    code={`[project]\nname = "Blink"\n\n[build]\ntype = "command"\ncommand = "arduino-cli compile --fqbn arduino:avr:nano ."\n\n[deploy]\ntype = "command"\ncommand = "arduino-cli upload -p /dev/ttyUSB0 --fqbn arduino:avr:nano ."`}
                    showPrompt={false}
                    title="Arduino config.toml"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-terminal-text mb-2">
                    🟠 AM62X Development Board
                  </p>
                  <CodeBlock
                    code={`[project]\nname = "my-am62x-project"\n\n[build]\ntype = "makefile"\nmakefile = ".fwauto/build/Makefile"\n\n[deploy]\ntype = "network"\n\n[deployment]\nboard_ip = "192.168.50.169"\nboard_user = "root"\ndeploy_path = "/home/root"`}
                    showPrompt={false}
                    title="AM62X config.toml"
                  />
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="rounded-2xl border border-terminal-green/30 bg-terminal-green/5 p-8 text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-terminal-text font-display mb-2">
                You&apos;re ready to go!
              </h3>
              <p className="text-terminal-comment text-sm max-w-md mx-auto mb-6">
                All 10 steps covered. Head to the FWAuto Dashboard to manage
                your projects.
              </p>
              <a
                href="https://fwauto.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-terminal-green text-black text-sm font-bold hover:bg-terminal-green/90 transition-all active:scale-95"
              >
                Open Dashboard <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-terminal-border mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-terminal-comment font-mono">
            FWAuto Quickstart Guide — Built with Next.js & Tailwind CSS
          </p>
          <a
            href="https://fwauto.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-terminal-comment font-mono hover:text-terminal-green transition-colors"
          >
            fwauto.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
