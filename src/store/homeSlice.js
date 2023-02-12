import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        banner: [],
        isLoadingPage: false,
        playlist: {}
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
        getPlaylist: (state, action) => {
            state.playlist = action.payload.items.find(
                item => item?.sectionId === "hAutoTheme1" || null
            )
                ;
        }
    },
});

export default homeSlice;
