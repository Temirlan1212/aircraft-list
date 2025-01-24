type ID = string;

export interface SlugsProps {
  aircraftId: ID;
}

export const paths = {
  home: "/",
  statuses: "/statuses",
  aircrafts: "/aircrafts",
  aircraft: ({ aircraftId }: Pick<SlugsProps, "aircraftId">) =>
    `/aircrafts/${aircraftId}`,
};

export const routes = {
  home: { label: "Aircraft list", path: paths.home },
  statuses: { label: "Status list", path: paths.statuses },
};
