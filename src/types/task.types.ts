import { Document } from 'mongoose';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface ITask {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  completed: boolean;
}

export interface ITaskDocument extends ITask, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  completed?: boolean;
}

export interface ITaskQuery {
  status?: string;
  priority?: string;
  completed?: string;
}

export interface ITaskStatistics {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
}