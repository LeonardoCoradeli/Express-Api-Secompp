import { AppError } from './errors';
import { TaskStatus, TaskPriority } from '../types/task.types';

export const validateTaskData = (data: any): boolean => {
  if (!data.title || data.title.trim() === '') {
    throw new AppError('Title is required', 400);
  }

  if (data.status && !Object.values(TaskStatus).includes(data.status)) {
    throw new AppError('Invalid status value', 400);
  }

  if (data.priority && !Object.values(TaskPriority).includes(data.priority)) {
    throw new AppError('Invalid priority value', 400);
  }

  if (data.dueDate && isNaN(Date.parse(data.dueDate))) {
    throw new AppError('Invalid date format', 400);
  }

  return true;
};