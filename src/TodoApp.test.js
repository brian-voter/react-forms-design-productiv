import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoApp from "./TodoApp.js";
import { initialTodos } from "./_testCommon.js";

describe("TodoApp Component", function () {
  test("smoke test - renders without crashing", function () {
    render(<TodoApp initialTodos={initialTodos} />);
  });

  test("snapshot test", function () {
    const { container } = render(<TodoApp initialTodos={initialTodos} />);

    expect(container).toMatchSnapshot();
  });

  test("contains expected form", function () {
    const result = render(<TodoApp />);
    expect(result.queryByText("Add Nü")).toBeInTheDocument();
  });

  test("mock adding new todo", function () {
    const { container, queryByText } = render(<TodoApp initialTodos={initialTodos} />);
    expect(queryByText("test Todo")).not.toBeInTheDocument();

    const titleInput = container.querySelector("#newTodo-title");
    const descInput = container.querySelector("#newTodo-description");
    const priorityInput = container.querySelector("#newTodo-priority");

    //Set values for form
    fireEvent.change(titleInput, { target: { value: "test Todo" } });
    fireEvent.change(descInput, { target: { value: "test description" } });
    fireEvent.change(priorityInput, { target: { value: 3 } });

    //click button/submit form
    fireEvent.click(container.querySelector("#submit-btn"));

    expect(queryByText("test Todo")).toBeInTheDocument();

  });
});
