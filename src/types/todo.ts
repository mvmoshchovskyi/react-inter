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
