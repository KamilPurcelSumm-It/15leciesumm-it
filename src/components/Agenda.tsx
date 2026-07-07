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
    { time: "xx-xx", title: ["xxx", "xxx"], lines: ["xxx", "xxx", "xxx"] },
    { time: "xx-xx", title: ["xxx", "xxx"], lines: ["xxx", "xxx", "xxx"] },
    { time: "xx-xx", title: ["xxx", "xxx"], lines: ["xxx", "xxx", "xxx"] },
    { time: "xx-xx", title: ["xxx", "xxx"], lines: ["xxx", "xxx", "xxx"] },
  ];

  return (
    <section id="agenda" className="bg-white px-6 py-16 md:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-2 text-center text-lg font-bold uppercase tracking-wide text-black md:text-xl">
          {t("title")}
        </h2>
        <div className="mx-auto mb-10 h-0.5 w-10 bg-maroon" />

        <div className="relative mb-6 hidden md:block">
          <div className="absolute left-[10%] right-[10%] top-1/2 h-px -translate-y-1/2 bg-neutral-400" />
          <div className="relative grid grid-cols-5">
            {agendaItems.map((_, idx) => (
              <div key={idx} className="flex justify-center">
                <span className="h-3.5 w-3.5 rounded-full border-2 border-maroon bg-white" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
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
    </section>
  );
}
