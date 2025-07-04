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
    let icon;
    let bgColor;

    switch (type) {
      case 'info':
        icon = messageIcon;
        bgColor = NOTIFICATION_TYPES.INFO.bgColor;
        break;
      case 'warning':
        icon = systemUpdateIcon;
        bgColor = NOTIFICATION_TYPES.WARNING.bgColor;
        break;
      case 'success':
        icon = tickIcon;
        bgColor = NOTIFICATION_TYPES.SUCCESS.bgColor;
        break;
      case 'error':
        icon = systemUpdateIcon; // You might want to add a specific error icon
        bgColor = NOTIFICATION_TYPES.ERROR.bgColor;
        break;
      default:
        icon = tickIcon;
        bgColor = NOTIFICATION_TYPES.SUCCESS.bgColor;
    }

    return (
      <div 
        className="lg:w-10 lg:h-10 md:w-8 md:h-8 w-6 h-6 rounded-lg flex items-center justify-center mr-3"
        style={{ backgroundColor: bgColor }}
      >
        <img 
          src={icon} 
          alt={`${type} notification`} 
          className="lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3" 
        />
      </div>
    );
  };

  return (
    <div className={`py-2 sm:py-3 first:pt-0 transition-all duration-200 ${notification.isRead ? 'opacity-75' : 'opacity-100'}`}>
      <div className="flex items-start">
        {getNotificationIcon(notification.type)}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`lg:text-sm text-[12px] font-medium leading-5 ${notification.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
              {notification.title}
            </h3>
            {!notification.isRead && (
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" data-testid="unread-indicator"></div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {formatTimeAgo(notification.timestamp)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {/* Mark as Read/Unread Button */}
          <button
            onClick={() => onToggleRead(notification)}
            className="p-1 sm:p-2 text-gray-400 hover:text-blue-600 rounded-full transition-colors"
            title={notification.isRead ? 'Mark as unread' : 'Mark as read'}
          >
            {notification.isRead ? (
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            )}
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => onDelete(notification.id)}
            className="p-1 sm:p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors"
            title="Delete notification"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard; 