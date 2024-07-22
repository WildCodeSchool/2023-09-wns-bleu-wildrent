import React from 'react';
import ProductCard from '@/components/ProductCard';
import { useAllProductRefsQuery } from '../../graphql/generated/schema';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';

function ProductList() {
  const { data, loading, error } = useAllProductRefsQuery();
  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  const productRefs = data?.allProductRefs || [];
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-6 text-secondary">Our Products</h1>
        <p className="container m-4 p-4 text-justify">
          Discover our range of products, carefully selected to meet all your needs. From the latest
          tech gadgets to essential accessories, we have everything you need to stay ahead of the
          curve.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productRefs.map((prodRef) => (
            <ProductCard key={prodRef.id} productRef={prodRef} link={`/products/${prodRef.id}`} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProductList;
