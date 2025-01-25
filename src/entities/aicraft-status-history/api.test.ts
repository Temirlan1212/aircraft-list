import { renderHook, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { StoreProvider } from "@/app/providers/store-provider";
import { aircraftStatusHistoryApi } from "./api";
import { baseUrl } from "@/shared/api";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("getAircraftStatusHistory", () => {
  const data = {
    id: "23a6",
    aicraftId: "02cd",
    comment: "new",
    newStatus: "retired",
    createdAt: "2025-01-24T20:16:19.821Z",
    updatedAt: "2025-01-24T20:16:19.821Z",
  };

  const statusHistoryId = data.id;

  it("renders hook with correct data", async () => {
    fetchMock.mockOnceIf(
      `${baseUrl}/aircrafts_status_history/${statusHistoryId}`,
      () =>
        Promise.resolve({
          status: 200,
          body: JSON.stringify(data),
        }),
    );

    const { result } = renderHook(
      () =>
        aircraftStatusHistoryApi.useGetAircraftStatusHistoryQuery(
          statusHistoryId,
        ),
      {
        wrapper: StoreProvider,
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject(data);
  });
});
