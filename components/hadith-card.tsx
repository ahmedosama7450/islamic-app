import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NarratorBadge } from "@/components/narrator-badge";
import type { Hadith } from "@/lib/api/types";

interface HadithCardProps {
  hadith: Hadith;
}

export function HadithCard({ hadith }: HadithCardProps) {
  const previewText =
    hadith.full_text_plain.length > 200
      ? hadith.full_text_plain.slice(0, 200) + "..."
      : hadith.full_text_plain;

  return (
    <Card className="transition-colors hover:border-primary/30">
      <Link href={`/hadith/${hadith.id}`}>
        <CardHeader className="flex-row items-center gap-2 pb-2">
          <Badge variant="secondary">كتاب {hadith.book_id}</Badge>
          <Badge variant="outline">صفحة {hadith.page_number}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{previewText}</p>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-wrap gap-1.5">
        {hadith.narrators.map((narrator) => (
          <NarratorBadge key={narrator.id} narrator={narrator} />
        ))}
      </CardFooter>
    </Card>
  );
}
