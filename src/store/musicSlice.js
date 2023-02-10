import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    curSongId: null,
    isPlaying: false,
    atAlbum: false,
    songs: [],
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
        }

    },
});

export default musicSlide;
