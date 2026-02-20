import { fetchApi } from "./client";
import type { Hadith, HadithSearchParams, PaginatedResponse } from "./types";

export async function searchHadiths(
  params: HadithSearchParams,
): Promise<PaginatedResponse<Hadith>> {
  const query: Record<string, string> = {};

  if (params.full_text_plain) query.full_text_plain = params.full_text_plain;
  if (params.book_id !== undefined) query.book_id = String(params.book_id);
  if (params.narrators?.length) query.narrators = params.narrators.join(",");
  if (params.narrators_ordered) query.narrators_ordered = "true";
  if (params.skip !== undefined) query.skip = String(params.skip);
  if (params.limit !== undefined) query.limit = String(params.limit);

  return fetchApi<PaginatedResponse<Hadith>>("/hadiths", query);
}

export async function getHadith(id: string): Promise<Hadith> {
  return fetchApi<Hadith>(`/hadiths/${encodeURIComponent(id)}`);
}
