"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function SpecialGuest() {
  const t = useTranslations("guest");
  const headline = t("headline") || "";
  const [h1, h2] = headline.split("\n");

  return (
    <section className="mx-auto w-full px-6 py-10 md:px-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm md:p-8">
        <div className="absolute inset-0">
          <Image src="/images/tlo.png" alt="" fill className="object-cover" priority />
        </div>

        {/* ===================== MOBILE: karta-plakat prelegenta ===================== */}
        <div className="relative z-10 md:hidden">
          <div className="relative h-[420px] w-full">
            <Image
              src="/images/MateuszKusznierewicz.png"
              alt={t("name")}
              fill
              sizes="100vw"
              className="object-cover object-top"
              quality={100}
              priority
            />
            {/* gradient żeby tekst na dole zdjęcia był czytelny */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* plakietka "mistrz olimpijski" - nawiązuje do medalu, to jego unikalna cecha */}
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-maroon px-3 py-1.5 shadow-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <circle cx="12" cy="12" r="8" fill="white" />
                <path d="M12 4 L12 12 L17 15" stroke="#7A1F2B" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[11px] font-extrabold uppercase tracking-wide text-white">
                {t("label")}
              </span>
            </div>

            {/* imię i rola wtopione w zdjęcie, jak na plakacie eventowym */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-2xl font-bold leading-tight text-white drop-shadow-sm">
                {t("name")}
              </p>
              <p className="mt-1 text-sm font-medium text-white/90">{t("role")}</p>
            </div>
          </div>

          {/* treść pod zdjęciem */}
          <div className="px-5 py-6">
            <div className="flex gap-3">
              <div className="mt-1 h-auto w-1 shrink-0 rounded-full bg-maroon" />
              <div>
                {h1 && <p className="text-xl font-bold leading-tight text-black">{h1}</p>}
                {h2 && <p className="mt-1 text-xl font-bold leading-tight text-black">{h2}</p>}
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">{t("description")}</p>
          </div>
        </div>

        {/* ===================== DESKTOP: układ jak w oryginale ===================== */}
        <div className="relative z-10 hidden justify-center md:flex">
          <div className="flex w-full max-w-6xl items-center gap-8 md:gap-12">
            <div className="flex md:w-1/3 md:justify-center">
              <div className="relative h-72 w-56 overflow-hidden rounded-xl shadow-lg md:h-80 md:w-64">
                <Image
                  src="/images/MateuszKusznierewicz.png"
                  alt={t("name")}
                  fill
                  sizes="256px"
                  className="object-cover object-top"
                  quality={100}
                  priority
                />
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex flex-col items-start">
                <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-maroon">
                  {t("label")}
                </p>
                <p className="mb-1 text-lg font-semibold text-black">{t("name")}</p>
                <p className="mb-3 text-sm font-medium text-maroon">{t("role")}</p>

                <div className="mb-3 w-full">
                  {h1 && <p className="text-2xl font-bold leading-tight text-black">{h1}</p>}
                  {h2 && <p className="mt-1 text-2xl font-bold leading-tight text-black">{h2}</p>}
                </div>

                <p className="max-w-3xl text-sm text-neutral-700">{t("description")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
