import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        banner: [],
    },
    reducers: {
        getBanner: (state, action) => {
            state.banner = action.payload.items?.find(
                (item) => item.sectionType === "banner" || null
            );
        },
    },
});

export default homeSlice;
