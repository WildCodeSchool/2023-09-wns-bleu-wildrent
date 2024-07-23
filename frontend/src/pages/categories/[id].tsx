import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import SubCategoryCard from '../../components/SubCategory/SubCategoryCard';
import Loader from '../../components/Loader';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import {
  useGetCategoryNameQuery,
  useGetSubCategoriesByCategoryIdQuery,
} from '@/graphql/generated/schema';
import { useAlert } from '@/components/hooks/AlertContext';

const CategoryDetails = () => {
  const router = useRouter();
  const { id: categoryId } = router.query;
  const { showAlert } = useAlert();
  if (!categoryId) return null;

  const {
    data: subCategoriesData,
    loading: subCategoriesLoading,
    error: subCategoriesError,
  } = useGetSubCategoriesByCategoryIdQuery({
    variables: { categoryId: parseInt(categoryId as string, 10) },
  });

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useGetCategoryNameQuery({
    variables: { categoryId: parseInt(categoryId as string, 10) },
  });

  if (subCategoriesLoading || categoryLoading) return <Loader />;
  if (subCategoriesError) return showAlert('error', subCategoriesError?.message, 3000);
  if (categoryError) return showAlert('error', categoryError?.message, 3000);

  const subCategories = subCategoriesData?.subCategoriesByCategoryId || [];
  const category = categoryData?.categoryById || { name: 'Category', description: '' };

  return (
    <Layout>
      <div className="container mx-auto px-4 my-8">
        <BreadcrumbComponent
          items={[
            { label: 'Catégories', href: '/' },
            {
              label: category?.name || '',
              href: `/categories/${categoryId}`,
              current: true,
            },
          ]}
        />

        <p className="container m-4 p-4 text-justify">{categoryData?.categoryById?.description} </p>
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
