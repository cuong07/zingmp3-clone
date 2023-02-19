import request from "../axios";

export const apiGetSong = async (songId) => {
    try {
        const response = await request({
            url: "/song",
            method: "get",
            params: {
                id: songId,
            },
        });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};
export const apiGetDetailSong = async (songId) => {
    try {
        const response = await request({
            url: "/infosong",
            method: "get",
            params: {
                id: songId,
            },
        });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};
export const apiGetDetailPlaylist = async (playlistId) => {
    try {
        const response = await request({
            url: "/detailplaylist",
            method: "get",
            params: {
                id: playlistId,
            },
        });
        return response;
    } catch (error) {
        console.log(error.message);
    }
}; export const apiSearch = async (keyword) => {
    try {
        const response = await request({
            url: "/search",
            method: "get",
            params: {
                keyword,
            },
        });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};
