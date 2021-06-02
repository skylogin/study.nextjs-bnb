import { HYDRATE, createWrapper, MakeStore } from "next-redux-wrapper";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";

import user from "./user";

const rootReducer = combineReducers({
    user: user.reducer,
});

// 스토어 타입
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
    if(action.type === HYDRATE){
        if(state === initialRootState){
            return {
                ...state, ...action.payload
            };
        }
    }
    return rootReducer(state, action);
};

// 타입이 지원되는 커스텀 useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore = () => {
    const store = configureStore({
        reducer,
        devTools: true,
    });
    initialRootState = store.getState();
    return store;
};

export const wrapper = createWrapper(initStore);