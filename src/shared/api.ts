import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envs } from "./envs";

export const baseUrl = envs.baseApi;

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { "Content-Type": "application/json" },
  }),
  tagTypes: ["Aircrafts", "Statuses", "AircraftStatusHistory"],
  endpoints: () => ({}),
});
