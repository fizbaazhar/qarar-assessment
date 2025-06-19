import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import tasksReducer from './tasksSlice';
import notificationsReducer from './notificationsSlice';

// Create store with middleware that logs state changes
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    tasks: tasksReducer,
    notifications: notificationsReducer,
  },
});

export default store;