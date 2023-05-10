import { format } from "date-fns";
import { pt, enUS } from "date-fns/locale";

const locale = {
  pt,
  en: enUS,
};

export const dateFormat = (
  date: Date | number,
  stringFormat: string,
  lang: "pt" | "en" = "en"
) => {
  return format(date, stringFormat, {
    locale: locale[lang],
  });
};
