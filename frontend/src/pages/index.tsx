import React from 'react';
import Layout from '../components/Layout';
import { useAllCategoriesQuery } from '../graphql/generated/schema';
import CategoryCard from '@/components/CategoryCard';

export default function Home() {
  const { data, loading, error } = useAllCategoriesQuery();
  if (loading) return 'Chargement...';
  if (error) return <p>Une erreur s'est produite : {error.message}</p>;
  const categories = data?.allCategories || [];
  return (
    <Layout>
      <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={{ ...cat, description: cat.description ?? '' }}
            link={`/categories/${cat.id}`}
          />
        ))}
      </div>
    </Layout>
  );
}
