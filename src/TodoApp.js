import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import TopTodo from "./TopTodo";
import EditableTodoList from "./EditableTodoList";
import TodoForm from "./TodoForm";

/** App for managing a todo list.
 *
 * Props:
 * - initialTodos: possible array of [ todo, ... ]
 *
 * State:
 * - todos: array of [ todo, ... ]
 *
 * App -> TodoApp -> { TodoForm, EditableTodoList }
 */

function TodoApp({ initialTodos = [] }) {
  const [todos, setTodos] = useState(initialTodos);

  /** add a new todo to list */
  function create(newTodo) {
    setTodos(oldTodos => ([...oldTodos, { ...newTodo, id: uuid() }]));
  }

  /** update a todo with updatedTodo */
  function update(updatedTodo) {
    setTodos(oldTodos =>
      oldTodos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ));
  }

  /** delete a todo by id */
  function remove(id) {
    setTodos(oldTodos => oldTodos.filter(todo => todo.id !== id));
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