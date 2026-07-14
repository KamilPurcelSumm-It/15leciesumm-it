"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function SpecialGuest() {
  const t = useTranslations("guest");
  const headline = t("headline") || "";
  const [h1, h2] = headline.split("\n");

  return (
    <section className="mx-auto w-full px-6 py-10 md:px-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        {/* Tło */}
        <div className="absolute inset-0">
          <Image
            src="/images/tlo.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 flex justify-center">
          <div className="flex w-full max-w-6xl items-center gap-8 md:gap-12">
            <div className="hidden md:flex md:w-1/3 md:justify-center">
              <div className="relative h-72 w-56 overflow-hidden rounded-xl shadow-lg md:h-80 md:w-64">
                <Image
                  src="/images/MateuszKusznierewicz.png"
                  alt={t("name")}
                  fill
                  sizes="(min-width: 768px) 256px, 224px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex flex-col items-center md:items-start">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-maroon">
                  {t("label")}
                </p>
                <p className="mb-1 text-lg font-semibold text-black">{t("name")}</p>
                <p className="mb-3 text-sm font-medium text-maroon">{t("role")}</p>

                <div className="mb-3 w-full">
                  {h1 && <p className="text-2xl font-bold leading-tight text-black">{h1}</p>}
                  {h2 && (
                    <p className="mt-1 text-2xl font-bold leading-tight text-black">{h2}</p>
                  )}
                </div>

                <p className="max-w-3xl text-sm text-neutral-700">{t("description")}</p>
              </div>
            </div>

            {/* mobile: zdjęcie nad tekstem, wyśrodkowane */}
            <div className="mt-4 flex w-full justify-center md:hidden">
              <div className="relative h-56 w-44 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/MateuszKusznierewicz.png"
                  alt={t("name")}
                  fill
                  sizes="(min-width: 768px) 256px, 176px"
                  className="object-cover object-top"
                  quality={100}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
