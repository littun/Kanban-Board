// src/types/index.ts
export type ColumnId = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: ColumnId;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface Column {
  id: ColumnId;
  title: string;
}

// Initial seed data
export const INITIAL_COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design System Update',
    description: 'Refresh the button component library with 2026 tokens.',
    columnId: 'todo',
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Refactor Auth Hook',
    description: 'Clean up the useAuth effect and improve memoization.',
    columnId: 'todo',
    priority: 'medium',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Marketing Landing Page',
    description: 'Launch the high-fidelity mockups for the Q3 campaign.',
    columnId: 'in_progress',
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Optimistic UI Logic',
    description: 'Implement the rollback logic for the Kanban project.',
    columnId: 'in_progress',
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: '5',
    title: 'User Onboarding',
    description: 'Map out the user flux for current registrations.',
    columnId: 'done',
    priority: 'low',
    createdAt: new Date(),
  },
];
