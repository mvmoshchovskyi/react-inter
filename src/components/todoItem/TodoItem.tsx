import { memo } from "react";
import { Link } from "react-router-dom";
import { type TodoItemProps } from "../todolist/TodoList";
import "./TodoItem.css";

function TodoItem({ todo, handleStatus, handleDelete, handleEdit }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label className="todo-item-content">
        <input
          type="checkbox"
          onChange={() => handleStatus(todo.id)}
          checked={todo.completed}
        />

        <Link className="todo-item-title" to={`/todos/${todo.id}`}>
          {todo.title}
        </Link>
      </label>

      <button
        type="button"
        className="todo-item-btn edite"
        onClick={() => handleEdit(todo.id)}
        aria-label={`Edit ${todo.title}`}
      >
        Edit
      </button>
      <button
        type="button"
        className="todo-item-btn remove"
        onClick={() => handleDelete(todo.id)}
        aria-label={`Delete ${todo.title}`}
      >
        Remove
      </button>
    </li>
  );
}

export default memo(TodoItem);
