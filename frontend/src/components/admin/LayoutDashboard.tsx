// components/dashboard/LayoutDashboard.tsx
import React from 'react';
import Sidebar from './Sidebar';
import { adminSideBarItems } from '@/const';

type LayoutDashboardProps = {
  children: React.ReactNode;
};

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-base-100">
      <Sidebar navItems={adminSideBarItems} />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default LayoutDashboard;
