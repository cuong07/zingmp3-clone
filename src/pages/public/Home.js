import React, { useEffect } from "react";
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from "react-redux";

import { Section, Slider } from "../../components";
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
                dispatch(homeSlice.actions.getPlaylist(response.data.data));
            } else {
                console.log(Error);
            }
            dispatch(homeSlice.actions.setIsLoadingPage(false));
        };
        fetchDataHome();
    }, []);

    return (
        <div className="overflow-y-auto w-full">
            {isLoadingPage && ReactDOM.createPortal(<LoadingPage />, document.getElementById('loading'))}
            {!isLoadingPage &&
                <>
                    <Slider />
                    <Section />
                </>
            }

        </div>
    );
};

export default Home;
