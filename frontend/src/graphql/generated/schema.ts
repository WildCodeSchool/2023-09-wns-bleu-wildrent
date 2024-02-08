import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  description: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
  subCategories: Array<SubCategory>;
};

export type ProductRef = {
  __typename?: 'ProductRef';
  description: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
  priceHT: Scalars['Float'];
  subCategory: SubCategory;
};

export type Query = {
  __typename?: 'Query';
  allProductRefs: Array<ProductRef>;
  categories: Array<Category>;
  categoryById: Category;
  productRefById: ProductRef;
};


export type QueryCategoryByIdArgs = {
  categoryId: Scalars['Int'];
};


export type QueryProductRefByIdArgs = {
  productRefId: Scalars['Int'];
};

export type SubCategory = {
  __typename?: 'SubCategory';
  category: Category;
  description: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
  productRefs: ProductRef;
};

export type AllProductRefsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProductRefsQuery = { __typename?: 'Query', allProductRefs: Array<{ __typename?: 'ProductRef', id: number, name: string, image: string, priceHT: number }> };


export const AllProductRefsDocument = gql`
    query AllProductRefs {
  allProductRefs {
    id
    name
    image
    priceHT
  }
}
    `;

/**
 * __useAllProductRefsQuery__
 *
 * To run a query within a React component, call `useAllProductRefsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProductRefsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProductRefsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProductRefsQuery(baseOptions?: Apollo.QueryHookOptions<AllProductRefsQuery, AllProductRefsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllProductRefsQuery, AllProductRefsQueryVariables>(AllProductRefsDocument, options);
      }
export function useAllProductRefsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllProductRefsQuery, AllProductRefsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllProductRefsQuery, AllProductRefsQueryVariables>(AllProductRefsDocument, options);
        }
export type AllProductRefsQueryHookResult = ReturnType<typeof useAllProductRefsQuery>;
export type AllProductRefsLazyQueryHookResult = ReturnType<typeof useAllProductRefsLazyQuery>;
export type AllProductRefsQueryResult = Apollo.QueryResult<AllProductRefsQuery, AllProductRefsQueryVariables>;