import { AuthBindings } from "@refinedev/core";

import { API_URL, dataProvider } from "./data";

// For demo purposes
export const authCredentials = {
    email: "demo@refine.dev",
};

export const authProvider: AuthBindings = {

    login: async ({ email }) => {
        try {
            const { data } = await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                    variables: {
                        loginInput: {
                            email,
                        },
                    },
                    rawQuery: `
                        mutation Login($loginInput: LoginInput!) {
                            login(loginInput: $loginInput) {
                                accessToken
                                refreshToken
                                user {
                                    id
                                    name
                                    email
                                }
                            }
                        }
                    `,
                },
            });

            localStorage.setItem(
                "access_token",
                data.login.accessToken
            );

            localStorage.setItem(
                "refresh_token",
                data.login.refreshToken
            );

            return {
                success: true,
                redirectTo: "/",
            };

        } catch (e) {
            const error = e as Error;

            return {
                success: false,
                error: {
                    message: error.message || "Login failed",
                    name: "Invalid email",
                },
            };
        }
    },


    logout: async () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        return {
            success: true,
            redirectTo: "/login",
        };
    },


    check: async () => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            return {
                authenticated: false,
                redirectTo: "/login",
            };
        }

        return {
            authenticated: true,
        };
    },


    getIdentity: async () => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            return undefined;
        }

        try {
            const { data } = await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                meta: {
                    rawQuery: `
                        query Me {
                            me {
                                id
                                name
                                email
                                phone
                                jobTitle
                                timezone
                                avatarUrl
                            }
                        }
                    `,
                },
            });

            return data.me;

        } catch (error) {
            return undefined;
        }
    },


    onError: async (error) => {
        if (error.statusCode === "UNAUTHENTICATED") {
            return {
                logout: true,
                ...error,
            };
        }

        return {
            error,
        };
    },
};