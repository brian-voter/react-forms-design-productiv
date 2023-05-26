import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TopTodo from "./TopTodo.js";
import { initialTodos } from "./_testCommon.js";

describe("TopTodo Component smoke and snapshot", function () {
  test("smoke test - renders without crashing", function () {
    render(<TopTodo todos={initialTodos} />);
  });

  test("snapshot test", function () {
    const { container } = render(
      <TopTodo
        todos={initialTodos} />);
    expect(container).toMatchSnapshot();
  });
});

describe("TopTodo shows correct todo", function () {
  test("displays highest priority todo", function () {
    const { queryByText } = render(<TopTodo todos={initialTodos} />);

    expect(queryByText("Make dinner")).toBeInTheDocument();
    expect(queryByText("Cook something healthy")).toBeInTheDocument();
  });
});