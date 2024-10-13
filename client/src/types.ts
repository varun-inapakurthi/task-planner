export interface Task {
  private _id(_id: any): void;
  id: string;
  description?: string;
  title: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Completed';
}

export type CalendarView = 'month' | 'week';

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
}