import { HadithCard } from "@/components/hadith-card";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import type { Hadith, PaginatedResponse } from "@/lib/api/types";

interface SearchResultsProps {
  results: PaginatedResponse<Hadith>;
  page: number;
  pageSize: number;
}

export function SearchResults({ results, page, pageSize }: SearchResultsProps) {
  if (results.items.length === 0) {
    return (
      <EmptyState title="لا توجد نتائج" description="حاول تعديل معايير البحث" />
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 pb-8">
      <p className="text-sm text-muted-foreground mt-5">
        {results.total} نتيجة
      </p>
      <div className="space-y-3">
        {results.items.map((hadith) => (
          <HadithCard key={hadith.id} hadith={hadith} />
        ))}
      </div>
      <Pagination total={results.total} page={page} pageSize={pageSize} />
    </div>
  );
}
