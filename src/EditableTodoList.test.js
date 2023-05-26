import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditableTodoList from "./EditableTodoList.js";
import { initialTodos } from "./_testCommon.js";
const update = jest.fn();
const remove = jest.fn();

describe("EditableTodoList Component smoke and snapshot", function () {
  test("smoke test - renders without crashing", function () {
    render(<EditableTodoList todos={initialTodos} />);
  });

  test("snapshot test", function () {
    const { container } = render(
      <EditableTodoList
        todos={initialTodos} />);
    expect(container).toMatchSnapshot();
  });
});

describe("EditableTodoList renders correct todos", function () {
  test("EditableTodoList renders correct todos", function () {
    const { container, queryByText } = render(<EditableTodoList todos={initialTodos} />);

    for (const { title, description } of initialTodos) {
      expect(queryByText(title)).toBeInTheDocument();
      expect(queryByText(description)).toBeInTheDocument();
    }
  });
});

describe("EditableTodoList buttons trigger parent handler functions correctly", function () {
  test("EditableTodoList calls remove correctly", function () {
    const remove = jest.fn();

    const { container, queryByText } = render(
      <EditableTodoList
        todos={initialTodos}
        remove={remove}
      />);

    const deleteBtns = container.querySelectorAll("#delete-btn");

    expect(deleteBtns.length).toEqual(initialTodos.length);

    for (let i = 0; i < deleteBtns.length; i++) {
      const { id } = initialTodos[i];
      fireEvent.click(deleteBtns[i]);

      // ensure remove was called with the id of this todo
      expect(remove.mock.lastCall[0]).toBe(id);
    }
  });

  test("EditableTodoList calls update correctly", function () {
    const remove = jest.fn();

    const { container, queryByText } = render(
      <EditableTodoList
        todos={initialTodos}
        remove={remove}
      />);

    const deleteBtns = container.querySelectorAll("#delete-btn");

    expect(deleteBtns.length).toEqual(initialTodos.length);

    for (let i = 0; i < deleteBtns.length; i++) {
      const { id } = initialTodos[i];
      fireEvent.click(deleteBtns[i]);

      // ensure remove was called with the id of this todo
      expect(remove.mock.lastCall[0]).toBe(id);
    }
  });
});