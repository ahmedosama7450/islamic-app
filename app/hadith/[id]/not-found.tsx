import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { BookX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <EmptyState
        icon={BookX}
        title="الحديث غير موجود"
        description="لم يتم العثور على الحديث المطلوب"
      />
      <div className="mt-4 text-center">
        <Button variant="outline" asChild>
          <Link href="/">العودة للبحث</Link>
        </Button>
      </div>
    </div>
  );
}
