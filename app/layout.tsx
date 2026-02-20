import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import { DirectionProvider } from "@/components/ui/direction";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const notoSans = Noto_Sans({ variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "حدثنا",
  description: "محرك بحث في الأحاديث النبوية والرواة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={notoSans.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <DirectionProvider dir="rtl">
            <Header />
            <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
            <Footer />
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
