// pages/admin/products.tsx
import React, { useState } from 'react';
import LayoutDashboard from '@/components/admin/LayoutDashboard';
import AdminProductTable from '@/components/admin/productRef/AdminProductTable';
import { useAllProductRefsAdminQuery } from '@/graphql/generated/schema';
import Loader from '@/components/Loader';
import { useAlert } from '@/components/hooks/AlertContext';

const ProductsAdmin = () => {
  const { data, loading, error } = useAllProductRefsAdminQuery();
  const { showAlert } = useAlert();

  if (loading) return <Loader />;

  if (error) return showAlert('error', error?.message, 3000);
  return (
    <LayoutDashboard>
      <div className="text-center p-4">
        <h2>Products Management</h2>
      </div>
      {data?.allProductRefs && <AdminProductTable productRefs={data.allProductRefs as any} />}
    </LayoutDashboard>
  );
};

export default ProductsAdmin;
