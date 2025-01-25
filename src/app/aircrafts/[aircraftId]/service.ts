import { Aircraft } from "@/entities/aicraft";
import { promises as fs } from "fs";

export const getAircrafts = async () => {
  const file = await fs.readFile(process.cwd() + "/db.json", "utf8");
  const data: { aircrafts: Aircraft[] } = JSON.parse(file);
  return data.aircrafts || [];
};

export const getAircraft = async (id: string) => {
  const file = await fs.readFile(process.cwd() + "/db.json", "utf8");
  const data: { aircrafts: Aircraft[] } = JSON.parse(file);
  const aircrafts = data.aircrafts || [];
  return aircrafts.find((aircraft) => aircraft.id == id);
};
