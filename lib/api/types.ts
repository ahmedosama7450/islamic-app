export interface HadithNarrator {
  id: number;
  name: string;
  name_plain: string;
}

export interface Hadith {
  id: string;
  book_id: number;
  page_number: number;
  full_text: string;
  full_text_plain: string;
  matn: string;
  matn_plain: string;
  narrators: HadithNarrator[];
}

export interface JarhWaTadil {
  scholar: string;
  quotes: string[];
}

export interface Narrator {
  id: string;
  narrator_id: number;
  name: string;
  name_plain: string;
  kunya: string;
  nasab: string;
  death_date: string;
  tabaqa: string;
  rank_ibn_hajar: string;
  rank_dhahabi: string;
  relations: string;
  jarh_wa_tadil: JarhWaTadil[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

export interface HadithSearchParams {
  full_text_plain?: string;
  book_id?: number;
  narrators?: number[];
  narrators_ordered?: boolean;
  skip?: number;
  limit?: number;
}

export interface NarratorSearchParams {
  name_plain?: string;
  kunya?: string;
  nasab?: string;
  skip?: number;
  limit?: number;
}
