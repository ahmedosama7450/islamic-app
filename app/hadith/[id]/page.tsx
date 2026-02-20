import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHadith } from "@/lib/api/hadiths";
import { ApiError } from "@/lib/api/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NarratorChain } from "@/components/narrator-chain";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HadithPage({ params }: PageProps) {
  const { id } = await params;

  let hadith;
  try {
    hadith = await getHadith(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/">
          <ArrowRight className="size-4" />
          العودة للبحث
        </Link>
      </Button>

      {/* Metadata */}
      <div className="flex items-center gap-2">
        <Badge variant="secondary">كتاب {hadith.book_id}</Badge>
        <Badge variant="outline">صفحة {hadith.page_number}</Badge>
      </div>

      {/* Full text */}
      <Card className="border-gold/30">
        <CardHeader>
          <CardTitle className="text-base text-gold-foreground">النص الكامل</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl leading-loose">{hadith.full_text}</p>
        </CardContent>
      </Card>

      {/* Matn */}
      {hadith.matn && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">المتن</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">{hadith.matn}</p>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Narrator chain */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">سلسلة الرواة</h2>
        <NarratorChain narrators={hadith.narrators} />
      </div>
    </div>
  );
}
