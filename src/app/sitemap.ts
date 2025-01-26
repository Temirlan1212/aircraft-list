import { MetadataRoute } from "next";
import { promises as fs } from "fs";
import { Aircraft } from "@/entities/aicraft";
import { paths } from "@/shared/constants/routes";
import { envs } from "@/shared/envs";

const getAircrafts = async () => {
  const file = await fs.readFile(process.cwd() + "/db.json", "utf8");
  const data: { aircrafts: Aircraft[] } = JSON.parse(file);
  return data.aircrafts || [];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const aircrafts = await getAircrafts();

  return aircrafts.map((aircraft) => ({
    url: `${envs.baseApp}${paths.aircraft({
      aircraftId: aircraft.id,
    })}`,
  }));
}
