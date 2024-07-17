import React, { useState } from 'react';
import { useAlert } from '@/components/providers/AlertContext';
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
import UpdateProductRefModal from './UpdateProductRefModal';
import { IoIosAdd } from 'react-icons/io';

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
  const [selectedProductRef, setSelectedProductRef] = useState<ProductRef | null>(null);
  const { showAlert } = useAlert();
  const [deleteProductRef] = useDeleteProductRefMutation();
  const handleDelete = async (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        const { data } = await deleteProductRef({ variables: { productRefId: id } });
        if (data?.deleteProductRef.success) {
          showAlert('success', 'Produit supprimé avec succès !', 3000);
        } else {
          const message = data?.deleteProductRef?.message ?? 'An error occurred';
          showAlert('error', message, 3000);
        }
      } catch (e) {
        showAlert('error', 'Erreur lors de la suppression du produit', 3000);
        console.error(e);
      } finally {
        client.resetStore();
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditClick = (productRef: ProductRef) => {
    setSelectedProductRef(productRef);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductRef(null);
  };

  return (
    <>
      {selectedProductRef && (
        <UpdateProductRefModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          productRef={selectedProductRef}
          // onCategoryUpdated={handleCategoryUpdated}
        />
      )}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-400 text-left text-white">
            <th className="px-4 py-2 text-center">ID</th>
            <th className="px-4 py-2 text-center">Cat</th>
            <th className="px-4 py-2 text-center">SubCat</th>
            <th className="px-4 py-2 text-center">Image</th>
            <th className="px-4 py-2 text-center">Nom</th>
            <th className="px-4 py-2 text-center">Desciption</th>
            <th className="px-4 py-2 text-center">Prix</th>
            <th className="px-4 py-2 text-center">Quantité</th>

            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProductRefs.map((productRef) => (
            <tr key={productRef.id} className={productRef.id % 2 === 0 ? 'bg-gray-200' : ''}>
              <td className="px-4 py-2 border-b text-center">{productRef.id}</td>

              <td className="px-4 py-2 border-b text-center">
                {productRef.subCategory?.category?.name}
              </td>
              <td className="px-4 py-2 border-b text-center">{productRef.subCategory?.name}</td>
              <td className="px-4 py-2 border-b text-center">
                <Image src={productRef?.image} width={50} height={30} alt={productRef.name} />
              </td>

              <td className="px-4 py-2 border-b text-center">
                <button>{productRef.name}</button>
              </td>

              <td className="px-4 py-2 border-b text-center">
                {productRef?.description?.substring(0, 90)}...
              </td>
              <td className="px-4 py-2 border-b text-center">{productRef.priceHT}€ HT</td>
              <td className="px-4 py-2 border-b text-center">{productRef.quantity}</td>
              <td className="px-4 py-2 border-b text-center">
                <button
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-3"
                  onClick={() => handleEditClick(productRef)}
                >
                  Edit
                </button>

                <button
                  onClick={(e) => handleDelete(productRef.id, e)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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

export default AdminProductTable;
