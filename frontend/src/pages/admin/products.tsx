// pages/admin/products.tsx
import React from 'react';
import LayoutDashboard from '../../components/admin/LayoutDashboard';
import AdminProductTable from '../../components/admin/AdminProductTable';
import { useAllProductRefsQuery } from '../../graphql/generated/schema';

const ProductsAdmin = () => {
  const { data, loading, error } = useAllProductRefsQuery();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <LayoutDashboard>
      {data?.allProductRefs && <AdminProductTable productRefs={data.allProductRefs as any} />}
    </LayoutDashboard>
  );
};

export default ProductsAdmin;
