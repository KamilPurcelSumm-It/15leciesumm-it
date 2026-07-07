import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import pl from "../../messages/pl.json";
import en from "../../messages/en.json";
import de from "../../messages/de.json";

const messages = { pl, en, de };

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
  };
});
