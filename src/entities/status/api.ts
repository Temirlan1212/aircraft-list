import { baseApi } from "../../shared/api";
import { Status, StatusId, AddStatus, PatchStatus } from "./model";

export const statusApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getStatuses: create.query<Status[], void>({
      query: () => "/statuses",
      providesTags: ["Statuses", { type: "Statuses", id: "LIST" }],
    }),
    getStatus: create.query<Status, StatusId>({
      query: (id) => `/statuses?value=${id}`,
      providesTags: ["Statuses"],
      transformResponse: (res: Status[]) => res?.[0],
    }),
    deleteStatus: create.mutation<void, StatusId>({
      query: (id) => ({ method: "DELETE", url: `/statuses/${id}` }),
    }),
    addStatus: create.mutation<void, AddStatus>({
      query: (payload) => ({
        method: "POST",
        url: `/statuses`,
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Statuses"],
    }),
    patchStatus: create.mutation<void, PatchStatus>({
      query: ({ id, ...payload }) => ({
        method: "PATCH",
        url: `/statuses/${id}`,
        body: JSON.stringify(payload),
      }),
      invalidatesTags: ["Statuses"],
    }),
  }),
  overrideExisting: true,
});
