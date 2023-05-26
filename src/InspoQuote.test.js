import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import InspoQuote from "./InspoQuote";

describe("Inspo Quote Component", function () {
  test("renders without crashing", function () {
    render(<InspoQuote />);
  });

  test("snapshot test", function () {
    const { container } = render(
      <InspoQuote />);
    expect(container).toMatchSnapshot();
  });

  test("rendered quotes app", function () {
    const result = render(<InspoQuote />);
    expect(result.queryByText("Click here for an inspirational quøte!")).toBeInTheDocument();
  });
});

describe("able to display quotes", function () {
  test("first quote pops up", async function () {
    const { container, queryByText } = render(<InspoQuote />);
    expect(queryByText("Click here for an inspirational quøte!")).toBeInTheDocument();

    const quoteBtn = container.querySelector("#quote-btn");
    fireEvent.click(quoteBtn);

    //must wait for the button click to finish api request
    await waitFor(() => {
      expect(queryByText('Nü quøte')).toBeInTheDocument();
    });
  });
});