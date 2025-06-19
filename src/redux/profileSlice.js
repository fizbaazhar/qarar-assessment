import { createSlice } from '@reduxjs/toolkit';

// Helpers for localStorage
const PROFILE_KEY = 'profile';

const loadProfile = () => {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveProfile = (profile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

// Helper: Load user data from auth to initialize profile
const loadUserFromAuth = () => {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return {
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        age: userData.age || '',
        avatar: userData.avatar || '',
      };
    }
    return null;
  } catch {
    return null;
  }
};

const initialState = loadProfile() || loadUserFromAuth() || {
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  avatar: '', // data URL or file path
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      Object.assign(state, action.payload);
      saveProfile(state);
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
      saveProfile(state);
    },
    resetProfile: (state) => {
      // Reset to completely empty state
      const emptyState = {
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        avatar: '',
      };
      Object.assign(state, emptyState);
      // Clear from localStorage
      localStorage.removeItem(PROFILE_KEY);
    },
    initializeFromUser: (state, action) => {
      const userData = action.payload;
      const profileData = {
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        age: userData.age || '',
        avatar: userData.avatar || '',
      };
      Object.assign(state, profileData);
      saveProfile(state);
    },
  },
});

export const { updateProfile, setAvatar, resetProfile, initializeFromUser } = profileSlice.actions;
export default profileSlice.reducer; 