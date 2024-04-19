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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Découvrez nos catégories STAGING</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={{ ...cat, description: cat.description ?? '' }}
                link={`/categories/${cat.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
