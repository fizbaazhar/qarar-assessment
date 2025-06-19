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

const initialState = loadProfile() || {
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
      Object.assign(state, initialState);
      saveProfile(initialState);
    },
  },
});

export const { updateProfile, setAvatar, resetProfile } = profileSlice.actions;
export default profileSlice.reducer; 