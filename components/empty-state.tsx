import type { LucideIcon } from "lucide-react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
}

export function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Icon className="size-12 text-muted-foreground/50" />
      <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground/70">
          {description}
        </p>
      )}
    </div>
  );
}
