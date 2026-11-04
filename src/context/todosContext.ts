import { createContext, useContext } from "react";
import type { Todo, TodoFormData } from "../types/todo";

export type TodosContextValue = {
  todos: Todo[];
  addTodo: (data: TodoFormData) => void;
  updateTodo: (id: number, data: TodoFormData) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export const TodosContext = createContext<TodosContextValue | null>(null);

export function useTodosContext() {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("useTodosContext must be used within a TodosProvider");
  }

  return context;
}
