import React from 'react';
import Card from './Card';

const NotificationItem = ({ icon, title, time }) => (
  <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
    <div className="flex-shrink-0">
      {icon}
    </div>
    <div className="flex-grow">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  </div>
);

const NotificationsCard = ({ notifications }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'comment':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <div className="space-y-1">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            icon={getIcon(notification.type)}
            title={notification.title}
            time={notification.time}
          />
        ))}
      </div>
    </Card>
  );
};

export default NotificationsCard; 