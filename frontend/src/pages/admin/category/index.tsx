import React, { useState } from 'react';
import LayoutDashboard from '../../../components/admin/LayoutDashboard';
import AdminCategoryTable from '../../../components/admin/category/AdminCategoryTable';
import { useAllCategoriesAdminQuery } from '../../../graphql/generated/schema';
import { IoIosAdd } from 'react-icons/io';
import AddCategoryModal from '@/components/admin/category/AddCategoryModal';
import Loader from '@/components/Loader';
import { useAlert } from '@/components/hooks/AlertContext';

const CategoriesAdmin = () => {
  const { data, loading, error } = useAllCategoriesAdminQuery();
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
      <div className="text-center p-4">
        <h2>Categories Management</h2>
      </div>
      {data?.allCategories && <AdminCategoryTable initialCategories={data.allCategories as any} />}
    </LayoutDashboard>
  );
};

export default CategoriesAdmin;
