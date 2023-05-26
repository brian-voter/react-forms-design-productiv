import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditableTodo from "./EditableTodo.js";
import { initialTodos } from "./_testCommon.js";
const update = jest.fn();
const remove = jest.fn();

describe("EditableTodo Component smoke and snapshot", function () {
  test("smoke test - renders without crashing", function () {
    render(<EditableTodo todo={initialTodos[0]} update={update} remove={remove} />);
  });

  test("snapshot test", function () {
    const { container } = render(<EditableTodo todo={initialTodos[0]} update={update} remove={remove} />);
    expect(container).toMatchSnapshot();
  });
});

describe("EditableTodo Component functions", function () {
  let editTodo;
  beforeEach(function () {
    editTodo = {
      title: "new title",
      description: "new description",
      priority: 1
    };
  });

  test("Check that update arguments are the form values", function () {
    const update = (todo) => {
      expect(todo.title).toEqual(editTodo.title);
    };

    const { container, queryByText } = render(
      <EditableTodo todo={initialTodos[0]} update={update} remove={remove} />
    );

    expect(queryByText("new title")).not.toBeInTheDocument();
    expect(queryByText(initialTodos[0].title)).toBeInTheDocument();

    fireEvent.click(container.querySelector("#edit-btn"));

    const titleInput = container.querySelector("#newTodo-title");
    const descInput = container.querySelector("#newTodo-description");
    const priorityInput = container.querySelector("#newTodo-priority");

    //Set values for form
    fireEvent.change(titleInput, { target: { value: editTodo.title } });
    fireEvent.change(descInput, { target: { value: editTodo.description } });
    fireEvent.change(priorityInput, { target: { value: editTodo.priority } });

    fireEvent.click(container.querySelector("#submit-btn"));

  });

  test("Check that initial form fields contain existing todo values", function () {
    const { container, queryByText } = render(
      <EditableTodo todo={initialTodos[0]} update={update} remove={remove} />
    );

    expect(queryByText("new title")).not.toBeInTheDocument();
    expect(queryByText(initialTodos[0].title)).toBeInTheDocument();

    fireEvent.click(container.querySelector("#edit-btn"));

    const titleInput = container.querySelector("#newTodo-title");
    const descInput = container.querySelector("#newTodo-description");
    const priorityInput = container.querySelector("#newTodo-priority");

    expect(titleInput.value).toEqual(initialTodos[0].title);
    expect(descInput.value).toEqual(initialTodos[0].description);
    expect(priorityInput.value).toEqual(String(initialTodos[0].priority));

  });

  test("Delete todo", function () {
    const remove = (todoId) => {
      expect(todoId).toEqual(initialTodos[0].id);
    };

    const { container, queryByText } = render(
      <EditableTodo todo={initialTodos[0]} update={update} remove={remove} />
    );

    expect(queryByText(initialTodos[0].title)).toBeInTheDocument();

    fireEvent.click(container.querySelector("#delete-btn"));
  });

});