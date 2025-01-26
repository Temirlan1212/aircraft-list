import { baseApi } from "../../shared/api";
import { Aircraft, AircraftId, AddAircraft, PatchAircraft } from "./model";

export const aircraftApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getAircrafts: create.query<Aircraft[], void>({
      query: () => "/aircrafts",
      providesTags: ["Aircrafts", { type: "Aircrafts", id: "LIST" }],
    }),
    getAircraft: create.query<Aircraft, AircraftId>({
      query: (id) => `/aircrafts/${id}`,
      providesTags: ["Aircrafts"],
    }),
    getAircraftByQueryParams: create.query<Aircraft[], string>({
      query: (queryParams) => `/aircrafts?${queryParams}`,
      providesTags: ["Aircrafts"],
    }),
    deleteAircraft: create.mutation<void, AircraftId>({
      query: (id) => ({ method: "DELETE", url: `/aircrafts/${id}` }),
      invalidatesTags: ["Aircrafts"],
    }),
    addAircraft: create.mutation<void, AddAircraft>({
      query: (payload) => ({
        method: "POST",
        url: `/aircrafts`,
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Aircrafts"],
    }),
    patchAircraft: create.mutation<void, PatchAircraft>({
      query: ({ id, ...payload }) => ({
        method: "PATCH",
        url: `/aircrafts/${id}`,
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Aircrafts"],
    }),
  }),
  overrideExisting: true,
});
