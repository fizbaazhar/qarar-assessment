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
      const { email, name } = action.payload;
      
      const userData = {
        id: Date.now(),
        email,
        name,
        firstName: name.split(' ')[0] || '',
        lastName: name.split(' ').slice(1).join(' ') || '',
        age: '',
        avatar: '',
        createdAt: new Date().toISOString(),
      };
      
      state.user = userData;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      saveUser(userData);
    },
    login: (state, action) => {
      // For demo: just accept any credentials
      const { email, name } = action.payload;
      
      // Create user object for login (similar to signup)
      const userData = {
        id: Date.now(),
        email,
        name,
        firstName: name.split(' ')[0] || '',
        lastName: name.split(' ').slice(1).join(' ') || '',
        age: '',
        avatar: '',
        createdAt: new Date().toISOString(),
      };
      
      state.user = userData;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      saveUser(userData);
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
  
  // Reset profile to initial state
  dispatch({ 
    type: 'profile/resetProfile',
    payload: {
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      avatar: '',
    }
  });
  
  // Reset other slices to their initial state
  dispatch({ type: 'tasks/setTasks', payload: [] });
  dispatch({ type: 'notifications/clearAllNotifications' });
};

export default authSlice.reducer;
