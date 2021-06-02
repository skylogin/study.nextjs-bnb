import axios from "./";

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

// _app에서 매 req마다 사용할 api (cookie내 존재하는 token을 통해 로그인한 사용자 확인)
export const meAPI = () => {
    return axios.get<UserType>("/api/auth/me");
}

export const logoutAPI = () => axios.delete("/api/auth/logout");