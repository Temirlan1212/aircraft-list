export type StatusId = string;

export interface Status {
  id: StatusId;
  value: string;
  label: string;
  color: string;
}

export interface AddStatus extends Omit<Status, "id"> {}

export interface PatchStatus
  extends Partial<Omit<Status, "id">>,
    Pick<Status, "id"> {}
