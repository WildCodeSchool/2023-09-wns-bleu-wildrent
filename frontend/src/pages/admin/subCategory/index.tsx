import React, { useState } from 'react';
import LayoutDashboard from '../../../components/admin/LayoutDashboard';
import AdminSubCategoryTable from '../../../components/admin/subCategory/AdminSubCategoryTable';
import { useAllSubCategoriesAdminQuery } from '../../../graphql/generated/schema';
import { IoIosAdd } from 'react-icons/io';
import AddSubCategoryModal from '@/components/admin/subCategory/AddSubCategoryModal';

const SubCategoriesAdmin = () => {
  const { data, loading, error } = useAllSubCategoriesAdminQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <LayoutDashboard>
      <button className="btn btn-circle btn-accent" onClick={handleModal}>
        <IoIosAdd size={50} />
      </button>
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
