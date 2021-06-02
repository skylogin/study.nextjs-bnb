import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/user";
import { UserState } from "../types/reduxState";

const initialState: UserState = {
    id: 0,
    email: "",
    lastname: "",
    firstname: "",
    birthday: "",
    isLogged: false,
    profileImage: "",
};

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        //로그인한 유저 변경
        setLoggedUser(state, action: PayloadAction<UserType>){
            state = { ...action.payload, isLogged: true };
            return state;
        },
        // 유저 초기화 (로그아웃시 사용)
        initUser(state){
            state = initialState;
            return state;
        }
    }
});

export const userActions = { ...user.actions };

export default user;