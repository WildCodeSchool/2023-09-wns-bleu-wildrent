import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { useAllProductRefsQuery } from '../../graphql/generated/schema';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import { useAlert } from '@/components/hooks/AlertContext';
import { useDate } from '@/components/hooks/DatesContext';
import { useRouter } from 'next/router';

function ProductList() {
  const { showAlert } = useAlert();
  const { startDate, endDate } = useDate();
  const router = useRouter();
  const name = router.query.title as string;
  const { data, loading, error, refetch } = useAllProductRefsQuery({
    variables: { name: name || name, startDate, endDate },
    skip: !router.isReady,
  });
  useEffect(() => {
    if (router.isReady) {
      refetch();
    }
  }, [router.isReady, startDate, endDate, refetch, name]);
  if (loading) return <Loader />;
  if (error) return showAlert('error', error.message, 5000);
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
