import React from 'react';
import Card from './Card';

const TaskItem = ({ task, onToggle, onMenuClick }) => (
  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
      />
      <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
        {task.title}
      </span>
    </div>
    <button
      onClick={() => onMenuClick(task.id)}
      className="p-1 hover:bg-gray-100 rounded-lg"
    >
      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
    </button>
  </div>
);

const TasksCard = ({ tasks, onToggleTask, onTaskMenuClick }) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <div className="space-y-1">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onMenuClick={onTaskMenuClick}
          />
        ))}
      </div>
    </Card>
  );
};

export default TasksCard; 