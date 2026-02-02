import type {formSchemaType} from "@/components/SignUpForm";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_URL as string}),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        // Define your endpoints here
        signup: builder.mutation({
            query: (data: formSchemaType) => {
                return {
                    url: "/auth/signup",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["User"],
        }),

        checkAuth: builder.query({
            query: () => ({
                url: "/auth/check-auth",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["User"],
        }),
    }),
});

export const {useSignupMutation, useCheckAuthQuery} = api;

export default api;
