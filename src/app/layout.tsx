import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaarbewijs Quiz - Oefenen voor Klein Vaarbewijs 1",
  description: "Oefen gratis voor je Klein Vaarbewijs 1 examen met deze interactieve quiz. Test je kennis van vaarregels, navigatie en veiligheid op het water met 25 examenvragen.",
  keywords: ["vaarbewijs", "klein vaarbewijs", "vaarbewijs 1", "oefenexamen", "vaarregels", "binnenvaart", "quiz", "examen"],
  authors: [{ name: "Vaarbewijs Quiz" }],
  creator: "Vaarbewijs Quiz",
  publisher: "Vaarbewijs Quiz",
  openGraph: {
    title: "Vaarbewijs Quiz - Oefen voor je Klein Vaarbewijs 1",
    description: "Oefen gratis voor je Klein Vaarbewijs 1 examen met deze interactieve quiz. Test je kennis van vaarregels, navigatie en veiligheid op het water.",
    url: "https://vaarbewijs-quiz.vercel.app",
    siteName: "Vaarbewijs Quiz",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaarbewijs Quiz - Oefen voor je Klein Vaarbewijs 1",
    description: "Oefen gratis voor je Klein Vaarbewijs 1 examen met deze interactieve quiz.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
