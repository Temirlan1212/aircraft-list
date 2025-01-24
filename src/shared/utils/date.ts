import { format } from "date-fns";
import { enAU } from "date-fns/locale";

const ISODateUtils = {
  generate: (): string => new Date().toISOString(),
  formatForUI: (isoDate: string): string =>
    format(new Date(isoDate), "dd MMMM yyyy, HH:mm", { locale: enAU }),
};

export const dateUtils = {
  ISO: ISODateUtils,
};
