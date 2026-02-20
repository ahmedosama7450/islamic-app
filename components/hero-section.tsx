export function HeroSection({ children }: { children?: React.ReactNode }) {
  return (
    <section className="border-b border-gold/20 bg-gradient-to-b from-gold/5 via-gold/3 to-transparent pb-8 pt-12 text-center">
      <div className="mx-auto max-w-3xl space-y-6 px-4">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            حدثنا
          </h1>
          <p className="text-lg text-muted-foreground">
            ابحث في الأحاديث النبوية بالنص أو بالرواة أو برقم الكتاب
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
