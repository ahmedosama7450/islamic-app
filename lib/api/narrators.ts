import { fetchApi } from "./client";
import type { Narrator, NarratorSearchParams, PaginatedResponse } from "./types";

export async function searchNarrators(
  params: NarratorSearchParams,
): Promise<PaginatedResponse<Narrator>> {
  const query: Record<string, string> = {};

  if (params.name_plain) query.name_plain = params.name_plain;
  if (params.kunya) query.kunya = params.kunya;
  if (params.nasab) query.nasab = params.nasab;
  if (params.skip !== undefined) query.skip = String(params.skip);
  if (params.limit !== undefined) query.limit = String(params.limit);

  return fetchApi<PaginatedResponse<Narrator>>("/narrators", query);
}

export async function getNarrator(id: string): Promise<Narrator> {
  return fetchApi<Narrator>(`/narrators/${encodeURIComponent(id)}`);
}
