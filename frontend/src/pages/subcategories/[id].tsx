import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import {
  useGetProductsBySubCategoryIdQuery,
  useGetSubCategoryNameQuery,
} from '@/graphql/generated/schema';
import { useAlert } from '@/components/providers/AlertContext';

const SubCategoryDetails = () => {
  const router = useRouter();
  const { id: subCategoryId } = router.query;
  const { showAlert } = useAlert();
  const parsedSubCategoryId = parseInt(subCategoryId as string, 10);
  if (isNaN(parsedSubCategoryId)) {
    return <p className="text-center">Invalid sub-category ID</p>;
  }

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useGetProductsBySubCategoryIdQuery({
    variables: { subCategoryId: parsedSubCategoryId },
  });

  const {
    data: subCategoryData,
    loading: subCategoryLoading,
    error: subCategoryError,
  } = useGetSubCategoryNameQuery({
    variables: { subCategoryId: parsedSubCategoryId },
  });
  console.log('🚀 ~ SubCategoryDetails ~ subCategoryData:', subCategoryData);

  if (productsLoading || subCategoryLoading) return <Loader />;
  if (productsError) return showAlert('error', productsError?.message, 3000);
  if (subCategoryError) return showAlert('error', subCategoryError?.message, 3000);

  const products = productsData?.getProductsBySubCategoryId || [];
  const subCategory = subCategoryData?.subCategoryById || {
    name: 'Sub-category',
    description: '',
    category: { id: '', name: 'Category' },
  };
  return (
    <Layout>
      <div className="container mx-auto px-4 my-8">
        <BreadcrumbComponent
          items={[
            { label: 'Sub-Categories', href: '/' },
            {
              label: subCategory?.category?.name || 'Category',
              href: `/categories/${subCategory?.category?.id}`,
            },
            { label: subCategory.name, href: `/subcategories/${subCategoryId}`, current: true },
          ]}
        />
        <p className="container m-4 p-4 text-justify">{subCategory?.description}</p>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} productRef={product} link={`/products/${product.id}`} />
            ))}
          </div>
        ) : (
          <p className="text-center">No products available at the moment.</p>
        )}
      </div>
    </Layout>
  );
};
export default SubCategoryDetails;
