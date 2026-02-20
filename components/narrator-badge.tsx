import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { HadithNarrator } from "@/lib/api/types";

interface NarratorBadgeProps {
  narrator: HadithNarrator;
  linked?: boolean;
}

export function NarratorBadge({ narrator, linked = true }: NarratorBadgeProps) {
  const badge = (
    <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
      {narrator.name}
    </Badge>
  );

  if (linked) {
    return (
      <Link
        href={`/narrator?name=${encodeURIComponent(narrator.name_plain)}&nid=${narrator.id}`}
      >
        {badge}
      </Link>
    );
  }

  return badge;
}
