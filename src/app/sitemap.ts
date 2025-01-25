import { baseUrl } from "@/shared/api";
import { MetadataRoute } from "next";
import { promises as fs } from "fs";
import { Aircraft } from "@/entities/aicraft";
import { paths } from "@/shared/constants/routes";

const getAircrafts = async () => {
  const file = await fs.readFile(process.cwd() + "/db.json", "utf8");
  const data: { aircrafts: Aircraft[] } = JSON.parse(file);
  return data.aircrafts || [];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const aircrafts = await getAircrafts();

  return aircrafts.map((aircraft) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${paths.aircraft({
      aircraftId: aircraft.id,
    })}`,
  }));
}
