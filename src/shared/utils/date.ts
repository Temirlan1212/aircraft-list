import { format } from "date-fns";
import { enAU } from "date-fns/locale";

const ISODateUtils = {
  generate: (): string => new Date(2025, 0).toISOString(),
  formatForUI: (isoDate: string): string =>
    format(new Date(isoDate), "dd MMMM yyyy", { locale: enAU }),
};

export const dateUtils = {
  ISO: ISODateUtils,
};
