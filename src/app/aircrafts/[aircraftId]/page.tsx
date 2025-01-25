import { Aircraft } from "@/entities/aicraft";
import { AircraftPage } from "@/screens/aircraft";
import { paths, SlugsProps } from "@/shared/constants/routes";
import { promises as fs } from "fs";

interface Props {
  params: SlugsProps;
}

const getAircrafts = async () => {
  const file = await fs.readFile(process.cwd() + "/db.json", "utf8");
  const data: { aircrafts: Aircraft[] } = JSON.parse(file);
  return data.aircrafts || [];
};

const getAircraft = async (id: string) => {
  const file = await fs.readFile(process.cwd() + "/db.json", "utf8");
  const data: { aircrafts: Aircraft[] } = JSON.parse(file);
  const aircrafts = data.aircrafts || [];
  return aircrafts.find((aircraft) => aircraft.id == id);
};

export const generateMetadata = async ({ params }: Props) => {
  const aircraftId = String((params?.aircraftId as unknown as string) || "0");
  const aircraft = await getAircraft(aircraftId);

  return {
    title: `${aircraft?.model || ""} - model`,
    description: aircraft?.registrationNumber || "",
    openGraph: {
      title: aircraft?.model || "",
      description: aircraft?.registrationNumber || "",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${paths.aircraft({ aircraftId })}`,
      type: "article",
    },
    twitter: {
      title: aircraft?.model || "",
      description: aircraft?.registrationNumber || "",
    },
  };
};

export const generateStaticParams = async () => {
  const aircrafts = await getAircrafts();
  return aircrafts.map((aicraft) => ({
    aircrafId: aicraft.id.toString(),
  }));
};

export default function Page() {
  return <AircraftPage />;
}
