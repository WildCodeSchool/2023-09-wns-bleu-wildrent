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
  subCategoryId: Scalars['ID'];
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
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: Category;
  addProductRef: Message;
  deleteProductRef: Message;
  login: Message;
  logout: Message;
  register: Message;
  updateProductRef: Message;
  updateUser: Message;
};


export type MutationAddCategoryArgs = {
  description?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddProductRefArgs = {
  newProductRef: InputProductRef;
};


export type MutationDeleteProductRefArgs = {
  productRefId: Scalars['Int'];
};


export type MutationLoginArgs = {
  user: InputLogin;
};


export type MutationRegisterArgs = {
  newUser: InputRegister;
};


export type MutationUpdateProductRefArgs = {
  productRefId: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  updatedUser: InputUpdate;
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
  productItems: Array<ProductItem>;
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

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'Profile', id: number, firstname?: string | null, lastname?: string | null, role: string, email: string, password?: string | null, address?: string | null, city?: string | null, cp?: string | null, picture?: string | null } };

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = { __typename?: 'Query', allCategories: Array<{ __typename?: 'Category', id: number, name: string, description?: string | null, image: string }> };

export type AllCategoriesAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesAdminQuery = { __typename?: 'Query', allCategories: Array<{ __typename?: 'Category', id: number, name: string, description?: string | null, image: string }> };

export type AllSubCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSubCategoriesQuery = { __typename?: 'Query', allSubCategories: Array<{ __typename?: 'SubCategory', id: number, name: string }> };

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

export type AddCategoryMutationVariables = Exact<{
  name: Scalars['String'];
  image: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'Category', id: number, name: string, description?: string | null, image: string } };

export type AddProductRefMutationVariables = Exact<{
  newProductRef: InputProductRef;
}>;


export type AddProductRefMutation = { __typename?: 'Mutation', addProductRef: { __typename?: 'Message', success: boolean, message: string } };

export type DeleteProductRefMutationVariables = Exact<{
  productRefId: Scalars['Int'];
}>;


export type DeleteProductRefMutation = { __typename?: 'Mutation', deleteProductRef: { __typename?: 'Message', success: boolean, message: string } };


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
    mutation AddProductRef($newProductRef: InputProductRef!) {
  addProductRef(newProductRef: $newProductRef) {
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
 *      newProductRef: // value for 'newProductRef'
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