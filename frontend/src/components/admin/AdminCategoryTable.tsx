import React, { useState } from 'react';
import {
  Category,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
} from '@/graphql/generated/schema';
import CategoryEditModal from './CategoryEditModal';
import { gql, useApolloClient } from '@apollo/client';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
      image
    }
  }
`;

type AdminCategoryTableProps = {
  categories: Category[];
  refetchCategories: () => void;
};

const AdminCategoryTable: React.FC<AdminCategoryTableProps> = ({
  categories,
  refetchCategories,
}) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const client = useApolloClient();

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const openModalForEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const openModalForAdd = () => {
    setEditingCategory({ id: 0, name: '', description: '', image: '' } as Category);
    setIsModalOpen(true);
  };

  const handleModalSave = async (category: Category) => {
    try {
      if (category.id === 0) {
        await addCategory({
          variables: category,
          refetchQueries: [{ query: GET_CATEGORIES }],
        });
      } else {
        await updateCategory({
          variables: category,
          refetchQueries: [{ query: GET_CATEGORIES }],
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la catégorie:', error);
    }
  };

  const handleDeleteClick = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await deleteCategory({
          variables: { id },
          update(cache) {
            const normalizedId = cache.identify({ id, __typename: 'Category' });
            cache.evict({ id: normalizedId });
            cache.gc();
          },
        });
        refetchCategories(); // Optional: refetch as a fallback
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModalForAdd} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Ajouter une catégorie
      </button>
      <table className="min-w-full table-auto shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {category.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <img src={category.image} alt="category" className="h-10 w-10 rounded-full" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => openModalForEdit(category)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteClick(category.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <CategoryEditModal
          category={editingCategory as Category}
          onSave={handleModalSave}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default AdminCategoryTable;
