// pages/admin/products.tsx
import React from 'react';
import LayoutDashboard from '../../../components/admin/LayoutDashboard';
import AdminProductTable from '../../../components/admin/AdminProductTable';
import { useAllProductRefsAdminQuery } from '../../../graphql/generated/schema';
import { IoIosAdd } from 'react-icons/io';

const ProductsAdmin = () => {
  const { data, loading, error } = useAllProductRefsAdminQuery();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;
  return (
    <LayoutDashboard>
      <button className="btn btn-circle btn-accent">
        <IoIosAdd size={50} />
      </button>
      {data?.allProductRefs && <AdminProductTable productRefs={data.allProductRefs as any} />}
    </LayoutDashboard>
  );
};

export default ProductsAdmin;
