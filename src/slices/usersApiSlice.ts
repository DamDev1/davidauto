import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),

        verifyEmail: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-email',
                method: 'POST',
                body: data,
            }),
        }),
        resendOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/resend-otp',
                method: 'POST',
                body: data,
            }),
        }),

        createCar: builder.mutation({
            query: (data) => ({
                url: '/cars',
                method: 'POST',
                body: data,
            }),
        }),

        getCars: builder.query({
            query: () => ({
                url: '/cars',
                method: 'GET',
            }),
        }),

        getCarById: builder.query({
            query: (carId) => ({
                url: `/cars/${carId}`,
                method: 'GET',
            }),
        }),

        uploadImages: builder.mutation({
            query: (data) => ({
                url: 'upload-images',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyEmailMutation, useCreateCarMutation, useGetCarsQuery, useUploadImagesMutation, useResendOtpMutation, useGetCarByIdQuery } = usersApiSlice;
