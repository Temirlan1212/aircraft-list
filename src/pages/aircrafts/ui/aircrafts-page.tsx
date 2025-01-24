"use client";

import { AddAircraftModal } from "./add-aircraft-modal";
import { AircraftsTable } from "./aircrafts-table";

export function AircraftsPage() {
  return (
    <>
      <AddAircraftModal />
      <AircraftsTable />
    </>
  );
}
