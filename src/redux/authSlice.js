import { createSlice } from '@reduxjs/toolkit';

// Helper: Load user from localStorage
const loadUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Helper: Save user to localStorage
const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};


// Helper: Clear all localStorage data
const clearAllLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('profile');
  localStorage.removeItem('tasks');
  localStorage.removeItem('notifications');
};

const initialState = {
  user: loadUser(),
  isAuthenticated: !!loadUser(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      saveUser(action.payload);
    },
    login: (state, action) => {
      // For demo: just accept any credentials
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      saveUser(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      clearAllLocalStorage();
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { signup, login, logout, setLoading, setError, clearError } = authSlice.actions;

export const logoutUser = () => (dispatch) => {
  // Clear all localStorage
  clearAllLocalStorage();
  
  // Reset all Redux slices
  dispatch(logout());
  
  // Reset other slices to their initial state
  dispatch({ type: 'profile/resetProfile' });
  dispatch({ type: 'tasks/setTasks', payload: [] });
  dispatch({ type: 'notifications/clearAllNotifications' });
};

export default authSlice.reducer;
