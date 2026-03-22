# FWAuto Interactive Getting Started Guide

> A beautiful, interactive web guide for onboarding new users to **FWAuto** — the AI-powered firmware development automation tool.

VIEW - CLICK HERE: https://fw-auto-guide.vercel.app/

---

## ✨ Features

- **Interactive progress tracker** — check off each step as you complete it, with a sidebar showing your progress percentage
- **OS-aware installation tabs** — toggle between Linux, macOS, and Windows instructions
- **Syntax-highlighted terminal code blocks** — with one-click copy buttons and authentic terminal styling
- **Collapsible step cards** — expand/collapse individual steps to focus on what matters
- **FAQ accordion** — solutions to common problems, expandable on demand
- **Responsive layout** — works on mobile, tablet, and desktop
- **Dark terminal aesthetic** — carefully designed dark theme with green accents, scanline texture, and glow effects
- **No runtime dependencies** — static-friendly, deploys instantly to Vercel

---

## 🚀 Quick Deploy to Vercel

The fastest way to get this guide live:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/fwauto-guide
cd fwauto-guide

# 2. Install dependencies
npm install

# 3. Deploy to Vercel
npx vercel
```

Or click the **Deploy with Vercel** button above for one-click deployment.

---

## 🛠️ Local Development

### Prerequisites

- Node.js ≥ 20
- npm ≥ 9

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
fwauto-guide/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main guide page (all sections)
│   └── globals.css         # Global styles, CSS variables, animations
├── components/
│   ├── CodeBlock.tsx       # Terminal-style code block with copy button
│   ├── StepCard.tsx        # Collapsible step card with completion toggle
│   ├── Callout.tsx         # Info/warning/tip/success callout boxes
│   ├── OsTabSelector.tsx   # Linux / macOS / Windows tab switcher
│   ├── ProgressTracker.tsx # Sticky sidebar progress indicator
│   ├── CommandTable.tsx    # Slash command reference table
│   └── FaqAccordion.tsx    # FAQ expandable accordion
├── lib/
│   └── utils.ts            # cn() utility (clsx + tailwind-merge)
├── public/                 # Static assets
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 🎨 Design System

The guide uses a **dark terminal aesthetic** inspired by GitHub's dark theme and classic terminal emulators.

### Color Palette

| Token             | Value     | Usage                        |
| ----------------- | --------- | ---------------------------- |
| `--background`    | `#0a0e13` | Page background              |
| `--card`          | `#0d1117` | Card/panel backgrounds       |
| `--card-border`   | `#21262d` | Borders                      |
| `--accent`        | `#3fb950` | Green accent (primary brand) |
| `--muted`         | `#8b949e` | Secondary text               |
| `terminal-blue`   | `#58a6ff` | Flags/options in code        |
| `terminal-yellow` | `#d29922` | Strings in code              |

### Typography

- **Body**: DM Sans — clean, readable, modern
- **Display/Headings**: Space Grotesk — distinctive, technical feel
- **Code**: JetBrains Mono — developer-friendly monospace

---

## 🧩 Component API

### `<CodeBlock />`

```tsx
<CodeBlock
  code="fwauto build"
  title="Terminal" // Optional window title
  language="bash" // Optional language label
  showPrompt={true} // Show $ prompt prefix (default: true)
/>
```

### `<StepCard />`

```tsx
<StepCard
  stepNumber={1}
  title="Install Prerequisites"
  description="Short description..."
  badge="Required"
  badgeColor="yellow" // "green" | "blue" | "yellow" | "purple"
  isCompleted={completedSteps['step-id']}
  onComplete={(completed) => toggleStep('step-id', completed)}
>
  {/* Step content */}
</StepCard>
```

### `<Callout />`

```tsx
<Callout type="warning" title="Important Note">
  Your callout content here.
</Callout>
```

Types: `"info"` | `"warning"` | `"tip"` | `"success"` | `"error"`

### `<OsTabSelector />`

```tsx
<OsTabSelector
  content={{
    linux: <div>Linux content...</div>,
    macos: <div>macOS content...</div>,
    windows: <div>Windows content...</div>,
  }}
/>
```

---

## ⚙️ Configuration

### Customizing Guide Content

All guide content lives in `app/page.tsx`. Each section is a self-contained `<StepCard>` component. To add a new step:

1. Add an entry to the `STEPS` array at the top of `page.tsx`
2. Add a corresponding `<section id="your-step-id">` with a `<StepCard>` inside the main content area
3. The `ProgressTracker` sidebar will automatically include the new step

### Customizing Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --background: #0a0e13;
  --accent: #3fb950;
  /* ... */
}
```

---

## 🌐 Vercel Deployment

This project is optimized for Vercel with zero configuration:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (first time - follow prompts)
vercel

# Deploy to production
vercel --prod
```

The `vercel.json` in the root configures the build automatically. No environment variables are required.

### Custom Domain

After deploying, add your custom domain in the Vercel dashboard under **Settings → Domains**.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run `npm run lint` to check for issues
5. Open a pull request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built with ❤️ for the FWAuto community</p>
  <p>
    <a href="https://fwauto.ai">fwauto.ai</a>
  </p>
</div>
