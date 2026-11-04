import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import type { Todo, TodoFormData } from "../types/todo";

const initialTodos: Todo[] = [
  { id: 1, title: "Learn React", description: "good learn", completed: false },
  { id: 2, title: "Practice TypeScript", completed: true },
  { id: 3, title: "Prepare for interview", completed: false },
];

export default function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo>("todos", initialTodos);

  const addTodo = useCallback(
    (data: TodoFormData) => {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: data.title,
          description: data.description,
          completed: false,
        },
      ]);
    },
    [setTodos],
  );

  const updateTodo = useCallback(
    (id: number, data: TodoFormData) => {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...data } : todo)),
      );
    },
    [setTodos],
  );

  const toggleTodo = useCallback(
    (id: number) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    },
    [setTodos],
  );

  const deleteTodo = useCallback(
    (id: number) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    },
    [setTodos],
  );

  return { todos, addTodo, updateTodo, toggleTodo, deleteTodo };
}
