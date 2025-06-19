import React from 'react';
import systemUpdateIcon from '../assets/icons/system-update.svg';
import messageIcon from '../assets/icons/message.svg';
import { NOTIFICATION_TYPES } from '../config/notificationTypes';

const NotificationCard = ({ 
  notification, 
  onToggleRead, 
  onDelete, 
  formatTimeAgo
}) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'comment':
        return (
          <div className="w-10 h-10 bg-[#64A4F4] rounded-lg flex items-center justify-center mr-3">
            <img src={messageIcon} alt="New Comment" className="w-5 h-5" />
          </div>
        );
      case 'system':
        return (
          <div className="w-10 h-10 bg-[#F6A723] rounded-lg flex items-center justify-center mr-3">
            <img src={systemUpdateIcon} alt="System Update" className="w-6 h-6" />
          </div>
        );
      case 'password':
      case 'update':
        return (
          <div className="w-10 h-10 bg-[#4AC29C] rounded-lg flex items-center justify-center mr-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      default:
        // Fallback to checkmark icon for any unhandled types
        return (
          <div className="w-10 h-10 bg-[#4AC29C] rounded-lg flex items-center justify-center mr-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="py-3 first:pt-0">
      <div className="flex items-start">
        {getNotificationIcon(notification.type)}
        <div className="flex-1">
          <h3 className="text-[15px] font-medium text-gray-900 leading-5">
            {notification.title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {formatTimeAgo(notification.timestamp)}
          </p>
        </div>
        <button
          onClick={() => onDelete(notification.id)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
          title="Delete notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotificationCard; 