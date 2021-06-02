import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { authMode: "signup" | "login" } = {
    authMode: "signup",
};

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // 인증 팝업 변경
        setAuthMode(state, action: PayloadAction<"signup" | "login">){
            state.authMode = action.payload;
        },
    }
});

export const authActions = { ...auth.actions };

export default auth;