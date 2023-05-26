import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import TopTodo from "./TopTodo";
import EditableTodoList from "./EditableTodoList";
import TodoForm from "./TodoForm";

const DEFAULT_TODOS = [
  {
    id: 1,
    title: "Code!",
    description: "Write some code",
    priority: 2,
  },
  {
    id: 2,
    title: "Make dinner",
    description: "Cook something healthy",
    priority: 1,
  },
  {
    id: 3,
    title: "Go to bed",
    description: "In bed by 11:15",
    priority: 3,
  },
];

/** App for managing a todo list.
 *
 * Props:
 * - localStorageKey: key to load the todo list from in localStorage
 * - initialTodos: possible array of [ todo, ... ]
 *
 * State:
 * - todos: array of [ todo, ... ]
 *
 * App -> TodoApp -> { TodoForm, EditableTodoList }
 */

function TodoApp({ localStorageKey }) {
  const [todos, setTodos] = useState(loadTodos);

  function loadTodos() {
    const localTodos = JSON.parse(window.localStorage.getItem(localStorageKey));

    return localTodos ? localTodos : DEFAULT_TODOS;
  }

  /**
   * Updates state of todos and saves the list to localStorage using a
   * callback function accepting the current/old todo list.
   *
   * @param {*} updateFun function taking oldState as argument and returns
   * the new state to be saved
   */
  function setTodosAndSave(updateFun) {
    setTodos(oldTodos => {
      const newTodos = updateFun(oldTodos);

      window.localStorage.setItem(localStorageKey, JSON.stringify(newTodos));
      return newTodos;
    });
  }

  /** add a new todo to list */
  function create(newTodo) {
    setTodosAndSave(oldTodos => [...oldTodos, { ...newTodo, id: uuid() }]);
  }

  /** update a todo with updatedTodo */
  function update(updatedTodo) {
    setTodosAndSave(oldTodos => oldTodos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo));
  }

  /** delete a todo by id */
  function remove(id) {
    setTodosAndSave(oldTodos => oldTodos.filter(todo => todo.id !== id));
  }

  return (
    <main className="TodoApp">
      <div className="row">

        <div className="col-md-6">
          <EditableTodoList
            todos={todos}
            update={update}
            remove={remove}
          />
          {todos.length === 0 &&
            <span className="text-muted">You have no todos.</span>
          }
        </div>

        <div className="col-md-6">
          <section className="mb-4">
            <h3>Top Todo</h3>
            {todos.length > 0 ?
              <TopTodo todos={todos} /> :
              <span className="text-muted">No todos yet!</span>
            }
          </section>


          <section>
            <h3 className="mb-3">Add Nü</h3>
            <TodoForm
              handleSave={create}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

export default TodoApp;