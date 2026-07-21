import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import pl from "../../../messages/pl.json";
import en from "../../../messages/en.json";
import de from "../../../messages/de.json";

const messagesByLocale = { pl, en, de };

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "15-lecie summ-it",
  description:
    "Jubileuszowy wieczór z okazji 15-lecia summ-it — 27.11.2026, Hotel Moderno, Poznań.",
  icons: {
    icon: [{ url: "/logo-summit.ico", type: "image/x-icon" }],
    shortcut: "/logo-summit.ico",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = messagesByLocale[locale as keyof typeof messagesByLocale];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
