import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Category } from '@/types';
import Image from 'next/image';
import UpdateCategoryModal from '@/components/admin/category/UpdateCategoryModal';
import AddCategoryModal from '@/components/admin/category/AddCategoryModal';
import client from '@/graphql/client';
import { IoIosAdd } from 'react-icons/io';
import { useAlert } from '@/components/hooks/AlertContext';
import { BiPlusCircle } from 'react-icons/bi';

// Définition de la mutation GraphQL pour la suppression
const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;

type AdminCategoryTableProps = {
  initialCategories: Category[];
};

const AdminCategoryTable: React.FC<AdminCategoryTableProps> = ({ initialCategories }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { showAlert } = useAlert();
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION);

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedCategory(null);
  };

  const handleAddCategoryClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCategoryAdded = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
    handleCloseModal();
  };

  const handleCategoryUpdated = (updatedCategory: Category) => {
    const updatedCategories = categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category,
    );
    setCategories(updatedCategories);
    handleCloseModal();
  };

  const handleDeleteCategoryClick = async (categoryId: number) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const { data } = await deleteCategory({
          variables: { id: categoryId },
        });
        if (data.deleteCategory) {
          setCategories(categories.filter((category) => category.id !== categoryId));
          showAlert('success', 'Category successfully deleted', 3000);

          client.resetStore();
        } else {
          showAlert('error', 'Failed to delete category', 3000);
        }
      } catch (error) {
        console.error('Error deleting category', error);
        showAlert('error', 'Error deleting category', 3000);
      }
    }
  };

  return (
    <>
      {isAddModalOpen && (
        <AddCategoryModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onCategoryAdded={handleCategoryAdded}
        />
      )}
      {selectedCategory && (
        <UpdateCategoryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          category={selectedCategory}
          onCategoryUpdated={handleCategoryUpdated}
        />
      )}
      <table className="min-w-full rounded table-auto">
        <thead>
          <tr className="bg-secondary text-left text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className={category.id % 2 === 0 ? 'bg-gray-200' : ''}>
              <td className="px-4 py-2 border-b">{category.id}</td>
              <td className="px-4 py-2 border-b">
                <img src={category.image} width={50} height={50} alt={category.name} />
              </td>
              <td className="px-4 py-2 border-b">{category.name}</td>
              <td className="px-4 py-2 border-b">{category.description}</td>
              <td className="px-4 py-2 border-b space-x-3">
                <button
                  className="mr-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteCategoryClick(category.id)}
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
        onClick={handleAddCategoryClick}
      >
        <BiPlusCircle size={40} />
      </button>
    </>
  );
};

export default AdminCategoryTable;
