import mongoose, { Schema } from 'mongoose';
import { ITaskDocument, TaskStatus, TaskPriority } from '../types/task.types';

/*#*
 * @openapi
 * components:
 * schemas:
 * Task:
 * type: object
 * required:
 * - title
 * properties:
 * _id:
 * type: string
 * description: O ID único da tarefa gerado pelo MongoDB.
 * example: 60d0fe4f5311236168a109ca
 * title:
 * type: string
 * description: O título da tarefa.
 * example: "Estudar Swagger"
 * description:
 * type: string
 * description: Uma descrição opcional para a tarefa.
 * example: "Configurar o swagger-jsdoc e swagger-ui-express no projeto."
 * status:
 * type: string
 * enum: [pending, in_progress, completed]
 * default: pending
 * priority:
 * type: string
 * enum: [low, medium, high]
 * default: medium
 * completed:
 * type: boolean
 * default: false
 * dueDate:
 * type: string
 * format: date-time
 * description: A data de vencimento da tarefa.
 * createdAt:
 * type: string
 * format: date-time
 * description: A data de criação da tarefa.
 * updatedAt:
 * type: string
 * format: date-time
 * description: A data da última atualização da tarefa.
 */

const taskSchema = new Schema<ITaskDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM
    },
    dueDate: {
      type: Date
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Índices para melhor performance
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ dueDate: 1 });

export default mongoose.model<ITaskDocument>('Task', taskSchema);