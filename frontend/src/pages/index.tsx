import React from 'react';
import Layout from '../components/Layout';
import { useAllCategoriesQuery } from '../graphql/generated/schema';
import CategoryCard from '@/components/CategoryCard';
import Loader from '@/components/Loader';
import { useAlert } from '@/components/hooks/AlertContext';

export default function Home() {
  const { data, loading, error } = useAllCategoriesQuery();
  const { showAlert } = useAlert();
  if (loading) return <Loader />;
  if (error) return showAlert('error', error?.message, 3000);
  const categories = data?.allCategories || [];
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-6 text-secondary">
          Our products by category
        </h1>
        <p className="container m-4 p-4 text-justify">
          Dessert marshmallow marshmallow powder tootsie roll sweet roll sugar plum marzipan. Cake
          gummies sweet roll caramels oat cake. Tart marshmallow brownie apple pie oat cake.
          Chocolate cake cheesecake danish pastry tart. Chocolate cake icing danish pudding jelly
          beans lemon drops caramels bear claw chocolate cake.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={{ ...cat, description: cat.description ?? '' }}
              link={`/categories/${cat.id}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
