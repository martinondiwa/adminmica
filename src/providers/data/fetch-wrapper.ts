import { GraphQLFormattedError } from "graphql";

type Error = {
    message: string;
    statusCode: string;
};

const customFetch = async (
    url: string,
    options: RequestInit
) => {
    const accessToken = localStorage.getItem("access_token");

    const headers = options.headers as Record<string, string>;

    return fetch(url, {
        ...options,
        headers: {
            ...headers,

            ...(accessToken && {
                Authorization: `Bearer ${accessToken}`,
            }),

            "Content-Type": "application/json",
            "Apollo-Require-Preflight": "true",
        },
    });
};


const getGraphQLErrors = (
    body: {
        errors?: GraphQLFormattedError[];
    }
): Error | null => {

    if (!body) {
        return {
            message: "Unknown error",
            statusCode: "INTERNAL_SERVER_ERROR",
        };
    }


    if ("errors" in body && body.errors) {

        const messages = body.errors
            .map((error) => error.message)
            .join("\n");

        const code =
            body.errors[0]?.extensions?.code;


        return {
            message: messages,
            statusCode: String(code || 500),
        };
    }

    return null;
};


export const fetchWrapper = async (
    url: string,
    options: RequestInit
) => {

    const response = await customFetch(url, options);

    const responseClone = response.clone();

    const body = await responseClone.json();

    const error = getGraphQLErrors(body);

    if (error) {
        throw error;
    }

    return response;
};