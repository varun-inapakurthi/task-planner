import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Calendar from './Calendar';
import TaskForm from './TaskForm';
import { Task, CalendarView } from '../types';
import { SetToast } from '../utils/toast';
import axiosInstance from '../utils/axios';
import Loader from './Loader';
interface AppProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isAuthenticated: boolean;
}

function App({ setIsAuthenticated, isAuthenticated }: AppProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<CalendarView>('month');
  const navigate = useNavigate();
  const getTasks = async () => {
    try {
      const taskDates = () => {
        if (view === 'month') {
          return {
            startDate: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              1
            ),
            endDate: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              0
            ),
          };
        } else {
          return {
            startDate: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() - new Date().getDay()
            ),
            endDate: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() + 6 - new Date().getDay()
            ),
          };
        }
      };
      const { startDate, endDate } = taskDates();
      const response = await axiosInstance.get(
        `/api/tasks?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setTasks(response.data.tasks);
      setIsAuthenticated(true);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        console.log('Something went wrong');
      }
    }
  };

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
    getTasks();

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [navigate, view]);

  const addTask = async (task: Task) => {
    try {
      await axiosInstance.post('/api/tasks', task, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      getTasks();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        SetToast(error.response.data.message || 'Error while adding task');
      } else {
        SetToast('Error while adding task');
      }
      throw error;
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      await axiosInstance.put('/api/tasks/' + updatedTask.id, updatedTask, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      getTasks();
    } catch (error) {
      SetToast(error.response.data.message || 'Error while updating task');
      throw error;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axiosInstance.delete('/api/tasks/' + taskId, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      getTasks();
    } catch (error) {
      SetToast(error.response.data.message || 'Error while deleting task');
      throw error;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col'>
      {!isAuthenticated ? (
        <Loader />
      ) : (
        <main className='flex-grow p-6'>
          <div className='mb-6 flex flex-wrap gap-3 justify-center sm:justify-start'>
            <button
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ease-in-out ${
                view === 'month'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
              onClick={() => setView('month')}
            >
              Month View
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ease-in-out ${
                view === 'week'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
              onClick={() => setView('week')}
            >
              Week View
            </button>
          </div>

          <div className='flex flex-col lg:flex-row gap-6'>
            <div className='w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-lg'>
              <Calendar
                tasks={tasks}
                view={view}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onAddTask={addTask}
              />
            </div>

            <div className='w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg'>
              <TaskForm onAddTask={addTask} />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
