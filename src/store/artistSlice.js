import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    artistSongs: [],
    aSingle: {},
    aAlbum: {},
    aPlaylist: {},
    artistId: '',
    artist: null
}

const artistSlice = createSlice({
    name: 'artist',
    initialState: initialState,
    reducers: {
        getArtistSongs: (state, action) => {
            state.artistSongs = action?.payload?.find(
                (item) => item.sectionType === "song" || null
            )
        },
        getArtistPlaylist: (state, action) => {
            state.aSingle = action?.payload?.find(
                (item) => item.sectionId === "aSingle" || null
            )
            state.aAlbum = action?.payload?.find(
                (item) => item.sectionId === "aAlbum" || null
            )
            state.aPlaylist = action?.payload?.find(
                (item) => item.sectionId === "aPlaylist" || null
            )
        },
        getArtistId: (state, action) => {
            state.artistId = action?.payload
        },
        setArtist: (state, action) => {
            state.artist = action?.payload
        }

    }
})

export default artistSlice;