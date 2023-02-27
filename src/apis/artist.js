import request from "../axios";


export const getArtistSongs = async (id, page, count) => {
    try {
        const response = await request({
            url: "/artistsong",
            method: "get",
            params: {
                id: id,
                page: page,
                count: count
            }
        });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};