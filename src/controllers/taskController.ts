import { Request, Response } from 'express';
import taskService from '../services/taskService';
import { asyncHandler } from '../utils/asyncHandler';
import { ITaskQuery } from '../types/task.types';

class TaskController {
  getAllTasks = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await taskService.getAllTasks(req.query as ITaskQuery);
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  });

  getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const task = await taskService.getTaskById(req.params.id as string);
    
    res.status(200).json({
      success: true,
      data: task
    });
  });

  createTask = asyncHandler(async (req: Request, res: Response) => {
    const task = await taskService.createTask(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  });

  updateTask = asyncHandler(async (req: Request, res: Response) => {
    const task = await taskService.updateTask(req.params.id as string, req.body);
    
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  });

  deleteTask = asyncHandler(async (req: Request, res: Response) => {
    await taskService.deleteTask(req.params.id as string);
    
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  });

  getTasksByStatus = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await taskService.getTasksByStatus(req.params.status as string);
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  });

  getTaskStatistics = asyncHandler(async (req: Request, res: Response) => {
    const stats = await taskService.getTaskStatistics();
    
    res.status(200).json({
      success: true,
      data: stats
    });
  });
}

export default new TaskController();