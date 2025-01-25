import { Aircraft } from "@/entities/aicraft";
import { AircraftPage } from "@/screens/aircraft";
import { baseUrl } from "@/shared/api";
import { paths, SlugsProps } from "@/shared/constants/routes";

interface Props {
  params: SlugsProps;
}

const getAircrafts = async () => {
  const response = await fetch(`${baseUrl}/aircrafts`);
  const data: Aircraft[] | undefined = await response.json();
  return data || [];
};

const getAircraft = async (id: string) => {
  const response = await fetch(`${baseUrl}/aircrafts/${id}`);
  const data: Aircraft | undefined = await response.json();
  return data;
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
