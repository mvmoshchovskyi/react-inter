import { NavLink, Outlet } from "react-router-dom";
import TodosProvider from "./context/TodosProvider";
import "./App.css";

export default function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>My Workspace</h1>
        <p>Manage your products and daily tasks</p>

        <nav className="app-nav">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/todos">Todos</NavLink>
        </nav>
      </header>

      <TodosProvider>
        <Outlet />
      </TodosProvider>
    </main>
  );
}
