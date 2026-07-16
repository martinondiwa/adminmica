import {AuthBindings} from "@refinedev/core";

import {API_URL, dataProvider} from "./data";

//For demo purposes
export const authCredentials = {
  email: "ondiwamartin@gmail.com",
  password: "#7014martinSURE",
};

export const authProvider: AuthBindings = {
    login: async ({email})
}