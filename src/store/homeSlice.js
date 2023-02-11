import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        banner: [],
        isLoadingPage: false,
    },
    reducers: {
        getBanner: (state, action) => {
            state.banner = action.payload.items?.find(
                (item) => item.sectionType === "banner" || null
            );
        },
        setIsLoadingPage: (state, action) => {
            state.isLoadingPage = action.payload;
        },
    },
});

export default homeSlice;
