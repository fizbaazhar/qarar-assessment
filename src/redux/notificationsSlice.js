import { createSlice } from '@reduxjs/toolkit';
import { NOTIFICATION_TYPES, createNotification } from '../config/notificationTypes';

// Load notifications from localStorage on initialization
const loadNotificationsFromStorage = () => {
  try {
    const stored = localStorage.getItem('notifications');
    return stored ? JSON.parse(stored) : getInitialNotifications();
  } catch (error) {
    console.error('Error loading notifications from localStorage:', error);
    return getInitialNotifications();
  }
};

// Save notifications to localStorage
const saveNotificationsToStorage = (notifications) => {
  try {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notifications to localStorage:', error);
  }
};

// Generate initial notifications for demo purposes
const getInitialNotifications = () => [
  {
    id: 1,
    ...createNotification('COMMENT'),
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 min ago
    isRead: false
  },
  {
    id: 2,
    ...createNotification('SYSTEM_UPDATE'),
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    isRead: false
  },
  {
    id: 3,
    ...createNotification('PASSWORD_CHANGE'),
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    isRead: false
  }
];

const initialState = {
  notifications: loadNotificationsFromStorage(),
  filter: 'all', // 'all', 'unread', 'read'
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
        saveNotificationsToStorage(state.notifications);
      }
    },
    markAsUnread: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = false;
        saveNotificationsToStorage(state.notifications);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.isRead = true;
      });
      saveNotificationsToStorage(state.notifications);
    },
    addNotification: (state, action) => {
      const { type, customTitle } = action.payload;
      const newNotification = {
        id: Date.now(),
        ...createNotification(type, customTitle),
        isRead: false
      };
      state.notifications.unshift(newNotification);
      saveNotificationsToStorage(state.notifications);
    },
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
      saveNotificationsToStorage(state.notifications);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      saveNotificationsToStorage(state.notifications);
    }
  },
});

export const {
  markAsRead,
  markAsUnread,
  markAllAsRead,
  addNotification,
  deleteNotification,
  setFilter,
  clearAllNotifications
} = notificationsSlice.actions;

// Selectors
export const selectAllNotifications = (state) => state.notifications.notifications;
export const selectUnreadNotifications = (state) => 
  state.notifications.notifications.filter(n => !n.isRead);
export const selectReadNotifications = (state) => 
  state.notifications.notifications.filter(n => n.isRead);
export const selectUnreadCount = (state) => 
  state.notifications.notifications.filter(n => !n.isRead).length;
export const selectFilter = (state) => state.notifications.filter;
export const selectFilteredNotifications = (state) => {
  const { notifications, filter } = state.notifications;
  switch (filter) {
    case 'unread':
      return notifications.filter(n => !n.isRead);
    case 'read':
      return notifications.filter(n => n.isRead);
    default:
      return notifications;
  }
};

export default notificationsSlice.reducer; 