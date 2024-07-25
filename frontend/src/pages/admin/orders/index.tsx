import React, { useState } from 'react';
import LayoutDashboard from '../../../components/admin/LayoutDashboard';
import AdminProductTable from '../../../components/admin/productRef/AdminProductTable';
import { useAllOrdersQuery } from '../../../graphql/generated/schema';
import { IoIosAdd } from 'react-icons/io';
import AddProductRefModal from '@/components/admin/productRef/AddProductRefModal';
import Loader from '@/components/Loader';
import AdminOrdersTable from '@/components/admin/orders/AdminOrdersTable';
import { useAlert } from '@/components/hooks/AlertContext';

const OrdersAdmin = () => {
  const { data, loading, error } = useAllOrdersQuery();
  const { showAlert } = useAlert();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (loading) return <Loader />;
  if (error) return showAlert('error', error.message, 3000);

  return (
    <LayoutDashboard>
      <div className="text-center p-4">
        <h2>Orders Management</h2>
      </div>

      {data?.allOrders && <AdminOrdersTable orders={data.allOrders as any} />}
    </LayoutDashboard>
  );
};

export default OrdersAdmin;
