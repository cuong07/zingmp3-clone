import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    curSongId: null,
    detailSongId: null,
    isPlaying: false,
    atAlbum: false,
    songs: null,
    isLoadingSong: false,
    songLyric: null,
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
            state.songs = aciton.payload || null;
        },
        setIsLoadingSong: (state, aciton) => {
            state.isLoadingSong = aciton.payload;
        },
        getDetailSongId: (state, aciton) => {
            state.detailSongId = aciton.payload;
        },
        setSongLyric: (state, aciton) => {
            state.songLyric = aciton.payload;
        }
    },
});

export default musicSlide;
