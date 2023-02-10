import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import musicSlide from "./musicSlice";
const store = configureStore({
    reducer: {
        music: musicSlide.reducer,
        home: homeSlice.reducer,
    },
});

export default store;
