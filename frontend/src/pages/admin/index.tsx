import React from 'react';
import LayoutDashboard from '../../components/admin/LayoutDashboard';

const Dashboard = () => {
  return (
    <LayoutDashboard>
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Bienvenue sur le tableau de bord</h1>
        {/* Ici, vous pouvez ajouter plus de contenu ou des widgets de tableau de bord selon vos besoins */}
      </div>
    </LayoutDashboard>
  );
};

export default Dashboard;
