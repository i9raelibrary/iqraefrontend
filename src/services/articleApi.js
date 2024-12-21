import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3306/api/article";

export const ArticleApi = createApi({
  reducerPath: "ArticleApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    FetchAllPRODUCTS: builder.query({
      query: ({ start, limit }) => ({
        url: `/?start=${start}&limit=${limit}`,
        method: "GET",
      }),
    }),
    FetchAll: builder.query({
      query: ()=> '/findAll',
    }),
    FetchPRODUCTSRandomlly : builder.query({
      query: ()=> '/findRandom',
    }),
    CreateArticle: builder.mutation({
      query: (newArticle) => {
        const formData = new FormData();
        formData.append("nom", newArticle.nom);
        formData.append("puv", newArticle.puv);
        formData.append("stock", newArticle.stock);
        formData.append("categorie_id", newArticle.categorie_id);
        formData.append("description", newArticle.description);
        formData.append("image", newArticle.image);

        return {
          url: "/add", // Backend endpoint for creating articles
          method: "POST",
          body: formData, // Send FormData as the body
        };
      },
    }),
    updatearticle: builder.mutation({
      query: (updatedArticle) => {
        const formData = new FormData();
        formData.append("id", updatedArticle.id);
        formData.append("nom", updatedArticle.nom);
        formData.append("puv", updatedArticle.puv);
        formData.append("stock", updatedArticle.stock);
        formData.append("categorie_id", updatedArticle.categorie_id);
        formData.append("description", updatedArticle.description);
        formData.append("image", updatedArticle.image);
        return {
          url: "/update", // Backend endpoint for updating the article
          method: "POST", // Use POST method
          body: formData, // Send FormData as the body
        };
      },
    }),
    deleteArticle: builder.mutation({
      query: (productId) => ({
        url: "/delete",
        method: "POST",
        body: productId,
      }),
    }),
  }),
});

export const {
  useFetchAllPRODUCTSQuery,
  useCreateArticleMutation,
  useUpdatearticleMutation,
  useDeleteArticleMutation,
  useFetchAllQuery,
  useFetchPRODUCTSRandomllyQuery
} = ArticleApi;
