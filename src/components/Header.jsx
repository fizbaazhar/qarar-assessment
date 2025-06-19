import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectUnreadCount } from '../redux/notificationsSlice';
import bellIcon from '../assets/icons/notification-bell.svg';

const Header = ({ onLogout }) => {
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile);
  const unreadCount = useSelector(selectUnreadCount);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const avatarSrc = profile.avatar || null;
  const displayName = user?.name || user?.firstName || 'User';

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div 
              className="cursor-pointer" 
              onClick={() => navigate('/dashboard')}
            >
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Mini Dashboard</h1>
            </div>
            <nav className="hidden md:flex space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-primary-10 text-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-primary-10'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/tasks')}
                className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive('/tasks')
                    ? 'bg-primary-10 text-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-primary-10'
                }`}
              >
                Tasks
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => navigate('/notifications')}
              className={`p-1 sm:p-2 rounded-md transition-transform hover:scale-110 relative ${
                isActive('/notifications') ? 'scale-110' : ''
              }`}
              aria-label="Notifications"
            >
              <img src={bellIcon} alt="Notifications" className="w-5 h-5 sm:w-6 sm:h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-1 sm:space-x-2 focus:outline-none"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-label="User menu"
              >
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt="User avatar"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-primary"
                  />
                ) : (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 flex items-center justify-center border-2 border-primary">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <span className="hidden sm:inline text-sm sm:text-base text-gray-700 font-medium">{displayName}</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 sm:w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 text-gray-700 rounded-t-lg"
                    onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                  >
                    Profile
                  </button>
                  <button
                    className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 text-gray-700 rounded-b-lg"
                    onClick={() => { setDropdownOpen(false); onLogout(); }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 