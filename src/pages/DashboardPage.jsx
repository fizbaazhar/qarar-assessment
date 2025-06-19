import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import DashboardCard from '../components/DashboardCard';
import Header from '../components/Header';

/**
 * DashboardPage Component
 * Main dashboard layout with navigation and component sections
 * Will contain: Dashboard Card, Notifications Panel, Task List
 */
const DashboardPage = () => {
  const dispatch = useDispatch();

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [2800, 2900, 2700, 3000, 3100, 3200],
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onLogout={handleLogout} />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            <DashboardCard
              title="Sales"
              value={3200}
              prefix="$"
              trend={12.5}
              chartData={salesData}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 