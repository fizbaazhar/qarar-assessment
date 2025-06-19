import { createSlice } from '@reduxjs/toolkit';

const TASKS_KEY = 'tasks';
const loadTasks = () => {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};
const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

const initialState = loadTasks();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasks(state);
    },
    removeTask: (state, action) => {
      const idx = state.findIndex((t) => t.id === action.payload);
      if (idx !== -1) state.splice(idx, 1);
      saveTasks(state);
    },
    toggleTask: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
      saveTasks(state);
    },
    reorderTasks: (state, action) => {
      // action.payload: array of reordered tasks
      const newState = action.payload;
      saveTasks(newState);
      return newState;
    },
    setTasks: (state, action) => {
      const newState = action.payload;
      saveTasks(newState);
      return newState;
    },
  },
});

export const { addTask, removeTask, toggleTask, reorderTasks, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer; 