import {AuthBindings} from "@refinedev/core";

import {API_URL, dataProvider} from "./data";
import { Login } from "../pages/login";
import { redirect } from "react-router";
import { message } from "antd";

//For demo purposes
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
                    },
                    rawQuery: `
                        mutation Login($email: String!) {
                            login(
                                loginInput: {
                                    email: $email
                                }
                            ) {
                                accessToken
                            }
                        }
                    `,
                },
            });

            localStorage.setItem(
                "access_token",
                data.login.accessToken
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
                    message:
                        "message" in error
                            ? error.message
                            : "Login failed",
                    name:
                        "name" in error
                            ? error.name
                            : "Invalid email or password",
                },
            };
        }
    },
    //Simply remove the accessToken from localStorage for the logout
    logout: async () => {
        localStorage.removeItem("access_token");

        return {
            success: true,
            redirectTo: "/login",
        };
    },

    onError: async (error) => {
        //This is a check to see if the error is an authentication error
        //if so, set logout to true
        if (error.statusCode === "UNAUTHENTICATED") {
            return {
                logout: true,
                ...error,
            };
        }

        return { error };
    },

    //used to get the identity of the user
    //this is to know if the user is authenticated or not
    check: async () => {
        try {
            await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
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

            //if the user is authenticated, redirect to the home page
            return {
                authenticated: true,
                redirectTo: "/",
            };

        } catch (error) {
            //for any other error, redirect to the login page
            return {
                authenticated: false,
                redirectTo: "/login",
            };
        }
    },

    //get the user information
    getIdentity: async () => {
        const accessToken = localStorage.getItem("access_token");

        try {
            const { data } = await dataProvider.custom<{ me: any }>({
                url: API_URL,
                method: "post",
                headers: accessToken
                    ? {
                          //send the access token in the authorization header
                          Authorization: `Bearer ${accessToken}`,
                      }
                    : {},
                meta: {
                    //get the user information such as name, email, etc
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