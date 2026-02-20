import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { JarhWaTadil } from "@/lib/api/types";

interface JarhWaTadilProps {
  evaluations: JarhWaTadil[];
}

export function JarhWaTadilSection({ evaluations }: JarhWaTadilProps) {
  if (evaluations.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">الجرح والتعديل</h2>
      <div className="space-y-3">
        {evaluations.map((evaluation, index) => (
          <Card key={index} size="sm">
            <CardHeader>
              <CardTitle className="text-base">{evaluation.scholar}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {evaluation.quotes.map((quote, qi) => (
                <blockquote
                  key={qi}
                  className="border-s-2 border-gold/50 ps-3 text-sm text-muted-foreground"
                >
                  {quote}
                </blockquote>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
