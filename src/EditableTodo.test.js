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
      id: 1,
      title: "new title",
      description: "new description",
      priority: "1"
    };
  });

  test("Check that update arguments are the form values", function () {
    const updateMock = jest.fn();

    const { container, queryByText } = render(
      <EditableTodo todo={initialTodos[0]} update={updateMock} remove={remove} />
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

    expect(updateMock.mock.lastCall[0]).toEqual(editTodo);
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
    let removedTodoId = null;

    const remove = (todoId) => {
      removedTodoId = todoId;
    };

    const { container, queryByText } = render(
      <EditableTodo todo={initialTodos[0]} update={update} remove={remove} />
    );

    expect(queryByText(initialTodos[0].title)).toBeInTheDocument();

    fireEvent.click(container.querySelector("#delete-btn"));

    expect(removedTodoId).toEqual(initialTodos[0].id);
  });

});