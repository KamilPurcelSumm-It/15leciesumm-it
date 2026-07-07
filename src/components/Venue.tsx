"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function Venue() {
  const t = useTranslations("venue");

  return (
    <section id="miejsce" className="bg-white px-6 py-16 md:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 rounded-3xl border border-neutral-200 p-6 shadow-sm md:grid-cols-[0.8fr_1fr_0.9fr] md:items-center md:p-10">
        <div>
          <h3 className="mb-2 text-base font-bold uppercase tracking-wide text-black">
            {t("section_title")}
          </h3>
          <div className="mb-5 h-0.5 w-8 bg-maroon" />

          <p className="mb-1 text-sm font-bold text-black">
            Hotel Moderno, Poznań
          </p>
          <p className="mb-6 text-sm leading-relaxed text-neutral-600">
            ul. Kolejowa 29
            <br />
            61-717 Poznań
          </p>

          <a
            href="https://maps.google.com/?q=Hotel+Moderno,+ul.+Kolejowa+29,+61-717+Poznań"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-maroon px-6 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            {t("map_button")}
          </a>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-sm">
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <Image
              src="/images/venue.jpg"
              alt="Hotel Moderno, Poznań"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <FeaturePoint
            title={t("feature1_title")}
            description={t("feature1_desc")}
            icon={
              <Image
                src="/images/icon-pin-outline.png"
                alt=""
                width={40}
                height={40}
                className="h-8 w-8 object-contain"
              />
            }
          />
          <FeaturePoint
            title={t("feature2_title")}
            description={t("feature2_desc")}
            icon={
              <Image
                src="/images/icon-celebration.png"
                alt=""
                width={40}
                height={40}
                className="h-8 w-8 object-contain"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}

function FeaturePoint({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center">
        {icon}
      </span>
      <div>
        <p className="mb-1 text-sm font-bold text-black">{title}</p>
        <p className="text-xs leading-relaxed text-neutral-600">{description}</p>
      </div>
    </div>
  );
}
