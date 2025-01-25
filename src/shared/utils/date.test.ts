import { dateUtils } from "./date";
import { format } from "date-fns";
import { enAU } from "date-fns/locale";

describe("ISODateUtils", () => {
  describe("generate", () => {
    it("should return a valid ISO string", () => {
      const isoDate = dateUtils.ISO.generate();

      expect(isoDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
    });
  });

  describe("formatForUI", () => {
    it("should format the ISO string correctly", () => {
      const isoDate = "2025-01-25T12:00:00.000Z";
      const formattedDate = dateUtils.ISO.formatForUI(isoDate);

      const expectedDate = format(new Date(isoDate), "dd MMMM yyyy, HH:mm", {
        locale: enAU,
      });

      expect(formattedDate).toBe(expectedDate);
    });
  });
});
