import express from 'express';
import Joi from 'joi';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import { isAuthenticated } from '../middlewares/auth';
import { validate } from './../middlewares/validate';

const router = express.Router();

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  dueDate: Joi.date().iso().optional(),
  status: Joi.string()
    .valid('To Do', 'Completed', 'In Progress')
    .default('To Do'),
});

const taskUpdateSchema = Joi.object({
  _id: Joi.string().optional(),
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional(),
  dueDate: Joi.date().iso().optional(),
  status: Joi.string().valid('To Do', 'Completed', 'In Progress').optional(),
  userId: Joi.string().optional(),
  createdAt: Joi.date().optional(),
}).unknown(true);
router.post('/tasks', isAuthenticated, validate(taskSchema), createTask);
router.get('/tasks', isAuthenticated, getTasks);
router.put(
  '/tasks/:id',
  isAuthenticated,
  validate(taskUpdateSchema),
  updateTask
);
router.delete('/tasks/:id', isAuthenticated, deleteTask);

export default router;
