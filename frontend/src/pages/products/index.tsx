import React from 'react';
import ProductCard from '@/components/ProductCard';
import { useAllProductRefsQuery } from '../../graphql/generated/schema';
import Layout from '@/components/Layout';

function ProductList() {
  const { data, loading } = useAllProductRefsQuery();
  if (loading) return 'Chargement...';
  const productRefs = data?.allProductRefs || [];
  console.log(productRefs);
  return (
    <Layout>
      <div className="flex flex-wrap justify-between">
        {productRefs.map((prodRef) => (
          <ProductCard key={prodRef.id} productRef={prodRef} link={`/products/${prodRef.id}`} />
        ))}
      </div>
    </Layout>
  );
}

export default ProductList;
