"use client";

import { useGetSlugs } from "@/shared/hooks/use-get-slugs";
import { AircraftDetails } from "./aircraft-details";
import { aircraftApi } from "@/entities/aicraft";
import { statusApi } from "@/entities/status";

export function AircraftPage() {
  const { aircraftId } = useGetSlugs();
  const aircraftGetQuery = aircraftApi.useGetAircraftQuery(aircraftId);
  const statusGetQuery = statusApi.useGetStatusQuery(
    aircraftGetQuery.data?.status || ""
  );

  if (aircraftGetQuery.isLoading || statusGetQuery.isLoading)
    return <>loading...</>;
  if (aircraftGetQuery.data == null) return null;

  return (
    <>
      <AircraftDetails
        aircraft={{
          ...aircraftGetQuery.data,
          ...(statusGetQuery.data || {}),
        }}
      />
    </>
  );
}
