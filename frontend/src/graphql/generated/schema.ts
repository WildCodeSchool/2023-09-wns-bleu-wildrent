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

export type InputLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type InputRegister = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Message;
  logout: Message;
  register: Message;
};


export type MutationLoginArgs = {
  user: InputLogin;
};


export type MutationRegisterArgs = {
  newUser: InputRegister;
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

export type ProductRefByIdQueryVariables = Exact<{
  productRefId: Scalars['Int'];
}>;


export type ProductRefByIdQuery = { __typename?: 'Query', productRefById: { __typename?: 'ProductRef', id: number, name: string, description: string, image: string, priceHT: number } };

export type LoginMutationVariables = Exact<{
  user: InputLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Message', success: boolean, message: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Message', success: boolean, message: string } };

export type RegisterMutationVariables = Exact<{
  newUser: InputRegister;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Message', success: boolean, message: string } };


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
export const ProductRefByIdDocument = gql`
    query ProductRefById($productRefId: Int!) {
  productRefById(productRefId: $productRefId) {
    id
    name
    description
    image
    priceHT
  }
}
    `;

/**
 * __useProductRefByIdQuery__
 *
 * To run a query within a React component, call `useProductRefByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductRefByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductRefByIdQuery({
 *   variables: {
 *      productRefId: // value for 'productRefId'
 *   },
 * });
 */
export function useProductRefByIdQuery(baseOptions: Apollo.QueryHookOptions<ProductRefByIdQuery, ProductRefByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductRefByIdQuery, ProductRefByIdQueryVariables>(ProductRefByIdDocument, options);
      }
export function useProductRefByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductRefByIdQuery, ProductRefByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductRefByIdQuery, ProductRefByIdQueryVariables>(ProductRefByIdDocument, options);
        }
export type ProductRefByIdQueryHookResult = ReturnType<typeof useProductRefByIdQuery>;
export type ProductRefByIdLazyQueryHookResult = ReturnType<typeof useProductRefByIdLazyQuery>;
export type ProductRefByIdQueryResult = Apollo.QueryResult<ProductRefByIdQuery, ProductRefByIdQueryVariables>;
export const LoginDocument = gql`
    mutation Login($user: InputLogin!) {
  login(user: $user) {
    success
    message
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout {
    success
    message
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation register($newUser: InputRegister!) {
  register(newUser: $newUser) {
    success
    message
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      newUser: // value for 'newUser'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;