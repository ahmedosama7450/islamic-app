import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { searchNarrators, getNarrator } from "@/lib/api/narrators";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NarratorInfo } from "@/components/narrator-info";
import { JarhWaTadilSection } from "@/components/jarh-wa-tadil";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function NarratorPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { name, nid } = params;

  if (!name || !nid) notFound();

  // Two-step lookup: search by name, match by narrator_id, then fetch full profile
  const searchResult = await searchNarrators({ name_plain: name, limit: 20 });
  const match = searchResult.items.find(
    (n) => n.narrator_id === Number(nid),
  );

  if (!match) notFound();

  const narrator = await getNarrator(match.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/">
          <ArrowRight className="size-4" />
          العودة للبحث
        </Link>
      </Button>

      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{narrator.name}</CardTitle>
          {narrator.kunya && (
            <p className="text-muted-foreground">{narrator.kunya}</p>
          )}
        </CardHeader>
        <CardContent>
          <NarratorInfo narrator={narrator} />
        </CardContent>
      </Card>

      {/* Rankings */}
      {(narrator.rank_ibn_hajar || narrator.rank_dhahabi) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">الرتبة</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {narrator.rank_ibn_hajar && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">ابن حجر</p>
                <Badge className="bg-gold text-gold-foreground">
                  {narrator.rank_ibn_hajar}
                </Badge>
              </div>
            )}
            {narrator.rank_dhahabi && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">الذهبي</p>
                <Badge className="bg-gold text-gold-foreground">
                  {narrator.rank_dhahabi}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Relations */}
      {narrator.relations && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">العلاقات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{narrator.relations}</p>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Jarh wa Tadil */}
      <JarhWaTadilSection evaluations={narrator.jarh_wa_tadil} />

      <Separator />

      {/* Link to hadiths */}
      <Button variant="outline" asChild>
        <Link href={`/?narrators=${narrator.narrator_id}&page=1`}>
          <Search className="size-4" />
          البحث عن أحاديث هذا الراوي
        </Link>
      </Button>
    </div>
  );
}
