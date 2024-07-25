import React, { useState } from 'react';
import { useAlert } from '@/components/hooks/AlertContext';
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
import { BiPlusCircle } from 'react-icons/bi';

type ProductRef = GeneratedProductRef & {
  __typename?: string;
};

type AdminProductTableProps = {
  productRefs: ProductRef[];
};

const AdminProductTable: React.FC<AdminProductTableProps> = ({ productRefs }) => {
  const sortedProductRefs = [...productRefs].sort((a, b) => a.id - b.id);
  const [selectedProductRef, setSelectedProductRef] = useState<ProductRef | null>(null);
  const { showAlert } = useAlert();
  const [deleteProductRef] = useDeleteProductRefMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = async (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const { data } = await deleteProductRef({ variables: { productRefId: id } });
        if (data?.deleteProductRef.success) {
          showAlert('success', 'Product deleted successfully', 3000);
        } else {
          const message = data?.deleteProductRef?.message ?? 'An error occurred';
          showAlert('error', message, 3000);
        }
      } catch (e) {
        showAlert('error', 'Error deleting product', 3000);
        console.error(e);
      } finally {
        client.resetStore();
      }
    }
  };

  const handleEditClick = (productRef: ProductRef) => {
    setSelectedProductRef(productRef);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductRef(null);
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <table className="min-w-full rounded table-auto">
        <thead>
          <tr className="bg-secondary text-left text-white">
            <th className="px-4 py-2 text-center">ID</th>
            <th className="px-4 py-2 text-center">Cat</th>
            <th className="px-4 py-2 text-center">SubCat</th>
            <th className="px-4 py-2 text-center">Image</th>
            <th className="px-4 py-2 text-center">Name</th>
            <th className="px-4 py-2 text-center">Desciption</th>
            <th className="px-4 py-2 text-center">Price</th>
            <th className="px-4 py-2 text-center">Quantity</th>
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
                <img src={productRef?.image} width={50} height={30} alt={productRef.name} />
              </td>

              <td className="px-4 py-2 border-b text-center">
                <button>{productRef.name}</button>
              </td>

              <td className="px-4 py-2 border-b text-center">
                {productRef?.description?.substring(0, 90)}...
              </td>
              <td className="px-4 py-2 border-b text-center">{productRef.priceHT}€ HT</td>
              <td className="px-4 py-2 border-b text-center">{productRef.quantityAvailable}</td>
              <td className="px-4 py-2 space-x-3 border-b">
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded mb-3"
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
      <div className="w-full py-2 bg-secondary text-white flex justify-center items-center rounded-b mt-4">
        <button className="flex justify-center items-center" onClick={handleModal}>
          <BiPlusCircle size={40} />
        </button>
      </div>
      {selectedProductRef && (
        <UpdateProductRefModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          productRef={selectedProductRef}
        />
      )}
      <AddProductRefModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default AdminProductTable;
