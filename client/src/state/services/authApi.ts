import {api} from "../api";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    profilePic?: string;
    publicId?: string;
    secureUrl?: string;
}
interface responseType {
    user: User;
    message: string;
}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<User, void>({
            query: () => "/auth/me",
            providesTags: ["getUser"],
        }),
        signIn: builder.mutation<responseType, {email: string; password: string}>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["getUser"],
        }),
        signUp: builder.mutation<responseType, {email: string; password: string; firstName: string; lastName: string}>({
            query: (data) => ({
                url: "/auth/signup",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["getUser"],
        }),
        signOut: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["getUser"],
        }),
    }),
});

export const {useGetMeQuery, useSignInMutation, useSignUpMutation, useSignOutMutation} = authApi;
