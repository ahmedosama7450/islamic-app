import { ArrowLeft } from "lucide-react";
import { NarratorBadge } from "@/components/narrator-badge";
import type { HadithNarrator } from "@/lib/api/types";

interface NarratorChainProps {
  narrators: HadithNarrator[];
}

export function NarratorChain({ narrators }: NarratorChainProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {narrators.map((narrator, index) => (
        <div key={narrator.id} className="flex items-center gap-2">
          <NarratorBadge narrator={narrator} />
          {index < narrators.length - 1 && (
            <ArrowLeft className="size-3.5 shrink-0 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  );
}
