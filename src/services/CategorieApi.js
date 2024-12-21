import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3306/api/categories';
console.log("je suis dans categorieApi !");
export const CategApi = createApi({
  reducerPath: 'CategApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    FetchAllCATEGORIES: builder.query({
      query: () => '/', 
    }),
    FECHSUBCATEGORIES: builder.query({
      query: (id) => '/subcategories/' + id, 
    }),
    FetchNestedCategories: builder.query({
      query: () => '/nestedCategories'
    }),
    CreateCategorie: builder.mutation({
      query: (categorie) => {
        return {
          url: "/add", 
          method: "POST",
          body: categorie, 
        };
      },
    }),
  }),

});

export const {
  useFetchAllCATEGORIESQuery,
  useFECHSUBCATEGORIESQuery,
  useFetchNestedCategoriesQuery,
  useCreateCategorieMutation,
} = CategApi;