import { renderHook } from "@testing-library/react";
import { useIsMounted } from "./use-is-mounted";

describe("useIsMounted", () => {
  it("should return true when component is mounted", () => {
    const { result } = renderHook(() => useIsMounted());

    expect(result.current).toBe(true);
  });
});
