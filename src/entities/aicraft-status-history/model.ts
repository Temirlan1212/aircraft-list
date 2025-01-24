export type AircraftStatusHistoryId = string;

export type AircraftStatusHistoryServerUtils = {
  id: AircraftStatusHistoryId;
  updatedAt: string;
  createdAt: string;
};

export interface AircraftStatusHistory
  extends AircraftStatusHistoryServerUtils {
  newStatus: string;
  comment: string;
  aicraftId: string;
}

export interface AddAircraftStatusHistory
  extends Omit<AircraftStatusHistory, keyof AircraftStatusHistoryServerUtils> {}

export interface PatchAircraftStatusHistory
  extends Partial<
      Omit<AircraftStatusHistory, keyof AircraftStatusHistoryServerUtils>
    >,
    Pick<AircraftStatusHistory, "id"> {}
