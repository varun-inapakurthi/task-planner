
import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  userId: Schema.Types.ObjectId;  
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  dueDate: Date;  
  createdAt: Date;
}

const taskSchema = new Schema<ITask>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Task = model<ITask>('Task', taskSchema);
export default Task;
