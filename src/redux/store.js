import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import tasksReducer from './tasksSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    tasks: tasksReducer,
  },
});

export default store;