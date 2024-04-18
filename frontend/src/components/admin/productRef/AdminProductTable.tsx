import React, { useState } from 'react';
import {
  AddProductRefDocument,
  ProductRef as GeneratedProductRef,
  useDeleteProductRefMutation,
} from '../../../graphql/generated/schema';
import Link from 'next/link';
import Image from 'next/image';
import ProductRefModalDetails from './ProductRefModalDetails';
import AddProductRefModal from './AddProductRefModal';
import client from '@/graphql/client';

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

  const [deleteProductRef] = useDeleteProductRefMutation();
  const handleDelete = async (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        const { data } = await deleteProductRef({ variables: { productRefId: id } });
        if (data?.deleteProductRef.success) {
          alert('Produit supprimé avec succès !');
        } else {
          alert(data?.deleteProductRef.message);
        }
      } catch (e) {
        alert('Erreur lors de la suppression du produit');
        console.error(e);
      } finally {
        client.resetStore();
      }
    }
  };

  return (
    <>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-400 text-left text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Desciption</th>
            <th className="px-4 py-2">Prix</th>

            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProductRefs.map((product) => (
            <tr key={product.id} className={product.id % 2 === 0 ? 'bg-gray-200' : ''}>
              <td className="px-4 py-2 border-b">{product.id}</td>
              <td className="px-4 py-2 border-b">
                <Image src={product.image} width={50} height={30} alt={product.name} />
              </td>

              <td className="px-4 py-2 border-b">
                <button>{product.name}</button>
              </td>

              <td className="px-4 py-2 border-b">{product.description.substring(0, 90)}...</td>
              <td className="px-4 py-2 border-b">{product.priceHT}€ HT</td>
              <td className="px-4 py-2 border-b">
                <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  Modifier
                </button>
                <button
                  onClick={(e) => handleDelete(product.id, e)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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

export default AdminProductTable;
