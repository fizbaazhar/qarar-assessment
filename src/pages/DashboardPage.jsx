import React from 'react';
import DashboardCard from '../components/DashboardCard';
import MainLayout from '../components/MainLayout';

/**
 * DashboardPage Component
 * Main dashboard layout with navigation and component sections
 * Will contain: Dashboard Card, Notifications Panel, Task List
 */
const DashboardPage = () => {
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [2800, 2900, 2700, 3000, 3100, 3200],
  };

  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default DashboardPage; 