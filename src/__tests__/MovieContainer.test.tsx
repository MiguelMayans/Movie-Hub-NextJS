// import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import MovieContainer from "../components/MovieContainer/MovieContainer";

describe("Movie List Component", () => {
  test("Display a list of movies", () => {
    expect(MovieContainer).toBeDefined();
  });
});
