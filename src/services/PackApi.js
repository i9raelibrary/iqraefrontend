import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3306/api/pack';

export const PackApi = createApi({
    reducerPath: 'PackApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        AddPack: builder.mutation({
            query: (Info, id) => ({
                url: '/add',
                method: 'POST',
                body: { Info, id }
            })
        }),
        getAllPacks: builder.query({
            query: () => ({
                url: '/',
                keepUnusedDataFor: 0,
                refetchOnFocus: true,
                refetchOnReconnect: true,
            })
        }),
        DeletePack: builder.mutation({
            query: (id) => ({
                url: '/delete',
                refetchOnFocus: true,
                refetchOnReconnect: true,
                method: "POST",
                body: { id }
            })
        })
    })
})

export const { useAddPackMutation, useGetAllPacksQuery, useDeletePackMutation } = PackApi;