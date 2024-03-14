// components/dashboard/LayoutDashboard.tsx
import React from 'react';
import Sidebar from './Sidebar';

type LayoutDashboardProps = {
  children: React.ReactNode;
};

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default LayoutDashboard;
