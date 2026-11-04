import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TodoModal from "../components/todoModal/TodoModal";
import { useTodosContext } from "../context/todosContext";
import type { TodoFormData } from "../types/todo";
import "./TodoDetailsPage.css";

export default function TodoDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos, updateTodo, toggleTodo, deleteTodo } = useTodosContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const todoId = Number(id);
  const todo = todos.find((item) => item.id === todoId);

  const handleSave = (formData: TodoFormData) => {
    if (!todo) return;

    updateTodo(todo.id, formData);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!todo) return;

    deleteTodo(todo.id);
    navigate("/todos");
  };

  if (!todo) {
    return (
      <section className="app-section todo-details">
        <h2>Todo not found</h2>
        <p>This task may have been deleted.</p>
        <Link className="todo-details-back" to="/todos">
          Back to todos
        </Link>
      </section>
    );
  }

  return (
    <section className="app-section todo-details">
      <Link className="todo-details-back" to="/todos">
        ← Back to todos
      </Link>

      <header className="todo-details-header">
        <h2>{todo.title}</h2>
        <span
          className={`todo-details-status ${todo.completed ? "completed" : ""}`}
        >
          {todo.completed ? "Completed" : "Active"}
        </span>
      </header>

      <p className="todo-details-description">
        {todo.description || "No description provided."}
      </p>

      <div className="todo-details-actions">
        <button type="button" onClick={() => toggleTodo(todo.id)}>
          {todo.completed ? "Mark as active" : "Mark as completed"}
        </button>
        <button type="button" onClick={() => setIsModalOpen(true)}>
          Edit
        </button>
        <button
          type="button"
          className="todo-details-delete"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      <TodoModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        handleSave={handleSave}
        todoToEdit={todo}
      />
    </section>
  );
}
