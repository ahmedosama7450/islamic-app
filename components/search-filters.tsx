"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchNarrators } from "@/lib/api/narrators";
import type { Narrator } from "@/lib/api/types";

interface SelectedNarrator {
  id: number;
  name: string;
  name_plain: string;
}

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Local state for inputs
  const [textQuery, setTextQuery] = useState(searchParams.get("q") ?? "");
  const [bookId, setBookId] = useState(searchParams.get("book_id") ?? "");
  const [ordered, setOrdered] = useState(searchParams.get("ordered") === "true");
  const [selectedNarrators, setSelectedNarrators] = useState<SelectedNarrator[]>([]);

  // Narrator search state
  const [narratorQuery, setNarratorQuery] = useState("");
  const [narratorResults, setNarratorResults] = useState<Narrator[]>([]);
  const [showNarratorDropdown, setShowNarratorDropdown] = useState(false);
  const [loadingNarrators, setLoadingNarrators] = useState(false);
  const narratorInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        narratorInputRef.current &&
        !narratorInputRef.current.contains(e.target as Node)
      ) {
        setShowNarratorDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Debounced narrator search
  const searchForNarrators = useCallback(async (query: string) => {
    if (!query.trim()) {
      setNarratorResults([]);
      return;
    }
    setLoadingNarrators(true);
    try {
      const result = await searchNarrators({ name_plain: query, limit: 10 });
      setNarratorResults(result.items);
    } catch {
      setNarratorResults([]);
    } finally {
      setLoadingNarrators(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (narratorQuery.trim()) {
      debounceRef.current = setTimeout(() => searchForNarrators(narratorQuery), 300);
    } else {
      setNarratorResults([]);
    }
    return () => clearTimeout(debounceRef.current);
  }, [narratorQuery, searchForNarrators]);

  function addNarrator(narrator: Narrator) {
    if (selectedNarrators.some((n) => n.id === narrator.narrator_id)) return;
    setSelectedNarrators((prev) => [
      ...prev,
      { id: narrator.narrator_id, name: narrator.name, name_plain: narrator.name_plain },
    ]);
    setNarratorQuery("");
    setShowNarratorDropdown(false);
  }

  function removeNarrator(narratorId: number) {
    setSelectedNarrators((prev) => prev.filter((n) => n.id !== narratorId));
  }

  function handleSubmit() {
    const params = new URLSearchParams();
    if (textQuery.trim()) params.set("q", textQuery.trim());
    if (bookId.trim()) params.set("book_id", bookId.trim());
    if (selectedNarrators.length > 0) {
      params.set("narrators", selectedNarrators.map((n) => n.id).join(","));
      if (ordered) params.set("ordered", "true");
    }
    params.set("page", "1");

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  function handleClear() {
    setTextQuery("");
    setBookId("");
    setSelectedNarrators([]);
    setOrdered(false);
    startTransition(() => {
      router.push("/");
    });
  }

  const hasFilters =
    textQuery.trim() || bookId.trim() || selectedNarrators.length > 0;

  return (
    <div className="min-w-0 space-y-4 text-start">
      {/* Primary search - large and prominent */}
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute start-5 top-1/2 size-6 -translate-y-1/2 text-gold/60" />
        <Input
          placeholder="ابحث في نص الحديث..."
          value={textQuery}
          onChange={(e) => setTextQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="h-14 rounded-2xl border-gold/30 bg-background pe-28 ps-13 text-lg shadow-md ring-2 ring-gold/10 placeholder:text-muted-foreground/60 focus-visible:border-gold/50 focus-visible:ring-gold/25 sm:h-16 sm:pe-36 sm:text-xl"
        />
        <div className="absolute end-2 flex items-center gap-1.5">
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 text-muted-foreground hover:text-foreground sm:h-9"
            >
              مسح
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!hasFilters}
            className="h-9 rounded-xl bg-gold px-4 text-gold-foreground hover:bg-gold/90 sm:h-10 sm:px-5"
          >
            <Search className="size-4" />
            بحث
          </Button>
        </div>
      </div>

      {/* Secondary filters row */}
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
        <Input
          type="number"
          placeholder="رقم الكتاب"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="h-10 shrink-0 border-gold/20 bg-background/80 backdrop-blur-sm sm:w-36"
        />
        <div className="relative min-w-0 flex-1">
          <Input
            ref={narratorInputRef}
            placeholder="ابحث عن راوٍ بالاسم..."
            value={narratorQuery}
            onChange={(e) => {
              setNarratorQuery(e.target.value);
              setShowNarratorDropdown(true);
            }}
            onFocus={() => narratorQuery.trim() && setShowNarratorDropdown(true)}
            className="h-10 border-gold/20 bg-background/80 backdrop-blur-sm"
          />
          {showNarratorDropdown && (narratorResults.length > 0 || loadingNarrators) && (
            <div
              ref={dropdownRef}
              className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-popover p-1 shadow-md"
            >
              {loadingNarrators ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  جاري البحث...
                </div>
              ) : (
                narratorResults.map((narrator) => {
                  const isSelected = selectedNarrators.some(
                    (n) => n.id === narrator.narrator_id,
                  );
                  return (
                    <button
                      key={narrator.id}
                      type="button"
                      disabled={isSelected}
                      onClick={() => addNarrator(narrator)}
                      className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-start text-sm transition-colors hover:bg-accent disabled:opacity-50"
                    >
                      <span className="min-w-0 truncate font-medium">{narrator.name}</span>
                      {narrator.kunya && (
                        <span className="shrink-0 text-muted-foreground">
                          ({narrator.kunya})
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected narrators as chips */}
      {selectedNarrators.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg bg-background/50 p-2">
          {selectedNarrators.map((narrator, index) => (
            <span key={narrator.id} className="flex max-w-full items-start gap-1 rounded-full border border-transparent bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
              <span className="shrink-0 text-muted-foreground">{index + 1}</span>
              <span className="break-all">{narrator.name}</span>
              <button
                type="button"
                onClick={() => removeNarrator(narrator.id)}
                className="ms-0.5 shrink-0 rounded-full p-0.5 hover:bg-foreground/10"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setOrdered(!ordered)}
            className="gap-1 text-xs"
          >
            <ArrowDownUp className="size-3" />
            {ordered ? "مرتب" : "غير مرتب"}
          </Button>
        </div>
      )}

    </div>
  );
}
