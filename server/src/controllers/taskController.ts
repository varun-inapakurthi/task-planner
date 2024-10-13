import { Request, Response } from 'express';
import Task from '../models/Task';

export const createTask = async (req: Request, res: Response) => {
  const { title, description, dueDate, status = 'To Do' } = req.body;
  const userId = req.session.userId as string;

  try {
    const newTask = new Task({ userId, title, description, dueDate, status });
    await newTask.save();
    res
      .status(201)
      .json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};


export const getTasks = async (req: Request, res: Response) => {
  const userId = req.session.userId; 
  const { startDate, endDate } = req.query; 

  try {
    const tasks = await Task.find({
      userId,
      dueDate: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      },
    });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, status },
      { new: true }
    );
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res
      .status(200)
      .json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting task' });
  }
};
