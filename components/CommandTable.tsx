interface Command {
  cmd: string;
  description: string;
  example?: string;
}

interface CommandTableProps {
  commands: Command[];
  title?: string;
}

export function CommandTable({ commands, title }: CommandTableProps) {
  return (
    <div className="rounded-xl border border-terminal-border overflow-hidden">
      {title && (
        <div className="px-4 py-3 bg-[#161b22] border-b border-terminal-border">
          <h4 className="text-sm font-semibold text-terminal-text font-mono">{title}</h4>
        </div>
      )}
      <div className="divide-y divide-terminal-border/50">
        {commands.map((cmd, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-3 hover:bg-white/2 transition-colors"
          >
            <code className="shrink-0 px-2.5 py-1 rounded-md bg-terminal-bg text-terminal-green text-sm font-mono border border-terminal-border/50 w-fit">
              {cmd.cmd}
            </code>
            <div className="flex-1">
              <p className="text-sm text-terminal-text">{cmd.description}</p>
              {cmd.example && (
                <p className="text-xs text-terminal-comment mt-0.5 font-mono">
                  e.g.{" "}
                  <span className="text-terminal-blue">{cmd.example}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
