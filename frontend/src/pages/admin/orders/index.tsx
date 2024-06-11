import React, { useState } from 'react';
import LayoutDashboard from '../../../components/admin/LayoutDashboard';
import AdminProductTable from '../../../components/admin/productRef/AdminProductTable';
import { useAllOrdersQuery } from '../../../graphql/generated/schema';
import { IoIosAdd } from 'react-icons/io';
import AddProductRefModal from '@/components/admin/productRef/AddProductRefModal';
import Loader from '@/components/Loader';
import AdminOrdersTable from '@/components/admin/orders/AdminOrdersTable';

const OrdersAdmin = () => {
  const { data, loading, error } = useAllOrdersQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (loading) return <Loader />;
  if (error) return <p>Erreur: {error.message}</p>;
  console.log('data', data);
  return (
    <LayoutDashboard>
      {/* <button className="btn btn-circle btn-accent" onClick={() => handleModal()}>
        <IoIosAdd size={50} />
      </button> */}
      {data?.allOrders && <AdminOrdersTable orders={data.allOrders as any} />}
      {/* {<AddProductRefModal isOpen={isModalOpen} onClose={closeModal} />} */}
    </LayoutDashboard>
  );
};

export default OrdersAdmin;
