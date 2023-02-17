import request from "../axios";

export const getHome = async () => {
    try {
        const response = await request({
            url: "/home",
            method: "get",
        });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};
export const getWeekRank = async (chartId) => {
    try {
        const response = await request({
            url: "/charthome",
            method: "get",
            params: {
                id: chartId,
            },
        });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};
