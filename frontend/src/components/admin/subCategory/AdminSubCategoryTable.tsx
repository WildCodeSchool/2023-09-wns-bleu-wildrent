import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { SubCategory } from '@/types';
import Image from 'next/image';
import UpdateSubCategoryModal from '@/components/admin/subCategory/UpdateSubCategoryModal';
import AddSubCategoryModal from '@/components/admin/subCategory/AddSubCategoryModal';
import client from '@/graphql/client';
import { IoIosAdd } from 'react-icons/io';

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

  const handleDeleteSubCategoryClick = async (subCategoryId: number) => {
    try {
      const { data } = await deleteSubCategory({
        variables: { id: subCategoryId },
      });
      if (data.deleteSubCategory) {
        setSubCategories(subCategories.filter((subCategory) => subCategory.id !== subCategoryId));
        alert('Sous-catégorie supprimée avec succès');
        client.resetStore();
      } else {
        alert('Échec de la suppression de la sous-catégorie');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la sous-catégorie', error);
      alert(`Erreur lors de la suppression de la sous-catégorie : ${(error as Error).message}`);
    }
  };

  return (
    <>
      <button className="btn btn-circle btn-accent" onClick={handleAddSubCategoryClick}>
        <IoIosAdd size={50} />
      </button>

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
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-400 text-left text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Catégorie</th>
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
              <td className="px-4 py-2 border-b">
                <button
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleEditClick(subCategory)}
                >
                  Modifier
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteSubCategoryClick(subCategory.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminSubCategoryTable;
