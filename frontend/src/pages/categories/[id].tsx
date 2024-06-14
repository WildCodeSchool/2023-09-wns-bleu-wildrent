import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Layout from '../../components/Layout';
import SubCategoryCard from '../../components/SubCategory/SubCategoryCard';
import Loader from '../../components/Loader';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';

const GET_SUBCATEGORIES_BY_CATEGORY_ID = gql`
  query GetSubCategoriesByCategoryId($categoryId: Int!) {
    subCategoriesByCategoryId(categoryId: $categoryId) {
      id
      name
      description
      image
    }
  }
`;

const GET_CATEGORY_NAME = gql`
  query GetCategoryName($categoryId: Int!) {
    categoryById(id: $categoryId) {
      name
    }
  }
`;

const CategoryDetails = () => {
  const router = useRouter();
  const { id: categoryId } = router.query;

  if (!categoryId) return null;

  const {
    data: subCategoriesData,
    loading: subCategoriesLoading,
    error: subCategoriesError,
  } = useQuery(GET_SUBCATEGORIES_BY_CATEGORY_ID, {
    variables: { categoryId: parseInt(categoryId as string, 10) },
  });

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_CATEGORY_NAME, {
    variables: { categoryId: parseInt(categoryId as string, 10) },
  });

  if (subCategoriesLoading || categoryLoading) return <Loader />;
  if (subCategoriesError || categoryError)
    return (
      <p>Une erreur s'est produite : {subCategoriesError?.message || categoryError?.message}</p>
    );

  const subCategories = subCategoriesData?.subCategoriesByCategoryId || [];
  const categoryName = categoryData?.categoryById?.name || 'Catégorie';

  return (
    <Layout>
      <div className="container mx-auto px-4 my-8">
        <BreadcrumbComponent
          items={[
            { label: 'Catégories', href: '/' },
            { label: categoryName, href: `/categories/${categoryId}`, current: true },
          ]}
        />
        <h1 className="text-3xl font-bold text-center my-6">Sous-catégories</h1>
        {subCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subCategories.map((subCategory: any) => (
              <SubCategoryCard key={subCategory.id} subcategory={subCategory} />
            ))}
          </div>
        ) : (
          <p className="text-center">Aucune sous-catégorie disponible pour le moment.</p>
        )}
      </div>
    </Layout>
  );
};

export default CategoryDetails;
