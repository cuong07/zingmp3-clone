import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Slider } from "../../components";
import * as apis from "../../apis/home";
import homeSlice from "../../store/homeSlice";
import LoadingPage from "../../UI/LoadingPage";

const Home = (props) => {
    const dispatch = useDispatch();
    const { isLoadingPage } = useSelector((state) => state.home);

    useEffect(() => {
        const fetchDataHome = async () => {
            dispatch(homeSlice.actions.setIsLoadingPage(true));
            const response = await apis.getHome();
            if (response) {
                dispatch(homeSlice.actions.getBanner(response.data.data));
            } else {
                console.log(Error);
            }
            dispatch(homeSlice.actions.setIsLoadingPage(false));
        };
        fetchDataHome();
    }, []);

    return (
        <div className="overflow-y-auto w-full">
            {isLoadingPage && <LoadingPage />}
            {!isLoadingPage && <Slider />}
        </div>
    );
};

export default Home;
