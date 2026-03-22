import { ReactNode } from "react";
import { Info, AlertTriangle, Lightbulb, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip" | "success" | "error";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

const styles: Record<CalloutType, { border: string; bg: string; icon: ReactNode; titleColor: string; textColor: string }> = {
  info: {
    border: "border-blue-800",
    bg: "bg-blue-950/30",
    icon: <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />,
    titleColor: "text-blue-300",
    textColor: "text-blue-200/80",
  },
  warning: {
    border: "border-yellow-800",
    bg: "bg-yellow-950/30",
    icon: <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />,
    titleColor: "text-yellow-300",
    textColor: "text-yellow-200/80",
  },
  tip: {
    border: "border-purple-800",
    bg: "bg-purple-950/30",
    icon: <Lightbulb className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />,
    titleColor: "text-purple-300",
    textColor: "text-purple-200/80",
  },
  success: {
    border: "border-green-800",
    bg: "bg-green-950/30",
    icon: <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />,
    titleColor: "text-green-300",
    textColor: "text-green-200/80",
  },
  error: {
    border: "border-red-800",
    bg: "bg-red-950/30",
    icon: <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />,
    titleColor: "text-red-300",
    textColor: "text-red-200/80",
  },
};

export function Callout({ type = "info", title, children, className }: CalloutProps) {
  const s = styles[type];
  return (
    <div className={cn("rounded-xl border p-4", s.border, s.bg, className)}>
      <div className="flex gap-3">
        {s.icon}
        <div className="flex-1 min-w-0">
          {title && <p className={cn("font-semibold text-sm mb-1", s.titleColor)}>{title}</p>}
          <div className={cn("text-sm leading-relaxed", s.textColor)}>{children}</div>
        </div>
      </div>
    </div>
  );
}
