import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

   const baseUrl = "http://localhost:3306/api/commandepackage";
   
   export const CommandeApi = createApi({
     reducerPath: "CommandeApi",
     baseQuery: fetchBaseQuery({ baseUrl }),
     endpoints: (builder) => ({
       getCommandes: builder.query({
         query: () => "/",
       }),
       CreateCommandPackage: builder.mutation({
          query: (newCommand) => {
            return {
              url: "/", // Backend endpoint for creating commands
              method: "POST",
              body: newCommand, // Send FormData as the body
            };
          },
        }),
     //   updateCommand: builder.mutation({
     //     query: ({ id, newStatus }) => ({
     //       url: "/updatecommand", // Backend endpoint for updating a command
     //       method: "POST", // Use POST for updating
     //       body: { id, newStatus }, // Include the id and other updated fields in the body
     //     }),
     //   }),
     }),
   });
   export const {
     useGetCommandesQuery,
     useCreateCommandPackageMutation,
   } = CommandeApi;
   