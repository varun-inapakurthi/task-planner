import React, { useState } from 'react';
import { Task } from '../types';
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { PlusCircle } from 'lucide-react';
import Tooltip from './Tooltip';

interface WeekViewProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  currentDate: Date;
  onDateClick: (date: Date, task: Task | null) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  tasks,
  onUpdateTask,
  currentDate,
  onDateClick,
}) => {
  const [hoveredTask, setHoveredTask] = useState<Task | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setHoveredTask(null);
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    const taskData = e.dataTransfer.getData('text');
    const task = JSON.parse(taskData);
    onUpdateTask({
      ...task,
      id: task._id,
      dueDate: format(date, 'yyyy-MM-dd'),
    });
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    task: Task
  ) => {
    setHoveredTask(task);
    setPopupPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredTask(null);
  };
  const statusColorMap = {
    'To Do': 'bg-red-400 text-white',
    'In Progress': 'bg-yellow-200 text-gray-800',
    Completed: 'bg-green-400 text-white',
  };

  return (
    <div className='relative'>
      <div className='grid grid-cols-7 gap-4'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className='text-center font-semibold text-gray-500 p-2 hidden sm:block'
          >
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-4'>
        {daysInWeek.map((date) => (
          <div
            key={date.toString()}
            className={`relative border rounded-lg p-3 h-28 sm:h-36 overflow-hidden transition-all duration-200 ease-in-out  'bg-white'
             cursor-pointer shadow-sm hover:shadow-md`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, date)}
          >
            <div className='flex flex-row justify-between'>
              <div className='text-sm sm:text-base font-semibold'>
                {format(date, 'd')}
              </div>
              <div>
                <PlusCircle
                  size={15}
                  className='hover:bg-gray-200'
                  onClick={() => {
                    onDateClick(date, null);
                  }}
                />
              </div>
            </div>

            <div className='mt-2 space-y-2'>
              {tasks
                .filter(
                  (task) =>
                    format(new Date(task.dueDate), 'yyyy-MM-dd') ===
                    format(date, 'yyyy-MM-dd')
                )
                .map((task) => (
                  <div
                    key={task._id.toString()}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onMouseEnter={(e) => handleMouseEnter(e, task)}
                    onMouseLeave={handleMouseLeave}
                    className={`${
                      statusColorMap[task.status]
                    } rounded-lg px-2 py-1 text-xs sm:text-sm truncate shadow-sm hover:shadow-md transition duration-200  cursor-move`}
                    onClick={() => {
                      onDateClick(date, task);
                    }}
                  >
                    {task.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {hoveredTask && (
        <Tooltip popupPosition={popupPosition} hoveredTask={hoveredTask} />
      )}
    </div>
  );
};

export default WeekView;
