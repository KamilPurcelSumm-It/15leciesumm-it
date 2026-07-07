"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-black px-6 py-14 text-white md:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[1fr_1fr_1fr] md:items-start">
        <div>
          <div className="text-2xl font-bold tracking-tight">
            summ-<span className="text-maroon">it</span>
          </div>
          <div className="mt-1 h-0.5 w-16 bg-white/40" />
        </div>

        <div className="flex flex-col gap-2.5">
          <h4 className="mb-1 text-sm font-bold">{t("nav_title")}</h4>
          <a href="#agenda" className="text-sm text-white/90 hover:text-white">
            {t("nav_agenda")}
          </a>
          <a href="#rejestracja" className="text-sm text-white/90 hover:text-white">
            {t("nav_registration")}
          </a>
          <a href="#miejsce" className="text-sm text-white/90 hover:text-white">
            {t("nav_place")}
          </a>
          <a href="#kontakt" className="text-sm text-white/90 hover:text-white">
            {t("nav_contact")}
          </a>
        </div>

        <div id="kontakt" className="flex flex-col gap-2.5">
          <h4 className="mb-1 text-sm font-bold">{t("contact_title")}</h4>
          <p className="text-sm text-white/90">E-mail: info@summ-it.pl</p>
          <a
            href="tel:+48511373931"
            className="text-sm text-white/90 hover:text-white"
          >
            Telefon: +48 511 373 931
          </a>
          <p className="text-sm text-white/90">
            Adres: ul. Głogowska 31/33
            <br />
            60-702 Poznań
          </p>
        </div>
      </div>
    </footer>
  );
}
