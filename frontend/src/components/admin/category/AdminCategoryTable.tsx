import React from 'react';
import { Category } from '@/types';
import Image from 'next/image';

type AdminCategoryTableProps = {
  categories: Category[];
};

const AdminCategoryTable: React.FC<AdminCategoryTableProps> = ({ categories }) => {
  // Trier les catégories par ordre croissant d'id avant de les rendre
  const sortedCategories = [...categories].sort((a, b) => a.id - b.id);

  return (
    <>
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
          {sortedCategories.map((category) => (
            <tr key={category.id} className={category.id % 2 === 0 ? 'bg-gray-200' : ''}>
              <td className="px-4 py-2 border-b">{category.id}</td>
              <td className="px-4 py-2 border-b">
                <Image src={category.image} width={50} height={30} alt={category.name} />
              </td>
              <td className="px-4 py-2 border-b">{category.name}</td>
              <td className="px-4 py-2 border-b">{category.description}</td>
              <td className="px-4 py-2 border-b">
                <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  Modifier
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
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

export default AdminCategoryTable;
