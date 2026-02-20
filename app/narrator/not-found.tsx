import Link from "next/link";
import { UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <EmptyState
        icon={UserX}
        title="الراوي غير موجود"
        description="لم يتم العثور على الراوي المطلوب"
      />
      <div className="mt-4 text-center">
        <Button variant="outline" asChild>
          <Link href="/">العودة للبحث</Link>
        </Button>
      </div>
    </div>
  );
}
