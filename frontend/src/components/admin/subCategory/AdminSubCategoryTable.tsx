import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { SubCategory } from '@/types';
import Image from 'next/image';
import UpdateSubCategoryModal from '@/components/admin/subCategory/UpdateSubCategoryModal';
import AddSubCategoryModal from '@/components/admin/subCategory/AddSubCategoryModal';
import client from '@/graphql/client';
import { IoIosAdd } from 'react-icons/io';
import { useAlert } from '@/components/hooks/AlertContext';
import { BiPlusCircle } from 'react-icons/bi';

const DELETE_SUBCATEGORY_MUTATION = gql`
  mutation DeleteSubCategory($id: Int!) {
    deleteSubCategory(id: $id)
  }
`;

type AdminSubCategoryTableProps = {
  initialSubCategories: SubCategory[];
};

const AdminSubCategoryTable: React.FC<AdminSubCategoryTableProps> = ({ initialSubCategories }) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>(initialSubCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [deleteSubCategory] = useMutation(DELETE_SUBCATEGORY_MUTATION);
  const { showAlert } = useAlert();
  const handleEditClick = (subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedSubCategory(null);
  };

  const handleAddSubCategoryClick = () => {
    setIsAddModalOpen(true);
  };

  const handleSubCategoryAdded = (newSubCategory: SubCategory) => {
    setSubCategories([...subCategories, newSubCategory]);
    handleCloseModal();
  };

  const handleSubCategoryUpdated = (updatedSubCategory: SubCategory) => {
    const updatedSubCategories = subCategories.map((subCategory) =>
      subCategory.id === updatedSubCategory.id ? updatedSubCategory : subCategory,
    );
    setSubCategories(updatedSubCategories);
    handleCloseModal();
  };

  const handleDeleteSubCategoryClick = async (
    subCategoryId: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const { data } = await deleteSubCategory({
          variables: { id: subCategoryId },
        });
        if (data.deleteSubCategory) {
          setSubCategories(subCategories.filter((subCategory) => subCategory.id !== subCategoryId));
          showAlert('success', 'Subcategory removed successfully', 3000);

          client.resetStore();
        } else {
          showAlert('error', 'Failed to delete subcategory', 3000);
        }
      } catch (error) {
        showAlert('error', 'Error deleted subcategory', 3000);
        console.error('Error deleting subcategory', error);
      }
    }
  };

  return (
    <>
      {isAddModalOpen && (
        <AddSubCategoryModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onSubCategoryAdded={handleSubCategoryAdded}
        />
      )}
      {selectedSubCategory && (
        <UpdateSubCategoryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          subCategory={selectedSubCategory}
          onSubCategoryUpdated={handleSubCategoryUpdated}
        />
      )}
      <table className="min-w-full rounded table-auto">
        <thead>
          <tr className="bg-secondary text-left text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((subCategory) => (
            <tr key={subCategory.id} className={subCategory.id % 2 === 0 ? 'bg-gray-200' : ''}>
              <td className="px-4 py-2 border-b">{subCategory.id}</td>
              <td className="px-4 py-2 border-b">
                {subCategory.image ? (
                  <Image src={subCategory.image} width={50} height={30} alt={subCategory.name} />
                ) : (
                  "Pas d'image"
                )}
              </td>
              <td className="px-4 py-2 border-b">{subCategory.name}</td>
              <td className="px-4 py-2 border-b">
                {subCategory.description ?? 'Pas de description'}
              </td>
              <td className="px-4 py-2 border-b">
                {subCategory.category ? subCategory.category.name : 'Non spécifié'}
              </td>
              <td className="px-4 py-2 space-x-3 border-b">
                <button
                  className="mr-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleEditClick(subCategory)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={(e) => handleDeleteSubCategoryClick(subCategory.id, e)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="w-full py-2 bg-secondary text-white flex justify-center items-center rounded-b"
        onClick={handleAddSubCategoryClick}
      >
        <BiPlusCircle size={40} />
      </button>
    </>
  );
};

export default AdminSubCategoryTable;
