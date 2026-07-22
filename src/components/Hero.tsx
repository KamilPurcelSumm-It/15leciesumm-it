"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-neutral-100 px-6 py-12 md:px-16 md:py-16 md:min-h-[560px] lg:min-h-[640px] xl:min-h-[700px]">
      <LanguageSwitcher />

      {/* Tło — grafika 15-lecia na całą szerokość sekcji (desktop) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <Image
          src="/images/hero3.jpg"
          alt=""
          fill
          priority
          quality={100}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-right"
          style={{ filter: 'contrast(1.12) saturate(1.08) brightness(1.02)' }}
        />
      </div>
      {/* mobile image removed — hide on small screens per design */}

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-maroon">
            {t("eyebrow")}
          </p>

          <h1 className="mb-5 text-3xl font-bold leading-tight text-black md:text-[2.4rem]">
            {t("title")}
          </h1>

          <p className="mb-8 text-base leading-relaxed text-black/80 md:text-lg">
            {t("subtitle")}
            <span className="text-maroon">it</span>.
          </p>

          <div className="mb-8 flex flex-wrap gap-4">
            <a
              href="#rejestracja"
              className="rounded-full bg-maroon px-7 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 md:text-sm"
            >
              {t("cta_register")}
            </a>
            <a
              href="#agenda"
              className="rounded-full border-2 border-maroon px-7 py-3.5 text-xs font-bold uppercase tracking-wide text-maroon transition-opacity hover:opacity-80 md:text-sm"
            >
              {t("cta_agenda")}
            </a>
          </div>

          <div className="flex w-fit divide-x divide-maroon/30 rounded-2xl border border-maroon/40 bg-white/70 px-6 py-4 backdrop-blur-sm">
            <InfoBadge
              label={t("label_date")}
              value="27.11.2026"
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                  <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Zm12 8H5v10h14V10Z" />
                </svg>
              }
            />
            <InfoBadge
              label={t("label_place")}
              value="Hotel Moderno, Poznań"
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                  <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBadge({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 first:pl-0 last:pr-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-maroon">
        {icon}
      </span>
      <div>
        <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wide text-maroon/80">
          {label}
        </p>
        <p className="text-sm font-bold text-black">{value}</p>
      </div>
    </div>
  );
}
