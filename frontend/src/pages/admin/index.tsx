import React from 'react';
import LayoutDashboard from '../../components/admin/LayoutDashboard';

const Dashboard = () => {
  return (
    <LayoutDashboard>
      <div className="flex justify-center items-center h-full p-4">
        <h1 className="text-4xl font-semibold text-center">Welcome to the Dashboard</h1>
      </div>
    </LayoutDashboard>
  );
};

export default Dashboard;
