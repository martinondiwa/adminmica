import {AuthBindings} from "@refinedev/core";

import {API_URL, dataProvider} from "./data";
import { Login } from "../pages/login";
import { redirect } from "react-router";
import { message } from "antd";

//For demo purposes
export const authCredentials = {
  email: "ondiwamartin@gmail.com",
  password: "demodemo",
};

export const authProvider: AuthBindings = {
    login: async ({email}) => {
        try {
            //call the login mutation
            const {data} = await dataProvider.custom({
                url:API_URL,
                method: "post",
                headers:{},
                meta: {
                    variables: {email},
                    rawQuery: `
                    mutation Login($email: String!) {
                        Login(loginInput: {email:$email}) {
                            accessToken
                        }
                     }
                    `, 
                },
            });
            //save the accessToken in localStorage
            localStorage.setItem("access_token", data.login.accessToken);

            return {
                success: true,
                redirectTo:"/",
            };
        } catch (e) {
                const error = e as Error;

                return {
                    success: false,
                    error:{
                        message: "message" in error ? error.message : "Login failed",
                        name: "name" in error ? error.name : "Invalid email or password",
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
        return {error};
    },
};