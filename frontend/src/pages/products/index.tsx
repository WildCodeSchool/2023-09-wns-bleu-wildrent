import React from 'react';
import ProductCard from '@/components/ProductCard';
import { useAllProductRefsQuery } from '../../graphql/generated/schema';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';

function ProductList() {
  const { data, loading } = useAllProductRefsQuery();
  if (loading) return <Loader />;
  const productRefs = data?.allProductRefs || [];
  return (
    <Layout>
      <div className="mt-6 flex flex-wrap justify-between">
        {productRefs.map((prodRef) => (
          <ProductCard key={prodRef.id} productRef={prodRef} link={`/products/${prodRef.id}`} />
        ))}
      </div>
    </Layout>
  );
}

export default ProductList;
