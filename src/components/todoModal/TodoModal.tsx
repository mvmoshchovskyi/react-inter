import { type ChangeEvent, useState } from "react";
import "./TodoModal.css";

type TodoFormData = {
  title: string;
  description: string;
};

type ModalType = {
  isOpen: boolean;
  onClose: () => void;
  handleSave: (data: TodoFormData) => void;
};

function TodoModal({ isOpen, onClose, handleSave }: ModalType) {
  const [formTitle, setFormTitle] = useState({ title: "", description: "" });
  if (!isOpen) return null;

  const handleFormTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormTitle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    handleSave(formTitle);
    setFormTitle({ title: "", description: "" });
  };

  return (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>Create Todo</h2>
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>

      <form onSubmit={submitForm} className="modal-form">
        <label htmlFor="todo-title">Title</label>
        <input
          id="todo-title"
          name="title"
          placeholder="What needs to be done?"
          required
          value={formTitle.title}
          onChange={handleFormTitle}
        />

        <label htmlFor="todo-description">Description</label>
        <textarea
          id="todo-description"
          name="description"
          placeholder="Add some details..."
          value={formTitle.description}
          onChange={(e) =>
            setFormTitle((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          rows={4}
        />

        <div className="modal-actions">
          <button
            className="modal-button modal-button-secondary"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="modal-button modal-button-primary"
            type="submit"
          >
            Save Todo
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default TodoModal;
