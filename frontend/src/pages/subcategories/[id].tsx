import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';

const GET_PRODUCTS_BY_SUBCATEGORY_ID = gql`
  query GetProductsBySubCategoryId($subCategoryId: Int!) {
    getProductsBySubCategoryId(subCategoryId: $subCategoryId) {
      id
      name
      description
      priceHT
      image
    }
  }
`;

const GET_SUBCATEGORY_NAME = gql`
  query GetSubCategoryName($subCategoryId: Int!) {
    subCategoryById(id: $subCategoryId) {
      name
      category {
        id
        name
      }
    }
  }
`;

const SubCategoryDetails = () => {
  const router = useRouter();
  const { id: subCategoryId } = router.query;

  const parsedSubCategoryId = parseInt(subCategoryId as string, 10);
  if (isNaN(parsedSubCategoryId)) {
    return <p className="text-center">Invalid sub-category ID</p>;
  }

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useQuery(GET_PRODUCTS_BY_SUBCATEGORY_ID, {
    variables: { subCategoryId: parsedSubCategoryId },
  });

  const {
    data: subCategoryData,
    loading: subCategoryLoading,
    error: subCategoryError,
  } = useQuery(GET_SUBCATEGORY_NAME, {
    variables: { subCategoryId: parsedSubCategoryId },
  });

  if (productsLoading || subCategoryLoading) return <Loader />;
  if (productsError || subCategoryError)
    return <p>Une erreur s'est produite : {productsError?.message || subCategoryError?.message}</p>;

  const products = productsData?.getProductsBySubCategoryId || [];
  const subCategory = subCategoryData?.subCategoryById || {
    name: 'Sous-catégorie',
    category: { id: '', name: 'Catégorie' },
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 my-8">
        <BreadcrumbComponent
          items={[
            { label: 'Catégories', href: '/' },
            { label: subCategory.category.name, href: `/categories/${subCategory.category.id}` },
            { label: subCategory.name, href: `/subcategories/${subCategoryId}`, current: true },
          ]}
        />
        <h1 className="text-3xl font-bold text-center my-6">Produits</h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} productRef={product} link={`/products/${product.id}`} />
            ))}
          </div>
        ) : (
          <p className="text-center">Aucun produit disponible pour le moment.</p>
        )}
      </div>
    </Layout>
  );
};

export default SubCategoryDetails;
