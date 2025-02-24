export type TodoType = 'main' | 'extra';

export interface Todo {
  id: string;
  content: string;
  isCompleted: boolean;
  createdAt: string;
  type: TodoType;
}

export interface DailyRecord {
  date: string;
  mainTodosCompleted: number;
  totalMainTodos: number;
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (content: string, type: TodoType, createdAt?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  getDailyRecords: () => DailyRecord[];
} 