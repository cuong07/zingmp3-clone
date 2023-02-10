import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_SEVER_URL,
});

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default request;
