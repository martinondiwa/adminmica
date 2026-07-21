import { AuthBindings } from "@refinedev/core";
import { API_URL, dataProvider } from "./data";

// For demo purposes
export const authCredentials = {
    email: "demo@refine.dev",
    password: "demodemo",
};

export const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        try {
            const { data } = await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                    variables: {
                        email,
                        password,
                    },
                    rawQuery: `
                        mutation Login(
                            $email: String!
                            $password: String!
                        ) {
                            login(
                                loginInput: {
                                    email: $email
                                    password: $password
                                }
                            ) {
                                accessToken
                            }
                        }
                    `,
                },
            });

            const accessToken = data.login.accessToken;

            localStorage.setItem(
                "access_token",
                accessToken
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
                    name: error.name || "Invalid email or password",
                },
            };
        }
    },

    logout: async () => {
        localStorage.removeItem("access_token");

        return {
            success: true,
            redirectTo: "/login",
        };
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

    check: async () => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            return {
                authenticated: false,
                redirectTo: "/login",
            };
        }

        try {
            await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                meta: {
                    rawQuery: `
                        query Me {
                            me {
                                name
                            }
                        }
                    `,
                },
            });

            return {
                authenticated: true,
            };
        } catch (error) {
            localStorage.removeItem("access_token");

            return {
                authenticated: false,
                redirectTo: "/login",
                logout: true,
            };
        }
    },

    getIdentity: async () => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            return undefined;
        }

        try {
            const { data } = await dataProvider.custom<{
                me: {
                    id: string;
                    name: string;
                    email: string;
                    phone: string;
                    jobTitle: string;
                    timezone: string;
                    avatarUrl: string;
                };
            }>({
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
};