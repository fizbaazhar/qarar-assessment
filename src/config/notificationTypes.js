// Notification types configuration
export const NOTIFICATION_TYPES = {
  SUCCESS: {
    id: 'success',
    title: 'Success',
    icon: 'checkmark',
    bgColor: '#4AC29C' // Green background for success
  },
  WARNING: {
    id: 'warning',
    title: 'Warning',
    icon: 'system-update', // Using warning triangle icon
    bgColor: '#F6A723' // Orange background for warnings
  },
  INFO: {
    id: 'info',
    title: 'Information',
    icon: 'message',
    bgColor: '#64A4F4' // Blue background for information
  },
  ERROR: {
    id: 'error',
    title: 'Error',
    icon: 'warning',
    bgColor: '#EF4444' // Red background for errors
  }
};

// Helper function to create a notification
export const createNotification = (type, customTitle = '') => {
  const notificationType = NOTIFICATION_TYPES[type];
  if (!notificationType) {
    throw new Error(`Invalid notification type: ${type}`);
  }

  return {
    type: notificationType.id,
    title: customTitle || notificationType.title,
    timestamp: new Date().toISOString()
  };
}; 