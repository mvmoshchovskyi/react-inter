import { useState } from "react";
import TodoList from "../components/todolist/TodoList";
import TodoModal from "../components/todoModal/TodoModal";
import { useTodosContext } from "../context/todosContext";
import type { Todo, TodoFormData } from "../types/todo";

export default function TodosPage() {
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo } =
    useTodosContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const openCreateModal = () => {
    setTodoToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: number) => {
    const target = todos.find((todo) => todo.id === id) ?? null;
    setTodoToEdit(target);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTodoToEdit(null);
  };

  const handleSave = (formData: TodoFormData) => {
    if (todoToEdit) {
      updateTodo(todoToEdit.id, formData);
    } else {
      addTodo(formData);
    }

    closeModal();
  };

  return (
    <section className="app-section todo-section">
      <div className="todo-toolbar">
        <h2>Tasks</h2>
        <button
          className="add-todo-button"
          type="button"
          onClick={openCreateModal}
        >
          + Add Todo
        </button>
      </div>

      <TodoList
        todos={todos}
        handleStatus={toggleTodo}
        handleDelete={deleteTodo}
        handleEdit={openEditModal}
      />

      <TodoModal
        onClose={closeModal}
        isOpen={isModalOpen}
        handleSave={handleSave}
        todoToEdit={todoToEdit}
      />
    </section>
  );
}
