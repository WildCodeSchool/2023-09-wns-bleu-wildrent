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

/** The availability status of a product item */
export enum Availability {
  Available = 'Available',
  Unavailable = 'Unavailable'
}

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
  subCategories: Array<SubCategory>;
};

export type InputLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type InputProductRef = {
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  priceHT: Scalars['Float'];
  quantity: Scalars['Int'];
  subCategoryId: ObjectId;
};

export type InputRegister = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
};

export type InputUpdate = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  cp?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  isAdmin?: Maybe<Scalars['Boolean']>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: Category;
  addProductRef: Message;
  deleteCategory: Scalars['Boolean'];
  deleteProductItem: Message;
  deleteProductRef: Message;
  deleteUser: Message;
  login: Message;
  logout: Message;
  register: Message;
  updateCategory: Category;
  updateProductRef: Message;
  updateUser: Message;
};


export type MutationAddCategoryArgs = {
  description?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddProductRefArgs = {
  data: InputProductRef;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProductItemArgs = {
  productItemId: Scalars['Int'];
};


export type MutationDeleteProductRefArgs = {
  productRefId: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  user: InputLogin;
};


export type MutationRegisterArgs = {
  newUser: InputRegister;
};


export type MutationUpdateCategoryArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateProductRefArgs = {
  data: UpdateProductRef;
  productRefId: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  updatedUser: InputUpdate;
};

export type ObjectId = {
  id: Scalars['Int'];
};

export type ProductItem = {
  __typename?: 'ProductItem';
  availability: Availability;
  id: Scalars['Int'];
  productRef: ProductRef;
};

export type ProductRef = {
  __typename?: 'ProductRef';
  description: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
  priceHT: Scalars['Float'];
  quantity: Scalars['Int'];
  quantityAvailable: Scalars['Int'];
  subCategory: SubCategory;
};

export type Profile = {
  __typename?: 'Profile';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  cp?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastname?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  role: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allCategories: Array<Category>;
  allProductItems: Array<ProductItem>;
  allProductRefs: Array<ProductRef>;
  allSubCategories: Array<SubCategory>;
  allUsers: Array<User>;
  categoryById?: Maybe<Category>;
  checkIfLoggedIn: Message;
  getProfile: Profile;
  productRefById: ProductRef;
  subCategoryById: SubCategory;
};


export type QueryCategoryByIdArgs = {
  id: Scalars['Int'];
};


export type QueryProductRefByIdArgs = {
  productRefId: Scalars['Int'];
};


export type QuerySubCategoryByIdArgs = {
  subCategoryId: Scalars['Int'];
};

export type SubCategory = {
  __typename?: 'SubCategory';
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
  productRefs: Array<ProductRef>;
};

export type UpdateProductRef = {
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  priceHT?: InputMaybe<Scalars['Float']>;
  quantity?: InputMaybe<Scalars['Int']>;
  subCategory?: InputMaybe<ObjectId>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  cp?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastname?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  role: Scalars['String'];
};

export type AllProductRefsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProductRefsQuery = { __typename?: 'Query', allProductRefs: Array<{ __typename?: 'ProductRef', id: number, name: string, image: string, priceHT: number }> };

export type AllProductRefsAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProductRefsAdminQuery = { __typename?: 'Query', allProductRefs: Array<{ __typename?: 'ProductRef', id: number, name: string, description: string, image: string, priceHT: number, quantity: number, quantityAvailable: number, subCategory: { __typename?: 'SubCategory', name: string, category?: { __typename?: 'Category', name: string } | null } }> };

export type ProductRefByIdQueryVariables = Exact<{
  productRefId: Scalars['Int'];
}>;


export type ProductRefByIdQuery = { __typename?: 'Query', productRefById: { __typename?: 'ProductRef', id: number, name: string, description: string, image: string, priceHT: number, quantity: number, quantityAvailable: number } };

export type CheckIfLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckIfLoggedInQuery = { __typename?: 'Query', checkIfLoggedIn: { __typename?: 'Message', isAdmin?: boolean | null, message: string, success: boolean } };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'Profile', id: number, firstname?: string | null, lastname?: string | null, role: string, email: string, password?: string | null, address?: string | null, city?: string | null, cp?: string | null, picture?: string | null } };

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = { __typename?: 'Query', allCategories: Array<{ __typename?: 'Category', id: number, name: string, description?: string | null, image: string }> };

export type AllCategoriesAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesAdminQuery = { __typename?: 'Query', allCategories: Array<{ __typename?: 'Category', id: number, name: string, description?: string | null, image: string }> };

export type AllSubCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSubCategoriesQuery = { __typename?: 'Query', allSubCategories: Array<{ __typename?: 'SubCategory', id: number, name: string }> };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'Message', success: boolean, message: string } };

export type UpdateUserMutationVariables = Exact<{
  updatedUser: InputUpdate;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'Message', success: boolean, message: string } };

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

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: boolean };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  image: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: number, name: string, description?: string | null, image: string } };

export type AddCategoryMutationVariables = Exact<{
  name: Scalars['String'];
  image: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'Category', id: number, name: string, description?: string | null, image: string } };

export type AddProductRefMutationVariables = Exact<{
  data: InputProductRef;
}>;


export type AddProductRefMutation = { __typename?: 'Mutation', addProductRef: { __typename?: 'Message', success: boolean, message: string } };

export type DeleteProductRefMutationVariables = Exact<{
  productRefId: Scalars['Int'];
}>;


export type DeleteProductRefMutation = { __typename?: 'Mutation', deleteProductRef: { __typename?: 'Message', success: boolean, message: string } };

export type UpdateProductRefMutationVariables = Exact<{
  data: UpdateProductRef;
  productRefId: Scalars['Int'];
}>;


export type UpdateProductRefMutation = { __typename?: 'Mutation', updateProductRef: { __typename?: 'Message', success: boolean, message: string } };


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
export const AllProductRefsAdminDocument = gql`
    query AllProductRefsAdmin {
  allProductRefs {
    id
    name
    description
    image
    priceHT
    subCategory {
      name
      category {
        name
      }
    }
    quantity
    quantityAvailable
  }
}
    `;

/**
 * __useAllProductRefsAdminQuery__
 *
 * To run a query within a React component, call `useAllProductRefsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProductRefsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProductRefsAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProductRefsAdminQuery(baseOptions?: Apollo.QueryHookOptions<AllProductRefsAdminQuery, AllProductRefsAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllProductRefsAdminQuery, AllProductRefsAdminQueryVariables>(AllProductRefsAdminDocument, options);
      }
export function useAllProductRefsAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllProductRefsAdminQuery, AllProductRefsAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllProductRefsAdminQuery, AllProductRefsAdminQueryVariables>(AllProductRefsAdminDocument, options);
        }
export type AllProductRefsAdminQueryHookResult = ReturnType<typeof useAllProductRefsAdminQuery>;
export type AllProductRefsAdminLazyQueryHookResult = ReturnType<typeof useAllProductRefsAdminLazyQuery>;
export type AllProductRefsAdminQueryResult = Apollo.QueryResult<AllProductRefsAdminQuery, AllProductRefsAdminQueryVariables>;
export const ProductRefByIdDocument = gql`
    query ProductRefById($productRefId: Int!) {
  productRefById(productRefId: $productRefId) {
    id
    name
    description
    image
    priceHT
    quantity
    quantityAvailable
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
export const CheckIfLoggedInDocument = gql`
    query CheckIfLoggedIn {
  checkIfLoggedIn {
    isAdmin
    message
    success
  }
}
    `;

/**
 * __useCheckIfLoggedInQuery__
 *
 * To run a query within a React component, call `useCheckIfLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckIfLoggedInQuery(baseOptions?: Apollo.QueryHookOptions<CheckIfLoggedInQuery, CheckIfLoggedInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfLoggedInQuery, CheckIfLoggedInQueryVariables>(CheckIfLoggedInDocument, options);
      }
export function useCheckIfLoggedInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfLoggedInQuery, CheckIfLoggedInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfLoggedInQuery, CheckIfLoggedInQueryVariables>(CheckIfLoggedInDocument, options);
        }
export type CheckIfLoggedInQueryHookResult = ReturnType<typeof useCheckIfLoggedInQuery>;
export type CheckIfLoggedInLazyQueryHookResult = ReturnType<typeof useCheckIfLoggedInLazyQuery>;
export type CheckIfLoggedInQueryResult = Apollo.QueryResult<CheckIfLoggedInQuery, CheckIfLoggedInQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile {
  getProfile {
    id
    firstname
    lastname
    role
    email
    password
    address
    city
    cp
    picture
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const AllCategoriesDocument = gql`
    query AllCategories {
  allCategories {
    id
    name
    description
    image
  }
}
    `;

/**
 * __useAllCategoriesQuery__
 *
 * To run a query within a React component, call `useAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
      }
export function useAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
        }
export type AllCategoriesQueryHookResult = ReturnType<typeof useAllCategoriesQuery>;
export type AllCategoriesLazyQueryHookResult = ReturnType<typeof useAllCategoriesLazyQuery>;
export type AllCategoriesQueryResult = Apollo.QueryResult<AllCategoriesQuery, AllCategoriesQueryVariables>;
export const AllCategoriesAdminDocument = gql`
    query AllCategoriesAdmin {
  allCategories {
    id
    name
    description
    image
  }
}
    `;

/**
 * __useAllCategoriesAdminQuery__
 *
 * To run a query within a React component, call `useAllCategoriesAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoriesAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoriesAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoriesAdminQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesAdminQuery, AllCategoriesAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCategoriesAdminQuery, AllCategoriesAdminQueryVariables>(AllCategoriesAdminDocument, options);
      }
export function useAllCategoriesAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesAdminQuery, AllCategoriesAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCategoriesAdminQuery, AllCategoriesAdminQueryVariables>(AllCategoriesAdminDocument, options);
        }
export type AllCategoriesAdminQueryHookResult = ReturnType<typeof useAllCategoriesAdminQuery>;
export type AllCategoriesAdminLazyQueryHookResult = ReturnType<typeof useAllCategoriesAdminLazyQuery>;
export type AllCategoriesAdminQueryResult = Apollo.QueryResult<AllCategoriesAdminQuery, AllCategoriesAdminQueryVariables>;
export const AllSubCategoriesDocument = gql`
    query AllSubCategories {
  allSubCategories {
    id
    name
  }
}
    `;

/**
 * __useAllSubCategoriesQuery__
 *
 * To run a query within a React component, call `useAllSubCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSubCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSubCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSubCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AllSubCategoriesQuery, AllSubCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSubCategoriesQuery, AllSubCategoriesQueryVariables>(AllSubCategoriesDocument, options);
      }
export function useAllSubCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSubCategoriesQuery, AllSubCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSubCategoriesQuery, AllSubCategoriesQueryVariables>(AllSubCategoriesDocument, options);
        }
export type AllSubCategoriesQueryHookResult = ReturnType<typeof useAllSubCategoriesQuery>;
export type AllSubCategoriesLazyQueryHookResult = ReturnType<typeof useAllSubCategoriesLazyQuery>;
export type AllSubCategoriesQueryResult = Apollo.QueryResult<AllSubCategoriesQuery, AllSubCategoriesQueryVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: Int!) {
  deleteUser(userId: $userId) {
    success
    message
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updatedUser: InputUpdate!) {
  updateUser(updatedUser: $updatedUser) {
    success
    message
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updatedUser: // value for 'updatedUser'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
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
    mutation Logout {
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
    mutation Register($newUser: InputRegister!) {
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
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: Int!) {
  deleteCategory(id: $id)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: Int!, $name: String!, $image: String!, $description: String!) {
  updateCategory(id: $id, name: $name, image: $image, description: $description) {
    id
    name
    description
    image
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      image: // value for 'image'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const AddCategoryDocument = gql`
    mutation AddCategory($name: String!, $image: String!, $description: String) {
  addCategory(name: $name, image: $image, description: $description) {
    id
    name
    description
    image
  }
}
    `;
export type AddCategoryMutationFn = Apollo.MutationFunction<AddCategoryMutation, AddCategoryMutationVariables>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      image: // value for 'image'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useAddCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument, options);
      }
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>;
export type AddCategoryMutationResult = Apollo.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<AddCategoryMutation, AddCategoryMutationVariables>;
export const AddProductRefDocument = gql`
    mutation AddProductRef($data: InputProductRef!) {
  addProductRef(data: $data) {
    success
    message
  }
}
    `;
export type AddProductRefMutationFn = Apollo.MutationFunction<AddProductRefMutation, AddProductRefMutationVariables>;

/**
 * __useAddProductRefMutation__
 *
 * To run a mutation, you first call `useAddProductRefMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductRefMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductRefMutation, { data, loading, error }] = useAddProductRefMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddProductRefMutation(baseOptions?: Apollo.MutationHookOptions<AddProductRefMutation, AddProductRefMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductRefMutation, AddProductRefMutationVariables>(AddProductRefDocument, options);
      }
export type AddProductRefMutationHookResult = ReturnType<typeof useAddProductRefMutation>;
export type AddProductRefMutationResult = Apollo.MutationResult<AddProductRefMutation>;
export type AddProductRefMutationOptions = Apollo.BaseMutationOptions<AddProductRefMutation, AddProductRefMutationVariables>;
export const DeleteProductRefDocument = gql`
    mutation DeleteProductRef($productRefId: Int!) {
  deleteProductRef(productRefId: $productRefId) {
    success
    message
  }
}
    `;
export type DeleteProductRefMutationFn = Apollo.MutationFunction<DeleteProductRefMutation, DeleteProductRefMutationVariables>;

/**
 * __useDeleteProductRefMutation__
 *
 * To run a mutation, you first call `useDeleteProductRefMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductRefMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductRefMutation, { data, loading, error }] = useDeleteProductRefMutation({
 *   variables: {
 *      productRefId: // value for 'productRefId'
 *   },
 * });
 */
export function useDeleteProductRefMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductRefMutation, DeleteProductRefMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductRefMutation, DeleteProductRefMutationVariables>(DeleteProductRefDocument, options);
      }
export type DeleteProductRefMutationHookResult = ReturnType<typeof useDeleteProductRefMutation>;
export type DeleteProductRefMutationResult = Apollo.MutationResult<DeleteProductRefMutation>;
export type DeleteProductRefMutationOptions = Apollo.BaseMutationOptions<DeleteProductRefMutation, DeleteProductRefMutationVariables>;
export const UpdateProductRefDocument = gql`
    mutation UpdateProductRef($data: UpdateProductRef!, $productRefId: Int!) {
  updateProductRef(data: $data, productRefId: $productRefId) {
    success
    message
  }
}
    `;
export type UpdateProductRefMutationFn = Apollo.MutationFunction<UpdateProductRefMutation, UpdateProductRefMutationVariables>;

/**
 * __useUpdateProductRefMutation__
 *
 * To run a mutation, you first call `useUpdateProductRefMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductRefMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductRefMutation, { data, loading, error }] = useUpdateProductRefMutation({
 *   variables: {
 *      data: // value for 'data'
 *      productRefId: // value for 'productRefId'
 *   },
 * });
 */
export function useUpdateProductRefMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductRefMutation, UpdateProductRefMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductRefMutation, UpdateProductRefMutationVariables>(UpdateProductRefDocument, options);
      }
export type UpdateProductRefMutationHookResult = ReturnType<typeof useUpdateProductRefMutation>;
export type UpdateProductRefMutationResult = Apollo.MutationResult<UpdateProductRefMutation>;
export type UpdateProductRefMutationOptions = Apollo.BaseMutationOptions<UpdateProductRefMutation, UpdateProductRefMutationVariables>;