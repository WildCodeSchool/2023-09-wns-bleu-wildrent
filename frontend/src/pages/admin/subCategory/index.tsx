import React, { useState } from 'react';
import LayoutDashboard from '../../../components/admin/LayoutDashboard';
import AdminSubCategoryTable from '../../../components/admin/subCategory/AdminSubCategoryTable';
import { useAllSubCategoriesAdminQuery } from '../../../graphql/generated/schema';
import { IoIosAdd } from 'react-icons/io';
import AddSubCategoryModal from '@/components/admin/subCategory/AddSubCategoryModal';
import Loader from '@/components/Loader';
import { useAlert } from '@/components/hooks/AlertContext';

const SubCategoriesAdmin = () => {
  const { data, loading, error } = useAllSubCategoriesAdminQuery();
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
      {data?.allSubCategories && (
        <AdminSubCategoryTable initialSubCategories={data.allSubCategories as any} />
      )}
      <AddSubCategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubCategoryAdded={(subCategory: any) => {}}
      />
    </LayoutDashboard>
  );
};

export default SubCategoriesAdmin;
