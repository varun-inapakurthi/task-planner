import React from 'react'



interface TooltipProps {
  popupPosition: { x: number; y: number };
  hoveredTask: { title: string; description: string; dueDate: string | Date; status: string };
}

export default function Tooltip({ popupPosition, hoveredTask }: TooltipProps) {
  return (
    <div
      className='absolute bg-white p-4 shadow-xl rounded-lg border border-gray-300 w-80 transform transition-transform duration-200 ease-in-out'
      style={{
        top: `${popupPosition.y + 10}px`,
        left: `${popupPosition.x + 10}px`,
      }}
    >
      <div className='flex items-start justify-between'>
        <h3 className='text-lg font-semibold text-gray-900'>
          {hoveredTask.title}
        </h3>
      </div>

      <p className='mt-2 text-sm text-gray-700'>
        {hoveredTask.description}
      </p>

      <div className='mt-4'>
        <p className='flex items-center text-xs text-gray-500'>
          <svg
            className='w-4 h-4 text-gray-400 mr-2'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 7V3m8 0v4M3 13h18M5 10h1m-1 4h1m1 4h1m4 0h4'
            />
          </svg>
          Due Date:{' '}
          <span className='ml-1 font-medium'>
            {new Date(hoveredTask.dueDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </p>

        <p className='flex items-center text-xs text-gray-500 mt-2'>
          <svg
            className='w-4 h-4 text-green-400 mr-2'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12l2 2l4-4'
            />
          </svg>
          Status:{' '}
          <span className='ml-1 font-medium'>{hoveredTask.status}</span>
        </p>
      </div>

      <div className='absolute w-3 h-3 bg-white transform rotate-45 border border-gray-300 -top-2 left-2 shadow-lg'></div>
    </div>
  )
}