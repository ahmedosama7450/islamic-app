import { NarratorProfileSkeleton } from "@/components/loading-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 h-8 w-24 animate-pulse rounded bg-muted" />
      <NarratorProfileSkeleton />
    </div>
  );
}
