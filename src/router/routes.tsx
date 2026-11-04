import { Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import ProductsPage from "../pages/ProductsPage";
import TodosPage from "../pages/TodosPage";
import TodoDetailsPage from "../pages/TodoDetailsPage";

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/todos" replace />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="todos/:id" element={<TodoDetailsPage />} />
        <Route path="*" element={<Navigate to="/todos" replace />} />
      </Route>
    </Routes>
  );
}
