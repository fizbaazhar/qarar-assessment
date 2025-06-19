import React from 'react';
import systemUpdateIcon from '../assets/icons/system-update.svg';
import messageIcon from '../assets/icons/message.svg';
import tickIcon from '../assets/icons/tick.svg';
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
          <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 w-6 h-6 bg-primary rounded-lg flex items-center justify-center mr-3">
            <img src={messageIcon} alt="New Comment" className="lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3" />
          </div>
        );
      case 'system':
        return (
          <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 w-6 h-6 bg-[#F6A723] rounded-lg flex items-center justify-center mr-3">
            <img src={systemUpdateIcon} alt="System Update" className="lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3" />
          </div>
        );
      case 'password':
      case 'update':
        return (
          <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 w-6 h-6 bg-[#4AC29C] rounded-lg flex items-center justify-center mr-3">
                <img src={tickIcon} alt="Complete" className="lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3" />
          </div>
        );
      default:
        // Fallback to checkmark icon for any unhandled types
        return (
          <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 w-6 h-6 bg-[#4AC29C] rounded-lg flex items-center justify-center mr-3">
             <img src={tickIcon} alt="Complete" className="lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3" />
          </div>
        );
    }
  };

  return (
    <div className="py-2 sm:py-3 first:pt-0">
      <div className="flex items-start">
        {getNotificationIcon(notification.type)}
        <div className="flex-1">
          <h3 className="lg:text-sm text-[12px] font-medium text-gray-900 leading-5">
            {notification.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {formatTimeAgo(notification.timestamp)}
          </p>
        </div>
        <button
          onClick={() => onDelete(notification.id)}
          className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
          title="Delete notification"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotificationCard; 