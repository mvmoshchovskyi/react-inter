import { memo } from "react";
import { type TodoItemProps } from "../todolist/TodoList";
import "./TodoItem.css";

function TodoItem({ todo, handleStatus, handleDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label className="todo-item-content">
        <input
          type="checkbox"
          onChange={() => handleStatus(todo.id)}
          checked={todo.completed}
        />

        <span className="todo-item-title">{todo.title}</span>
      </label>

      <button
        type="button"
        className="todo-item-remove"
        onClick={() => handleDelete(todo.id)}
        aria-label={`Delete ${todo.title}`}
      >
        Remove
      </button>
    </li>
  );
}

export default memo(TodoItem);
