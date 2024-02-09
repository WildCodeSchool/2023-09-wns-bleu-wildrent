// components/admin/AdminProductTable.tsx
import React from 'react';
import { ProductRef as GeneratedProductRef } from '../../graphql/generated/schema';

// Étendez le type généré pour inclure __typename, qui est habituellement renvoyé par les requêtes GraphQL.
type ProductRef = GeneratedProductRef & {
  __typename?: string;
};

type AdminProductTableProps = {
  productRefs: ProductRef[];
};

const AdminProductTable: React.FC<AdminProductTableProps> = ({ productRefs }) => {
  // Trier les articles par ordre croissant d'id avant de les rendre
  const sortedProductRefs = [...productRefs].sort((a, b) => a.id - b.id);
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-400 text-left text-white">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Nom</th>
          <th className="px-4 py-2">Prix HT</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedProductRefs.map((product) => (
          <tr key={product.id} className={product.id % 2 === 0 ? 'bg-gray-200' : ''}>
            <td className="px-4 py-2 border-b">{product.id}</td>
            <td className="px-4 py-2 border-b">{product.name}</td>
            <td className="px-4 py-2 border-b">{product.priceHT}</td>
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
  );
};

export default AdminProductTable;
