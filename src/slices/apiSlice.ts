import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Token {
    accessToken?: string;
    refreshToken?: string;
}

interface ErrorResponse {
    status: number;
    data: { message: string };
}

const getAuthToken = (): Token | null => {
    if (typeof window === 'undefined') return null;
    try {
        const stored = localStorage.getItem('admin-auth');
        if (!stored) return null;

        const parsed = JSON.parse(stored);
        return {
            accessToken: parsed.token,
            refreshToken: parsed.refreshToken
        };
    } catch {
        return null;
    }
};

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
});

const baseQueryWithAuth: BaseQueryFn = async (args, api, extraOptions) => {
    const token = getAuthToken();

    const requestArgs = typeof args === 'string' ? { url: args, headers: {} } : { ...args, headers: { ...args.headers } };

    if (token?.accessToken) {
        requestArgs.headers['Authorization'] = `Bearer ${token.accessToken}`;
    }
    if (token?.refreshToken) {
        requestArgs.headers['x-refresh'] = token.refreshToken;
    }
    requestArgs.headers['x-request-source'] = 'mobile';

    const result = await baseQuery(requestArgs, api, extraOptions);

    if (result.error) {
        const errorData = result.error.data as any;
        return {
            error: {
                status: result.error.status || 'FETCH_ERROR',
                data: {
                    message: errorData?.message || errorData?.data?.message || 'An error occurred'
                },
            },
        };
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['admin', 'Producers', 'Actors'],
    endpoints: () => ({}),
});