import { Suspense } from "react";
import { HeroSection } from "@/components/hero-section";
import { SearchFilters } from "@/components/search-filters";
import { SearchResults } from "@/components/search-results";
import { HadithCardSkeleton } from "@/components/loading-skeleton";
import { searchHadiths } from "@/lib/api/hadiths";
import type { HadithSearchParams } from "@/lib/api/types";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

async function Results({ searchParams }: { searchParams: Record<string, string> }) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 20;

  const filters: HadithSearchParams = {
    full_text_plain: searchParams.q || undefined,
    book_id: searchParams.book_id ? Number(searchParams.book_id) : undefined,
    narrators: searchParams.narrators
      ? searchParams.narrators.split(",").map(Number)
      : undefined,
    narrators_ordered: searchParams.ordered === "true",
    skip: (page - 1) * pageSize,
    limit: pageSize,
  };

  const hasFilters =
    filters.full_text_plain || filters.book_id || filters.narrators?.length;

  if (!hasFilters) return null;

  const results = await searchHadiths(filters);

  return <SearchResults results={results} page={page} pageSize={pageSize} />;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <>
      <HeroSection />
      <SearchFilters />
      <Suspense
        fallback={
          <div className="mx-auto max-w-5xl space-y-3 px-4 pb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <HadithCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <Results searchParams={params} />
      </Suspense>
    </>
  );
}
