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
