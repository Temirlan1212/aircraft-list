import { render, fireEvent } from "@testing-library/react";
import { BackButton } from "./back-button";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BackButton", () => {
  it("should call router.back() when clicked", () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

    const { getByText } = render(<BackButton />);

    fireEvent.click(getByText("Back"));

    expect(mockBack).toHaveBeenCalled();
  });
});
