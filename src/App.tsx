import { useCallback, useEffect, useState } from "react";
import SortProducts from "./components/sortProducts/SortProducts";
import TodoList from "./components/todolist/TodoList";
import TodoModal from "./components/todoModal/TodoModal";
import "./App.css";

export type Todo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};
export type TodoFormData = {
  title: string;
  description?: string;
};

const initialTodos: Todo[] = [
  { id: 1, title: "Learn React", description: "good learn", completed: false },
  { id: 2, title: "Practice TypeScript", completed: true },
  { id: 3, title: "Prepare for interview", completed: false },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const addTodo = () => {
    setTodoToEdit(null);
    setIsModalOpen(true);
  };

  const handleSave = (formData: TodoFormData) => {
    if (todoToEdit) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === todoToEdit.id ? { ...todo, ...formData } : todo,
        ),
      );
    } else {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: formData.title,
          description: formData.description,
          completed: false,
        },
      ]);
    }
    setIsModalOpen(false);
    setTodoToEdit(null);
  };

  const handleStatus = useCallback((id: number) => {
    setTodos((prev) => {
      return prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      );
    });
  }, []);

  const handleDelete = useCallback((id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleEdit = useCallback(
    (id: number) => {
      const target = todos.find((todo) => todo.id === id) ?? null;
      setTodoToEdit(target);
      setIsModalOpen(true);
    },
    [todos],
  );

  return (
    <main className="app">
      <header className="app-header">
        <h1>My Workspace</h1>
        <p>Manage your products and daily tasks</p>
      </header>

      <section className="app-section">
        <SortProducts />
      </section>

      <section className="app-section todo-section">
        <div className="todo-toolbar">
          <h2>Tasks</h2>
          <button className="add-todo-button" type="button" onClick={addTodo}>
            + Add Todo
          </button>
        </div>

        <TodoList
          todos={todos}
          handleStatus={handleStatus}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </section>

      <TodoModal
        onClose={onClose}
        isOpen={isModalOpen}
        handleSave={handleSave}
        todoToEdit={todoToEdit}
      />
    </main>
  );
}

export default App;
