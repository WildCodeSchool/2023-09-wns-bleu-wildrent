import React, { useState } from 'react';
import LayoutDashboard from '../../../components/admin/LayoutDashboard';
import AdminCategoryTable from '../../../components/admin/category/AdminCategoryTable';
import { useAllCategoriesAdminQuery } from '../../../graphql/generated/schema';
import { IoIosAdd } from 'react-icons/io';
import AddCategoryModal from '@/components/admin/category/AddCategoryModal';

const CategoriesAdmin = () => {
  const { data, loading, error } = useAllCategoriesAdminQuery();

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
      <button className="btn btn-circle btn-accent" onClick={() => handleModal()}>
        <IoIosAdd size={50} />
      </button>
      {data?.allCategories && <AdminCategoryTable categories={data.allCategories as any} />}
      {<AddCategoryModal isOpen={isModalOpen} onClose={closeModal} />}
    </LayoutDashboard>
  );
};

export default CategoriesAdmin;
