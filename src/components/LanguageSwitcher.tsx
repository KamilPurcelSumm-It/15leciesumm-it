"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

type LocaleCode = "pl" | "en" | "de";

const langs: { code: LocaleCode }[] = [
  { code: "pl" },
  { code: "en" },
  { code: "de" },
];

function FlagPL({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" className={className} aria-hidden="true">
      <rect width="32" height="12" y="0" fill="#fff" />
      <rect width="32" height="12" y="12" fill="#dc143c" />
    </svg>
  );
}

function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" className={className} aria-hidden="true">
      <rect width="32" height="24" fill="#00247d" />
      <path d="M0 0 32 24M32 0 0 24" stroke="#fff" strokeWidth="4" />
      <path d="M0 0 32 24M32 0 0 24" stroke="#cf142b" strokeWidth="1.6" />
      <path d="M16 0V24M0 12H32" stroke="#fff" strokeWidth="6.5" />
      <path d="M16 0V24M0 12H32" stroke="#cf142b" strokeWidth="3.6" />
    </svg>
  );
}

function FlagDE({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" className={className} aria-hidden="true">
      <rect width="32" height="8" y="0" fill="#000" />
      <rect width="32" height="8" y="8" fill="#dd0000" />
      <rect width="32" height="8" y="16" fill="#ffce00" />
    </svg>
  );
}

const FLAG_COMPONENTS: Record<LocaleCode, (props: { className?: string }) => React.ReactElement> = {
  pl: FlagPL,
  en: FlagGB,
  de: FlagDE,
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("lang");
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(targetLocale: LocaleCode) {
    router.push(pathname, { locale: targetLocale });
  }

  return (
    <div className="absolute top-4 right-6 z-20 flex items-center gap-2 md:top-6 md:right-10">
      {langs
        .filter((l) => l.code !== locale)
        .map((l) => {
          const Flag = FLAG_COMPONENTS[l.code];
          return (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              title={t(l.code)}
              aria-label={t(l.code)}
              className="overflow-hidden rounded-sm shadow-sm ring-1 ring-black/10 transition-opacity hover:opacity-75 cursor-pointer"
            >
              <Flag className="h-5 w-7 block" />
            </button>
          );
        })}
    </div>
  );
}
