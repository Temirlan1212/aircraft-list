export type AircraftId = string;

export interface Aircraft {
  id: AircraftId;
  registrationNumber: string;
  model: string;
  year: number;
  status: string;
}

export interface AddAircraft
  extends Pick<Aircraft, "registrationNumber" | "model" | "year" | "status"> {}

export interface PatchAircraft
  extends Partial<Omit<Aircraft, "id">>,
    Pick<Aircraft, "id"> {}
