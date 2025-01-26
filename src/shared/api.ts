import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "http://localhost:8000";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { "Content-Type": "application/json" },
  }),
  tagTypes: ["Aircrafts", "Statuses", "AircraftStatusHistory"],
  endpoints: () => ({}),
});
