// pages/admin/products.tsx
import React, { useState } from 'react';
import LayoutDashboard from '@/components/admin/LayoutDashboard';
import AdminProductTable from '@/components/admin/productRef/AdminProductTable';
import { useAllProductRefsAdminQuery } from '@/graphql/generated/schema';
import { IoIosAdd } from 'react-icons/io';
import AddProductRefModal from '@/components/admin/productRef/AddProductRefModal';
import Loader from '@/components/Loader';
import { useAlert } from '@/components/providers/AlertContext';

const ProductsAdmin = () => {
  const { data, loading, error } = useAllProductRefsAdminQuery();
  const { showAlert } = useAlert();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (loading) return <Loader />;

  if (error) return showAlert('error', error?.message, 3000);
  return (
    <LayoutDashboard>
      <button className="btn btn-circle btn-accent" onClick={() => handleModal()}>
        <IoIosAdd size={50} />
      </button>
      {data?.allProductRefs && <AdminProductTable productRefs={data.allProductRefs as any} />}
      {<AddProductRefModal isOpen={isModalOpen} onClose={closeModal} />}
    </LayoutDashboard>
  );
};

export default ProductsAdmin;
