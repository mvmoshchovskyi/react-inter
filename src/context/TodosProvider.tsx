import type { ReactNode } from "react";
import useTodos from "../hooks/useTodos";
import { TodosContext } from "./todosContext";

export default function TodosProvider({ children }: { children: ReactNode }) {
  const todosValue = useTodos();

  return (
    <TodosContext.Provider value={todosValue}>{children}</TodosContext.Provider>
  );
}
