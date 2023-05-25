import React, { useState } from "react";


/** Form for adding.
 *
 * Props:
 * - initialFormData
 * - handleSave: function to call in parent.
 *
 * { TodoApp, EditableTodo } -> TodoForm
 */

function TodoForm() {

  /** Update form input. */
  function handleChange(evt) { }

  /** Call parent function and clear form. */
  function handleSubmit(evt) { }

  return (
      <form className="NewTodoForm" onSubmit={handleSubmit}>

        <div className="mb-3">
          <input
              id="newTodo-title"
              name="title"
              className="form-control"
              placeholder="Title"
              onChange={handleChange}
              value="FIXME"
              aria-label="Title"
          />
        </div>

        <div className="mb-3">
          <textarea
              id="newTodo-description"
              name="description"
              className="form-control"
              placeholder="Description"
              onChange={handleChange}
              value="FIXME"
              aria-label="Description"
          />
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <div className="w-75 d-flex justify-content-between">
            <label htmlFor="newTodo-priority"
                   className="d-inline-flex">Priority:&nbsp;&nbsp;
            </label>
            <select id="newTodo-priority"
                    name="priority"
                    value="FIXME"
                    onChange={handleChange}
                    className="form-control form-control-sm d-inline-flex"
            >
              <option value={1}>Ultra-Über</option>
              <option value={2}>Über</option>
              <option value={3}>Meh</option>
            </select>
          </div>
          <button className="btn-primary rig btn btn-sm NewTodoForm-addBtn">
            Gø!
          </button>
        </div>

      </form>
  );
}

export default TodoForm;
