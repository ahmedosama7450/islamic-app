import type { Narrator } from "@/lib/api/types";

interface NarratorInfoProps {
  narrator: Narrator;
}

const fields: { key: keyof Narrator; label: string }[] = [
  { key: "kunya", label: "الكنية" },
  { key: "nasab", label: "النسب" },
  { key: "death_date", label: "تاريخ الوفاة" },
  { key: "tabaqa", label: "الطبقة" },
];

export function NarratorInfo({ narrator }: NarratorInfoProps) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
      {fields.map(({ key, label }) => {
        const value = narrator[key];
        if (!value || typeof value !== "string") return null;
        return (
          <div key={key} className="contents">
            <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
            <dd className="text-sm">{value}</dd>
          </div>
        );
      })}
    </dl>
  );
}
