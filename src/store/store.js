import { combineReducers, configureStore } from "@reduxjs/toolkit";
import artistSlice from "./artistSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import homeSlice from "./homeSlice";
import musicSlide from "./musicSlice";
import searchSlice from "./searchSilce";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    music: musicSlide.reducer,
    home: homeSlice.reducer,
    search: searchSlice.reducer,
    artist: artistSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)
export default store;

