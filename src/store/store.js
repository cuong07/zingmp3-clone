import { configureStore } from "@reduxjs/toolkit";
import artistSlice from "./artistSlice";

import homeSlice from "./homeSlice";
import musicSlide from "./musicSlice";
import searchSlice from "./searchSilce";
const store = configureStore({
    reducer: {
        music: musicSlide.reducer,
        home: homeSlice.reducer,
        search: searchSlice.reducer,
        artist: artistSlice.reducer
    },
});

export default store;
