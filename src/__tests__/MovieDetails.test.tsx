import { render, screen } from "@testing-library/react";
import MovieDetail from "../app/homepage/[id]/page";
import { UserContextProvider } from "../context/userContext";
import { test, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

test("displays movie details correctly", async () => {
  const mockMovie = {
    id: "1",
    name: "Test Movie",
    posterImage: "test_image.jpg",
    score: "8",
  };

  render(
    <UserContextProvider value={{ currentUser: { movies: mockMovie } }}>
      <MovieDetail params={{ id: "1" }} />
    </UserContextProvider>
  );

  expect(screen.findByText("Test Movie")).toBeDefined();
  expect(screen.findByText("8")).toBeDefined();
});
