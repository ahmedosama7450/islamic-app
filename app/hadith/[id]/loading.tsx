import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div className="h-8 w-24 animate-pulse rounded bg-muted" />
      <div className="flex gap-2">
        <div className="h-5 w-16 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-14 animate-pulse rounded-md bg-muted" />
      </div>
      <Card>
        <CardHeader>
          <div className="h-5 w-24 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="h-5 w-full animate-pulse rounded bg-muted" />
          <div className="h-5 w-full animate-pulse rounded bg-muted" />
          <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-5 w-full animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-6 w-20 animate-pulse rounded-full bg-muted" />
        ))}
      </div>
    </div>
  );
}
