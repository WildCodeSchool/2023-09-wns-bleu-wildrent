import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ProductCard from '../ProductCard';

const GET_PRODUCTS_BY_SUBCATEGORY_ID = gql`
  query GetProductsBySubCategoryId($subCategoryId: Int!) {
    productsBySubCategoryId(subCategoryId: $subCategoryId) {
      id
      name
      description
      priceHT
      image
    }
  }
`;

interface ProductListProps {
  subCategoryId: number;
}

const ProductList: React.FC<ProductListProps> = ({ subCategoryId }) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS_BY_SUBCATEGORY_ID, {
    variables: { subCategoryId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products: {error.message}</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.productsBySubCategoryId.map((product: any) => (
        <ProductCard key={product.id} productRef={product} link={`/products/${product.id}`} />
      ))}
    </div>
  );
};

export default ProductList;
