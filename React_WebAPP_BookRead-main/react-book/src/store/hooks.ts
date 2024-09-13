import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispath, AppState, store } from "@/store/store";
import React from "react";

export const useReducer = (reducer={}) => {
    const dispatch = useAppDispatch();

    store.reducerManger.addReducers(reducer);
    dispatch({type: '@RELOAD_STATE'});

    React.useLayoutEffect(() => {
        return () => {
            store.reducerManger.removeReducers(Object.keys(reducer));
        }
    },[reducer])
}

export const useAppDispatch = () => useDispatch<AppDispath>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;