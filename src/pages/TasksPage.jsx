import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { logout } from '../redux/authSlice';
import { addTask, removeTask, toggleTask, reorderTasks } from '../redux/tasksSlice';
import { addNotification } from '../redux/notificationsSlice';
import MainLayout from '../components/MainLayout';

// Sortable Task Item Component
const SortableTaskItem = ({ task, onToggle, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3 shadow-sm hover:shadow-md transition-all duration-200 ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="mr-2 sm:mr-3 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 2zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 8zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 14zm6-8a2 2 0 1 1-.001-4.001A2 2 0 0 1 13 6zm0 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 8zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 14z" />
            </svg>
          </div>

          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2 sm:mr-3"
          />

          {/* Task Title */}
          <span
            className={`flex-1 text-sm sm:text-base text-gray-900 ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {task.title}
          </span>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="ml-2 sm:ml-3 text-gray-400 hover:text-red-500 transition-colors duration-200"
          title="Delete task"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const TasksPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    
    if (!newTaskTitle.trim()) {
      setError('Please enter a task title');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
    };

    dispatch(addTask(newTask));
    // Create success notification for new task
    dispatch(addNotification({
      type: 'SUCCESS',
      customTitle: 'New Task Added Successfully'
    }));
    setNewTaskTitle('');
    setError('');
  };

  const handleToggleTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    dispatch(toggleTask(taskId));
    // Create info notification for task status change
    dispatch(addNotification({
      type: 'INFO',
      customTitle: `Task ${task.completed ? 'Uncompleted' : 'Completed'}: ${task.title}`
    }));
  };

  const handleDeleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    dispatch(removeTask(taskId));
    // Create warning notification for task deletion
    dispatch(addNotification({
      type: 'WARNING',
      customTitle: `Task Deleted: ${task.title}`
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
      dispatch(reorderTasks(reorderedTasks));
      // Create info notification for task reordering
      dispatch(addNotification({
        type: 'INFO',
        customTitle: 'Tasks Order Updated'
      }));
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Task Management</h1>
          
          {/* Add Task Form */}
          <form onSubmit={handleAddTask} className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => {
                    setNewTaskTitle(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter a new task..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
              </div>
              <button
                type="submit"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Task
              </button>
            </div>
          </form>

          {/* Task List */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={tasks.map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <SortableTaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </SortableContext>
          </DndContext>

          {tasks.length === 0 && (
            <p className="text-sm sm:text-base text-gray-500 text-center py-6 sm:py-8">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TasksPage; 