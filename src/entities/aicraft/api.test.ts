import { renderHook, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { StoreProvider } from "@/app/providers/store-provider";
import { aircraftApi } from "./api";
import { baseUrl } from "@/shared/api";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("useGetAircraftsQuery", () => {
  const endpointName = "getAircrafts";
  const data = {};

  beforeEach(() => {
    fetchMock.mockOnceIf(`${baseUrl}/aircrafts`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });

  it("renders hook", async () => {
    const { result } = renderHook(() => aircraftApi.useGetAircraftsQuery(), {
      wrapper: StoreProvider,
    });

    expect(result.current).toMatchObject({
      status: "pending",
      endpointName,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toBeCalledTimes(1);

    expect(result.current).toMatchObject({
      status: "fulfilled",
      endpointName,
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });
});

describe("useGetAircraftQuery", () => {
  const endpointName = "getAircraft";
  const aircraftId = "02cd";
  const data = {};

  beforeEach(() => {
    fetchMock.mockOnceIf(`${baseUrl}/aircraft/${aircraftId}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });

  it("renders hook", async () => {
    const { result } = renderHook(
      () => aircraftApi.useGetAircraftQuery(aircraftId),
      {
        wrapper: StoreProvider,
      }
    );

    expect(result.current).toMatchObject({
      status: "pending",
      endpointName,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toBeCalledTimes(1);

    expect(result.current).toMatchObject({
      status: "fulfilled",
      endpointName,
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });
});

describe("getAircraftByQueryParams", () => {
  const endpointName = "getAircraftByQueryParams";
  const aircraftModel = "Boeing 737";
  const data = [
    {
      id: "02cd",
      registrationNumber: "N123AA",
      model: "Boeing 737",
      year: "2018",
      status: "maintenance",
    },
  ];

  beforeEach(() => {
    fetchMock.mockOnceIf(`${baseUrl}/aircrafts?model=${aircraftModel}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify(data), // Sending raw object
      })
    );
  });

  it("renders hook", async () => {
    const { result } = renderHook(
      () =>
        aircraftApi.useGetAircraftByQueryParamsQuery(`model=${aircraftModel}`),
      {
        wrapper: StoreProvider,
      }
    );

    expect(result.current).toMatchObject({
      status: "pending",
      endpointName,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toBeCalledTimes(1);

    expect(result.current).toMatchObject({
      status: "fulfilled",
      endpointName,
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });
});
