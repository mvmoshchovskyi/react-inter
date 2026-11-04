import { type ChangeEvent, useState, useEffect } from "react";
import type { Todo, TodoFormData } from "../../types/todo";
import "./TodoModal.css";

type ModalType = {
  isOpen: boolean;
  onClose: () => void;
  handleSave: (data: TodoFormData) => void;
  todoToEdit?: Todo | null; // null — створення, Todo — редагування
};

type FormErrors = {
  title: string;
  description: string;
};

function TodoModal({
  isOpen,
  onClose,
  handleSave,
  todoToEdit = null,
}: ModalType) {
  const [formTitle, setFormTitle] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    description: "",
  });

  useEffect(() => {
    setFormTitle({
      title: todoToEdit?.title ?? "",
      description: todoToEdit?.description ?? "",
    });

    setErrors({
      title: "",
      description: "",
    });
  }, [todoToEdit, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  type FieldName = keyof TodoFormData;

  function validate(field: FieldName, value: string): string {
    switch (field) {
      case "title":
        return !value.trim() ? "Введи назву завдання" : "";

      case "description":
        return value.length > 200
          ? "Опис не може перевищувати 200 символів"
          : "";

      default:
        return "";
    }
  }

  const validateField = (field: FieldName, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validate(field, value),
    }));
  };

    const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as keyof TodoFormData;
    const value = e.target.value;

    setFormTitle((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validate(field, value),
      }));
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      title: validate("title", formTitle.title),
      description: validate("description", formTitle.description),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    handleSave(formTitle);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{todoToEdit ? "Edit Todo" : "Create Todo"}</h2>
          <button
            className="modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={submitForm} className="modal-form" noValidate>
          <label htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            name="title"
            placeholder="What needs to be done?"
            value={formTitle.title}
            onChange={handleFormChange}
            onBlur={() => validateField("title", formTitle.title)}
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title && <p className="field-error">{errors.title}</p>}

          <label htmlFor="todo-description">Description</label>
          <textarea
            id="todo-description"
            name="description"
            placeholder="Add some details..."
            value={formTitle.description}
            onChange={handleFormChange}
            rows={4}
            onBlur={() => validateField("description", formTitle.description)}
            aria-invalid={Boolean(errors.description)}
          />
          {errors.description && (
            <p className="field-error">{errors.description}</p>
          )}

          <div className="modal-actions">
            <button
              className="modal-button modal-button-secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button className="modal-button modal-button-primary" type="submit">
              {todoToEdit ? "Save Changes" : "Add Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoModal;
