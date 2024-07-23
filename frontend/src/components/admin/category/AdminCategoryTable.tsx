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
  };

  return (
    <>
      <button className="btn btn-circle btn-accent" onClick={handleAddCategoryClick}>
        <IoIosAdd size={50} />
      </button>

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
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-400 text-left text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className={category.id % 2 === 0 ? 'bg-gray-200' : ''}>
              <td className="px-4 py-2 border-b">{category.id}</td>
              <td className="px-4 py-2 border-b">
                <Image src={category.image} width={50} height={30} alt={category.name} />
              </td>
              <td className="px-4 py-2 border-b">{category.name}</td>
              <td className="px-4 py-2 border-b">{category.description}</td>
              <td className="px-4 py-2 border-b">
                <button
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
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
    </>
  );
};

export default AdminCategoryTable;
