import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types/reduxState";

const initialState: CommonState = {
   validateMode: false,
};

const common = createSlice({
    name: "common",
    initialState,
    reducers: {
        // validatemode 변경
        setValidateMode(state, action: PayloadAction<boolean>){
            state.validateMode = action.payload;
            // return state;
        },
    }
});

export const commonActions = { ...common.actions };

export default common;