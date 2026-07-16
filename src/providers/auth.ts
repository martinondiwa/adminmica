import {AuthBindings} from "@refinedev/core";

import {API_URL, dataProvider} from "./data";
import { Login } from "../pages/login";

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
        }
    }
}