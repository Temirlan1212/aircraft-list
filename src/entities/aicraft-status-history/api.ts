import { dateUtils } from "@/shared/utils/date";
import { baseApi } from "../../shared/api";
import {
  AircraftStatusHistory,
  AircraftStatusHistoryId,
  AddAircraftStatusHistory,
  PatchAircraftStatusHistory,
} from "./model";

export const aircraftStatusHistoryApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getAircraftsStatusHistory: create.query<AircraftStatusHistory[], string>({
      query: (params) => `/aircrafts_status_history${params}`,
      providesTags: [
        "AircraftStatusHistory",
        { type: "AircraftStatusHistory", id: "LIST" },
      ],
    }),
    getAircraftStatusHistory: create.query<
      AircraftStatusHistory,
      AircraftStatusHistoryId
    >({
      query: (id) => `/aircrafts_status_history/${id}`,
      providesTags: ["AircraftStatusHistory"],
    }),
    deleteAircraftStatusHistory: create.mutation<void, AircraftStatusHistoryId>(
      {
        query: (id) => ({
          method: "DELETE",
          url: `/aircrafts_status_history/${id}`,
        }),
      }
    ),
    addAircraftStatusHistory: create.mutation<void, AddAircraftStatusHistory>({
      query: (payload) => ({
        method: "POST",
        url: `/aircrafts_status_history`,
        body: JSON.stringify({
          ...payload,
          createdAt: dateUtils.ISO.generate(),
          updatedAt: dateUtils.ISO.generate(),
        } as AircraftStatusHistory),
      }),
      invalidatesTags: ["AircraftStatusHistory"],
    }),
    patchAircraftStatusHistory: create.mutation<
      void,
      PatchAircraftStatusHistory
    >({
      query: ({ id, ...payload }) => ({
        method: "PATCH",
        url: `/aircrafts_status_history/${id}`,
        body: JSON.stringify({
          ...payload,
          updatedAt: dateUtils.ISO.generate(),
        } as AircraftStatusHistory),
      }),
      invalidatesTags: ["AircraftStatusHistory"],
    }),
  }),
  overrideExisting: true,
});
