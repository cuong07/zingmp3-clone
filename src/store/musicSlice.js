import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    curSongId: null,
    isPlaying: false,
    atAlbum: false,
    songs: [],
    isLoading: false,
};
const musicSlide = createSlice({
    name: "music",
    initialState: initialState,
    reducers: {
        setCurSongId: (state, aciton) => {
            state.curSongId = aciton.payload || null;
        },
        setIsPlaying: (state, aciton) => {
            state.isPlaying = aciton.payload;
        },
        setAtAlbum: (state, aciton) => {
            state.atAlbum = aciton.payload;
        },
        setSongs: (state, aciton) => {
            state.songs = aciton.payload;
        },
        setIsLoading: (state, aciton) => {
            state.isLoading = aciton.payload;
        }
    },
});

export default musicSlide;
