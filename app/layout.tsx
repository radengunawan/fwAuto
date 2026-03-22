import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FWAuto – Getting Started Guide",
  description:
    "A clear, step-by-step interactive guide to installing and using FWAuto, the AI-powered firmware development automation tool.",
  keywords: ["FWAuto", "firmware", "STM32", "automation", "AI", "quickstart"],
  openGraph: {
    title: "FWAuto – Getting Started Guide",
    description: "Install, authenticate, and build firmware in minutes with FWAuto.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
