import axios from "axios";

import { UserType } from "../../types/user";

interface SignUpAPIBody{
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    birthday: string;
}

export const signupAPI = (body: SignUpAPIBody) => {
    return axios.post<UserType>("/api/auth/signup", body);
}

export const loginAPI = (body: { email: string; password: string }) => {
    return axios.post<UserType>("/api/auth/login", body);
}