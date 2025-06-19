import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import Header from './Header';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 