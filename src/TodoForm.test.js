import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm.js";
import { initialTodos } from "./_testCommon.js";

describe("TodoForm Component smoke and snapshot", function () {
  test("smoke test - renders without crashing", function () {
    render(<TodoForm todos={initialTodos} />);
  });

  test("snapshot test", function () {
    const { container } = render(
      <TodoForm
        todos={initialTodos} />);
    expect(container).toMatchSnapshot();
  });
});

describe("TodoForm shows correct todo", function () {
  let DEFAULT_FORM, EDIT_FORM;
  beforeEach(function () {
    DEFAULT_FORM = { title: "", description: "", priority: 1 };
    EDIT_FORM = { title: "newTitle", description: "", priority: 1 };
  });

  test("displays blank form", function () {
    const { queryByText } = render(<TodoForm initialFormData={DEFAULT_FORM} />);

    expect(queryByText("Ultra-Über")).toBeInTheDocument();
    expect(queryByText(initialTodos[0].title)).not.toBeInTheDocument();
  });

  test("displays pre-filled form", function () {
    const { container, queryByText } = render(<TodoForm initialFormData={EDIT_FORM} />);

    const title = container.querySelector("#newTodo-title").value
    expect(queryByText("Ultra-Über")).toBeInTheDocument();
    expect(title).toEqual(EDIT_FORM.title);
  });
});