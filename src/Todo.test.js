import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "./Todo";
import { initialTodos } from "./_testCommon";

describe("Todo Component", function () {
  test("smoke test - renders without crashing", function () {
    render(<Todo todo={initialTodos[0]} />);
  });

  test("snapshot test", function () {
    const { container } = render(<Todo todo={initialTodos[0]} />);
    expect(container).toMatchSnapshot();
  });

  test("displays correct information", function () {
    const { container, queryByText } = render(<Todo todo={initialTodos[0]} />);
    expect(queryByText(initialTodos[0].title)).toBeInTheDocument();
  });
})