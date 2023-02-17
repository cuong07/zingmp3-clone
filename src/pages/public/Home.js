import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    NewRelease,
    Section,
    Slider,
    ArtistTheme,
    Top100,
    Radio,
    ChartSection,
} from "../../components";
import * as apis from "../../apis/home";
import homeSlice from "../../store/homeSlice";
import LoadingPage from "../../UI/LoadingPage";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
    const dispatch = useDispatch();
    const { isLoadingPage, weekRank } = useSelector((state) => state.home);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDataHome = async () => {
            dispatch(homeSlice.actions.setIsLoadingPage(true));
            const response = await apis.getHome();
            if (response) {
                dispatch(homeSlice.actions.getBanner(response.data.data));
                dispatch(homeSlice.actions.getPlaylist(response.data.data));
                dispatch(homeSlice.actions.getNewRelease(response.data.data));
                dispatch(homeSlice.actions.getArtistTheme(response.data.data));
                dispatch(homeSlice.actions.getTop100(response.data.data));
                dispatch(homeSlice.actions.getRadio(response.data.data));
                dispatch(homeSlice.actions.getWeekRank(response.data.data));
                dispatch(homeSlice.actions.getChart(response.data.data));
            } else {
                console.log(Error);
            }
            dispatch(homeSlice.actions.setIsLoadingPage(false));
        };
        fetchDataHome();
    }, []);

    const handlerClickItem = (item) => {
        const chartPath = item?.link?.split(".")[0];
        navigate(chartPath);
    };
    return (
        <div className="w-full">
            {isLoadingPage &&
                ReactDOM.createPortal(
                    <LoadingPage />,
                    document.getElementById("loading")
                )}
            {!isLoadingPage && (
                <>
                    <Slider />
                    <Section />
                    <NewRelease />
                    <ArtistTheme />
                    <Radio />
                    <Top100 />
                    <ChartSection />
                    <div className="flex px-[59px] mt-12 gap-4 justify-between">
                        {weekRank?.items?.map((item, index) => (
                            <img
                                key={index}
                                src={item.cover}
                                alt="anh"
                                className="flex-1 w-[30%] rounded-md"
                                onClick={() => handlerClickItem(item)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
