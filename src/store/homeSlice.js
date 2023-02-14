import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        banner: [],
        isLoadingPage: false,
        playlist: {},
        newRelease: {},
        artistTheme: {},
        top100: {},
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
                (item) => item?.sectionId === "hAutoTheme1" || null
            );
        },
        getNewRelease: (state, action) => {
            state.newRelease = action.payload.items.find(
                (item) => item?.sectionType === "new-release" || null
            );
        },
        getArtistTheme: (state, action) => {
            state.artistTheme = action.payload.items.find(
                (item) => item?.sectionId === "hArtistTheme" || null
            )
        },
        getTop100: (state, action) => {
            state.top100 = action.payload.items.find(
                (item) => item?.sectionId === "h100" || null
            )
        },
    },
});

export default homeSlice;
