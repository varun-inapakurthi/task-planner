import React, { useEffect, useState } from 'react';
import { Task } from '../types';
import {
  Calendar,
  CheckCircle2,
  PlusCircle,
  X,
  DeleteIcon,
} from 'lucide-react';
import { format } from 'date-fns';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  onClose?: () => void;
  onUpdateTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  initialDate?: Date;
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  onClose,
  initialDate,
  task,
}) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [date, setDate] = useState(
    task?.dueDate
      ? format(new Date(task.dueDate), 'yyyy-MM-dd')
      : initialDate
      ? format(initialDate, 'yyyy-MM-dd')
      : ''
  );
  const [time, setTime] = useState('');
  const [status, setStatus] = useState<Task['status']>(task?.status || 'To Do');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && date) {
      const newTask: Task = {
        title,
        description,
        dueDate: `${date}${time ? 'T' + time : ''}`,
        status,
      };
      if (task && onUpdateTask) {
        newTask.id = task._id;
        onUpdateTask(newTask);
      } else {
        onAddTask(newTask);
      }
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setStatus('To Do');
      if (onClose) onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  return (
    <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md max-h-min'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center'>
          <CheckCircle2 size={36} className='text-indigo-600 mr-3' />
          <h2 className='text-3xl font-extrabold text-gray-800'>
            {task ? 'Edit Task' : 'Add Task'}
          </h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 transition duration-200 ease-in-out'
          >
            <X size={24} />
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label
            htmlFor='title'
            className='block text-sm font-semibold text-gray-700 mb-2'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition duration-200 ease-in-out'
            placeholder='Enter task title'
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='description'
            className='block text-sm font-semibold text-gray-700 mb-2'
          >
            Description
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition duration-200 ease-in-out'
            placeholder='Enter task description'
            rows={4}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='date'
            className='block text-sm font-semibold text-gray-700 mb-2'
          >
            Date
          </label>
          <div className='relative'>
            <input
              type='date'
              id='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition duration-200 ease-in-out'
              required
            />
            <Calendar
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={18}
            />
          </div>
        </div>
        <div className='mb-6'>
          <label
            htmlFor='status'
            className='block text-sm font-semibold text-gray-700 mb-2'
          >
            Status
          </label>
          <select
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value as Task['status'])}
            className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition duration-200 ease-in-out'
          >
            <option value='To Do'>To Do</option>
            <option value='In Progress'>In Progress</option>
            <option value='Completed'>Completed</option>
          </select>
        </div>
        <button
          type='submit'
          className='w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-2 rounded-md font-medium shadow-md hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center'
        >
          <PlusCircle size={20} className='mr-2' />
          {task ? 'Update Task' : 'Add Task'}
        </button>

        {task && (
          <button
            type='button'
            className='w-full bg-red-500 text-white py-2 rounded-md font-medium shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center mt-4'
            onClick={async () => {
              if (onDeleteTask) await onDeleteTask(task._id);
              if (onClose) onClose();
            }}
          >
            <DeleteIcon size={20} className='mr-2' />
            Delete Task
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
