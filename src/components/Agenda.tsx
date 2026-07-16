"use client";

import { useTranslations } from "next-intl";

export function Agenda() {
  const t = useTranslations("agenda");

  function getTranslation(key: string) {
    const value = t(key);
    return value === key || value === `agenda.${key}` ? undefined : value;
  }

  function dotEnd(text: string) {
    return /[.!?]$/.test(text.trim()) ? text : `${text}.`;
  }

  const agendaItems: Array<{ time: string; title: string[]; lines: string[]; highlighted?: boolean }> = [
    {
      time: "17:00 - 17:30",
      title: [t("item0_title")],
      lines: ["item0_line1", "item0_line2"].map(getTranslation).filter((v): v is string => Boolean(v)).map(dotEnd),
      highlighted: true,
    },
    {
      time: "17:30 - 18:00",
      title: [t("item1_title_1"), t("item1_title_2")],
      lines: ["item1_line1", "item1_line2", "item1_line3", "item1_line4"].map(getTranslation).filter((v): v is string => Boolean(v)).map(dotEnd),
    },
    {
      time: "18:00 - 18:40",
      title: [t("item2_title_1"), t("item2_title_2")],
      lines: [
        "item2_line1",
        "item2_line2",
        "item2_line3",
        "item2_line4",
        "item2_line5",
        "item2_line6",
      ]
        .map(getTranslation)
        .filter((v): v is string => Boolean(v))
        .map(dotEnd),
    },
    {
      time: "18:45 - 19:25",
      title: [t("item3_title_1"), t("item3_title_2")],
      lines: ["item3_line1", "item3_line2", "item3_line3", "item3_line4", "item3_line5"].map(getTranslation).filter((v): v is string => Boolean(v)).map(dotEnd),
    },
    {
      time: "19:30 - 20:00",
      title: [t("item4_title_1"), t("item4_title_2")],
      lines: ["item4_line1", "item4_line2", "item4_line3"].map(getTranslation).filter((v): v is string => Boolean(v)).map(dotEnd),
    },
    {
      time: "20:00 - 21:30",
      title: [t("item5_title_1"), t("item5_title_2")],
      lines: ["item5_line1", "item5_line2", "item5_line3"].map(getTranslation).filter((v): v is string => Boolean(v)).map(dotEnd),
    },
    {
      time: "21:30 - 22:00",
      title: [t("item6_title_1"), t("item6_title_2")],
      lines: ["item6_line1", "item6_line2", "item6_line3", "item6_line4"].map(getTranslation).filter((v): v is string => Boolean(v)).map(dotEnd),
    },
    {
      time: "22:00 - 23:00",
      title: [t("item7_title_1")],
      lines: ["item7_line1", "item7_line2"].map(getTranslation).filter((v): v is string => Boolean(v)).map(dotEnd),
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
          <div className="mx-auto min-w-[1680px] max-w-full">
            <div className="relative mb-6 hidden xl:block">
              <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-neutral-400" />
              <div className="relative grid grid-cols-8 gap-8">
                {agendaItems.map((_, idx) => (
                  <div key={idx} className="flex justify-center">
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-maroon bg-white" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-8 gap-8">
              {agendaItems.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full rounded-2xl border border-neutral-200 px-6 py-8 text-center shadow-sm"
                >
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-maroon">
                    {item.time}
                  </p>
                  {item.title.map((line, i) => (
                    <p
                      key={i}
                      className="text-sm font-bold uppercase tracking-wide text-black text-center"
                    >
                      {line}
                    </p>
                  ))}
                  <div className="mt-3 flex flex-col items-center gap-0.5">
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-xs leading-relaxed text-neutral-600 text-center">
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
