// pages/admin/categorie.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import LayoutDashboard from '../../components/admin/LayoutDashboard';
import AdminCategoryTable from '../../components/admin/AdminCategoryTable';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
      image
    }
  }
`;

const CategoriePage = () => {
  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <LayoutDashboard>
      {data?.categories && (
        <AdminCategoryTable categories={data.categories} refetchCategories={() => {}} />
      )}
    </LayoutDashboard>
  );
};

export default CategoriePage;
