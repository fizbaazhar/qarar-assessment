import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import NotificationCard from '../components/NotificationCard';
import {
  selectFilteredNotifications,
  markAsRead,
  markAsUnread,
  deleteNotification
} from '../redux/notificationsSlice';

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(selectFilteredNotifications);
  const [, setTimeUpdate] = useState(0); // Force re-render for time updates

  // Update timestamps every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUpdate(prev => prev + 1);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMs = now - notificationTime;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // For very recent notifications
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    // For minutes
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    // For hours
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    // For days
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    // For older notifications, show the actual date
    return notificationTime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const handleToggleRead = (notification) => {
    if (notification.isRead) {
      dispatch(markAsUnread(notification.id));
    } else {
      dispatch(markAsRead(notification.id));
    }
  };

  const handleDelete = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  console.log('Current notifications:', notifications); // Debug log

  return (
    <MainLayout>
      <div className="max-w-full mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-4 py-5">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
            
            <div className="space-y-1 divide-y divide-gray-100">
              {notifications && notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onToggleRead={handleToggleRead}
                    onDelete={handleDelete}
                    formatTimeAgo={formatTimeAgo}
                  />
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No notifications to show
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotificationsPage; 