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
import { addTask, removeTask, toggleTask, reorderTasks } from '../redux/tasksSlice';
import { addNotification } from '../redux/notificationsSlice';
import MainLayout from '../components/MainLayout';
import AddTaskModal from '../components/AddTaskModal';
import Button from '../components/Button';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { showToast } from '../utils/toaster';

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
      className={`bg-white border-t border-gray-200 p-3 sm:p-4 transition-all duration-200 ${task.completed ? 'opacity-75' : ''
        }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">


          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="h-3 w-3 sm:h-4 sm:w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2 sm:mr-3"
          />

          {/* Task Title */}
          <span
            className={`flex-1 text-sm sm:text-base text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''
              }`}
          >
            {task.title}
          </span>
        </div>

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
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    taskId: null,
    taskTitle: ''
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddTask = (newTask) => {
    dispatch(addTask(newTask));
    // Create success notification for new task
    dispatch(addNotification({
      type: 'SUCCESS',
      customTitle: 'New Task Added Successfully'
    }));
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
    setDeleteConfirmation({
      isOpen: true,
      taskId: taskId,
      taskTitle: task.title
    });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.taskId) {
      dispatch(removeTask(deleteConfirmation.taskId));
      showToast({
        type: 'SUCCESS',
        message: `Task "${deleteConfirmation.taskTitle}" has been deleted`
      });
      setDeleteConfirmation({
        isOpen: false,
        taskId: null,
        taskTitle: ''
      });
    }
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
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h1 className="page-heading">Task Management</h1>
            <Button
              variant="primary"
              size="md"
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </Button>
          </div>

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
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-500 mb-2">No tasks yet</p>
              <p className="text-xs sm:text-sm text-gray-400">Click "Add Task" to get started!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddTask={handleAddTask}
      />

      <ConfirmDeleteModal
        open={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({
          isOpen: false,
          taskId: null,
          taskTitle: ''
        })}
        onConfirm={confirmDelete}
        taskTitle={deleteConfirmation.taskTitle}
      />
    </MainLayout>
  );
};

export default TasksPage; 