import Task from '../models/Task';
import { ITaskDocument, ITaskFilter } from '../types/task.types';

class TaskRepository {
  async findAll(filters: ITaskFilter = {}): Promise<ITaskDocument[]> {
    return await Task.find(filters).sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<ITaskDocument | null> {
    return await Task.findById(id);
  }

  async create(taskData: Partial<ITaskDocument>): Promise<ITaskDocument> {
    const task = new Task(taskData);
    return await task.save();
  }

  async update(id: string, taskData: Partial<ITaskDocument>): Promise<ITaskDocument | null> {
    return await Task.findByIdAndUpdate(id, taskData, {
      new: true,
      runValidators: true
    });
  }

  async delete(id: string): Promise<ITaskDocument | null> {
    return await Task.findByIdAndDelete(id);
  }

  async findByStatus(status: string): Promise<ITaskDocument[]> {
    return await Task.find({ status }).sort({ createdAt: -1 });
  }

  async findByPriority(priority: string): Promise<ITaskDocument[]> {
    return await Task.find({ priority }).sort({ dueDate: 1 });
  }

  async countByStatus(): Promise<Array<{ _id: string; count: number }>> {
    return await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
  }
}

export default new TaskRepository();