import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ClientUrl = "http://localhost:3306/api/client";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({ baseUrl: ClientUrl }), // Correction de baseUrl ici
  endpoints: (builder) => ({
    // Mutation pour ajouter un client
    insertClient: builder.mutation({
      query: (clientData) => ({
        url: "/register",
        method: "POST",
        body: clientData,
      }),
    }),
    FetchAllClients: builder.query({
      query: () => "/",
    }),
    LoginClient: builder.mutation({
      query: (clientData) => ({
        url: "/login",
        method: "POST",
        body: clientData,
      }),
    }),
    FindCurrentClient: builder.mutation({
      query: (clientdata) => ({
        url: "/findCurrentClient",
        method: "POST",
        body: clientdata,
      }),
    }),
    UpdateClientInformations: builder.mutation({
      query: (clientInfos)=>({
        url: '/',
        method: "PUT",
        body: {clientInfos},
      })
    }),
  }),
});

export const {
  useFindCurrentClientMutation,
  useInsertClientMutation,
  useFetchAllClientsQuery,
  useLoginClientMutation,
  useUpdateClientInformationsMutation
} = clientApi; // Export de l'API pour l'utiliser dans le composant
