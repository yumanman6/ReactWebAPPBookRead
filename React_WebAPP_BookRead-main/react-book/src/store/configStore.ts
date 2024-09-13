import { configureStore, getDefaultMiddleware, Middleware, Reducer } from "@reduxjs/toolkit";
import createReducerManager from "./createReducerManger";

export interface IReducers {
    [key: string]:Reducer;
}

const configStore = (reducers: IReducers, middleware: Middleware[]) => {
    const reducerManager = createReducerManager({...reducers});

    const internalStore= configureStore({
        reducer: reducerManager.reduce,
        middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    })

    type TStore = typeof internalStore;

    interface IStore extends TStore {
        reducerManger: ReturnType<typeof createReducerManager>
    }

    const store = internalStore as IStore;

    store.reducerManger = reducerManager;
    return store;
}

export default configStore;