import { useParams } from "next/navigation";
import { SlugsProps } from "../constants/routes";

export function useGetSlugs() {
  const params = useParams<Partial<SlugsProps>>();

  return {
    aircraftId: params?.aircraftId || "",
  };
}
