"use client";
import { dateUtils } from "@/shared/utils/date";
import styles from "./page.module.css";
import { aircraftStatusHistory } from "@/entities/aicraft-status-history/api";

export default function Home() {
  const { data: aircrafts } =
    aircraftStatusHistory.useGetAircraftsStatusHistoryQuery();
  const [addAircraft] =
    aircraftStatusHistory.useAddAircraftStatusHistoryMutation();
  const [patchAircraft] =
    aircraftStatusHistory.usePatchAircraftStatusHistoryMutation();

  return (
    <div className={styles.page}>
      {/* <button
        onClick={() => {
          addAircraft({
            value: "new status",
            label: "new status",
            color: "d",
          });
        }}
      >
        add
      </button> */}

      <button
        onClick={() => {
          patchAircraft({
            comment: "new",
            id: "1",
          });
        }}
      >
        patch
      </button>
      <div>
        {aircrafts?.map((item) => {
          return <div key={item.id}>{item.comment}</div>;
        })}
      </div>
    </div>
  );
}
