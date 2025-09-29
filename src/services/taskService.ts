import taskRepository from '../repositories/taskRepository';
import { AppError } from '../utils/errors';
import { validateTaskData } from '../utils/validators';
import { 
  ITaskDocument, 
  ITaskQuery, 
  ITaskFilter, 
  ITaskStatistics,
  TaskStatus 
} from '../types/task.types';

class TaskService {
  async getAllTasks(query: ITaskQuery = {}): Promise<ITaskDocument[]> {
    const filters: ITaskFilter = {};
    
    if (query.status) {
      filters.status = query.status as TaskStatus;
    }
    
    if (query.priority) {
      filters.priority = query.priority as any;
    }
    
    if (query.completed !== undefined) {
      filters.completed = query.completed === 'true';
    }

    return await taskRepository.findAll(filters);
  }

  async getTaskById(id: string): Promise<ITaskDocument> {
    const task = await taskRepository.findById(id);
    
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    
    return task;
  }

  async createTask(taskData: Partial<ITaskDocument>): Promise<ITaskDocument> {
    validateTaskData(taskData);
    
    return await taskRepository.create(taskData);
  }

  async updateTask(id: string, taskData: Partial<ITaskDocument>): Promise<ITaskDocument> {
    const task = await taskRepository.findById(id);
    
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    
    // Se o status for 'completed', atualizar o campo completed
    if (taskData.status === TaskStatus.COMPLETED) {
      taskData.completed = true;
    }
    
    const updatedTask = await taskRepository.update(id, taskData);
    
    if (!updatedTask) {
      throw new AppError('Failed to update task', 500);
    }
    
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await taskRepository.findById(id);
    
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    
    await taskRepository.delete(id);
  }

  async getTasksByStatus(status: string): Promise<ITaskDocument[]> {
    const validStatuses = Object.values(TaskStatus);
    
    if (!validStatuses.includes(status as TaskStatus)) {
      throw new AppError('Invalid status', 400);
    }
    
    return await taskRepository.findByStatus(status);
  }

  async getTaskStatistics(): Promise<ITaskStatistics> {
    const stats = await taskRepository.countByStatus();
    
    const result: ITaskStatistics = {
      total: 0,
      pending: 0,
      in_progress: 0,
      completed: 0
    };
    
    stats.forEach(stat => {
      const key = stat._id as keyof Omit<ITaskStatistics, 'total'>;
      result[key] = stat.count;
      result.total += stat.count;
    });
    
    return result;
  }
}

export default new TaskService();