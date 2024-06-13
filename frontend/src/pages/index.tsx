import React from 'react';
import Layout from '../components/Layout';
import { useAllCategoriesQuery } from '../graphql/generated/schema';
import CategoryCard from '@/components/CategoryCard';
import Loader from '@/components/Loader';

export default function Home() {
  const { data, loading, error } = useAllCategoriesQuery();
  if (loading) return <Loader />;
  if (error) return <p>Une erreur s'est produite : {error.message}</p>;
  const categories = data?.allCategories || [];
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-6">Catégories</h1>
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
