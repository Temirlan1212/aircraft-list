import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "http://localhost:8000";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Aircrafts", "Statuses", "AircraftStatusHistory"],
  endpoints: () => ({}),
});
