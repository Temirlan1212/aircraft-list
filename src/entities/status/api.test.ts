import { renderHook, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { StoreProvider } from "@/app/providers/store-provider";
import { statusApi } from "./api";
import { baseUrl } from "@/shared/api";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("getStatusById", () => {
  const data = {
    id: "1",
    value: "activeddd",
    label: "Active",
    color: "green",
  };

  const statusId = data.id;

  it("renders hook with correct data", async () => {
    fetchMock.mockOnceIf(`${baseUrl}/statuses/${statusId}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify(data),
      })
    );

    const { result } = renderHook(
      () => statusApi.useGetStatusByIdQuery(statusId),
      {
        wrapper: StoreProvider,
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject(data);
  });
});
