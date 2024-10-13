import React, { useState } from 'react';
import { Task, CalendarView } from '../types';
import MonthView from './MonthView';
import WeekView from './WeekView';
import TaskForm from './TaskForm';
import { addMonths, addWeeks, format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  tasks: Task[];
  view: CalendarView;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask: (task: Task) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  tasks,
  view,
  onUpdateTask,
  onDeleteTask,
  onAddTask,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const handlePrevious = () => {
    setCurrentDate(
      view === 'month' ? addMonths(currentDate, -1) : addWeeks(currentDate, -1)
    );
  };

  const handleNext = () => {
    setCurrentDate(
      view === 'month' ? addMonths(currentDate, 1) : addWeeks(currentDate, 1)
    );
  };

  const handleDateClick = (date: Date, task: Task) => {
    setSelectedDate(date);
    setSelectedTask(task);
  };

  const handleCloseForm = () => {
    setSelectedDate(null);
  };

  return (
    <div className='bg-white rounded-xl shadow-lg p-6'>
      <div className='flex justify-between items-center mb-6'>
        <button
          onClick={handlePrevious}
          className='p-3 rounded-full hover:bg-gray-100 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400'
          aria-label='Go to previous item'
        >
          <ChevronLeft className='text-indigo-600' />
        </button>
        <h2 className='text-2xl font-extrabold text-gray-800'>
          {format(
            currentDate,
            view === 'month' ? 'MMMM yyyy' : "'Week of' MMM d, yyyy"
          )}
        </h2>
        <button
          onClick={handleNext}
          className='p-3 rounded-full hover:bg-gray-100 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400'
          aria-label='Go to next item'
        >
          <ChevronRight className='text-indigo-600' />
        </button>
      </div>

      {view === 'month' ? (
        <MonthView
          tasks={tasks}
          onUpdateTask={onUpdateTask}
          currentDate={currentDate}
          onDateClick={handleDateClick}
        />
      ) : (
        <WeekView
        tasks={tasks}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
        currentDate={currentDate}
        onDateClick={handleDateClick}
        />
      )}

      {selectedDate && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl'>
            <TaskForm
              onAddTask={onAddTask}
              onUpdateTask={onUpdateTask}
              onClose={handleCloseForm}
              initialDate={selectedDate}
              onDeleteTask={onDeleteTask}
              task={selectedTask}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
