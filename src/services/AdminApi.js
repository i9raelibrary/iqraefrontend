import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3306/api/admin";

export const AdminApi = createApi({
  reducerPath: "AdminApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    FetchAdmin: builder.query({
      query: () => "/",
    }),
    FetchStatistics: builder.query({
      query: () => "/statistics",
    }),
    FetchBarGraphData: builder.query({
      query: () => "/barGraphData",
    }),
    FetchClientStatistics: builder.query({
      query: () => "/clientStatistics",
    }),
    FetchProductStatistics: builder.query({
        query: ()=> "/productStatistics",
    }),
    verifyToken: builder.mutation({
      query: (token) => ({
        url: "/verify",
        method: "POST",
        body: token,
      }),
    }),
    DeleteClient: builder.mutation({
      query: (id) => ({
        url: "/deleteclient",
        method: "POST",
        body: id,
      }),
    }),
  }),
});

export const {
  useFetchAdminQuery,
  useFetchStatisticsQuery,
  useFetchBarGraphDataQuery,
  useVerifyTokenMutation,
  useDeleteClientMutation,
  useFetchClientStatisticsQuery,
  useFetchProductStatisticsQuery,
} = AdminApi;
