import { render, screen } from "@testing-library/react";
import { HomePage } from "../HomePage";
import { MemoryRouter } from "react-router";

describe("HomePage", () => {
  jest.spyOn(global, "TextEncoder"); // Mock TextEncoder

  it("should render inputs and buttons", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/RoomId/i)).toBeInTheDocument();
    expect(screen.getByText(/Join Room/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Room/i)).toBeInTheDocument();
  });
});
