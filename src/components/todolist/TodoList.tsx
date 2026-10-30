import { useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import TodoItem from "../todoItem/TodoItem";
import "./TodoList.css";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoItemProps = {
  todo: Todo;
  handleStatus: (id: number) => void;
  handleDelete: (id: number) => void;
};

const filterTypes = ["all", "active", "completed"] as const;
type Filter = (typeof filterTypes)[number];

type TodoListProps = {
  todos: Todo[];
  handleStatus: (id: number) => void;
  handleDelete: (id: number) => void;
};

function TodoList({ todos, handleStatus, handleDelete }: TodoListProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedFilter, setSelectedFilter] = useState<Filter>("all");

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        const matchesSearch = todo.title
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase().trim());

        const matchesFilter =
          selectedFilter === "all" ||
          (selectedFilter === "active" && !todo.completed) ||
          (selectedFilter === "completed" && todo.completed);

        return matchesSearch && matchesFilter;
      }),
    [todos, selectedFilter, debouncedSearch],
  );

  const counter = todos.reduce(
    (acc, todo) => {
      acc.total++;

      if (todo.completed) {
        acc.completed++;
      } else {
        acc.active++;
      }
      return acc;
    },
    {
      total: 0,
      active: 0,
      completed: 0,
    },
  );
  return (
    <div className="todo-container">
      <h1>My Todo List</h1>

      <div className="todo-controls">
        <input
          className="todo-input"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="todo-filter">
          Filter:
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as Filter)}
          >
            {filterTypes.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ol className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">No todos found</p>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleStatus={handleStatus}
              handleDelete={handleDelete}
            />
          ))
        )}
      </ol>

      <div className="todo-counter">
        <div>
          <span>Total</span>
          <strong>{counter.total}</strong>
        </div>
        <div>
          <span>Active</span>
          <strong>{counter.active}</strong>
        </div>
        <div>
          <span>Completed</span>
          <strong>{counter.completed}</strong>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
