import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    artists: [],
    counter: {},
    playlists: [],
    songs: [],
    videos: [],
    searchAll: {},
};

const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        setSearchAll: (state, action) => {
            state.searchAll = action.payload;
            state.artists = action.payload.artists;
            state.playlists = action.payload.playlists;
            state.songs = action.payload.songs;
            state.videos = action.payload.videos;
            state.counter = action.payload.counter;
        },
    },
});

export default searchSlice;
