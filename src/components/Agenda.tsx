"use client";

import { useTranslations } from "next-intl";

export function Agenda() {
  const t = useTranslations("agenda");

  const agendaItems = [
    {
      time: "17:00 - 17:30",
      title: t("item0_title"),
      lines: [t("item0_line1"), t("item0_line2")],
      highlighted: true,
    },
    {
      time: "17:30 - 18:00",
      title: ["OFICJALNE", "OTWARCIE"],
      lines: ["Powitanie gości,", "przedstawienie", "gospodarzy oraz", "wprowadzenie do", "jubileuszowego", "wieczoru"],
    },
    { 
      time: "18:00 - 18:40", 
      title: ["LIDERSTWO", "I ZAUFANIE"], 
      lines: ["Wystąpienie", "Wojciecha Wencla", "oraz debata", "o przywództwie,", "wartościach", "i rozwoju organizacji"] 
    },
    { 
      time: "18:45 - 19:15", 
      title: ["MATEUSZ", "KUSZNIEREWICZ"], 
      lines: ["Inspirujący wykład", "gościa specjalnego", "o konsekwencji,", "osiąganiu celów", "i budowaniu sukcesu"] 
    },
    { 
      time: "19:15 - 19:45", 
      title: ["Podsumowanie", "wieczoru"], 
      lines: ["Najważniejsze wnioski", "plany na przyszłość"] 
    },
    { 
      time: "19:45 - 20:15", 
      title: ["Kolacja", "Gala"], 
      lines: ["Uroczysty bankiet", "i toasty"] 
    },
    { 
      time: "20:15 - 20:45", 
      title: ["Przerwa", "kawowa"], 
      lines: ["Kawa i słodkości", "dyskusje przy stolikach"] 
    },
    { 
      time: "20:45 - 21:30", 
      title: ["Zamknięcie", "wieczoru"], 
      lines: ["Pożegnanie", "i możliwość kontaktu"] 
    },
  ];

  return (
    <section id="agenda" className="bg-white px-6 py-16 md:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-2 text-center text-lg font-bold uppercase tracking-wide text-black md:text-xl">
          {t("title")}
        </h2>
        <div className="mx-auto mb-10 h-0.5 w-10 bg-maroon" />

        <div className="overflow-x-auto pb-2">
          <div className="min-w-[1200px]">
            <div className="relative mb-6 hidden md:block">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-neutral-400" />
              <div className="relative grid grid-cols-8">
                {agendaItems.map((_, idx) => (
                  <div key={idx} className="flex justify-center">
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-maroon bg-white" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-8 gap-5">
              {agendaItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-200 px-5 py-6 text-center shadow-sm"
                >
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-maroon">
                    {item.time}
                  </p>
                  {Array.isArray(item.title) ? (
                    item.title.map((t, i) => (
                      <p
                        key={i}
                        className="text-sm font-bold uppercase tracking-wide text-black"
                      >
                        {t}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm font-bold uppercase tracking-wide text-black">
                      {item.title}
                    </p>
                  )}
                  <div className="mt-3 flex flex-col gap-0.5">
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-xs leading-relaxed text-neutral-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
