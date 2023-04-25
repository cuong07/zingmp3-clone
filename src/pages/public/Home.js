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
    ArtistItem,
} from "../../components";
import { useNavigate } from "react-router-dom";
import "swiper/css/pagination";
import "./Home.scss"
import * as apis from "../../apis/home";
import homeSlice from "../../store/homeSlice";
import LoadingPage from "../../UI/LoadingPage";

const Home = (props) => {
    const dispatch = useDispatch();
    const { isLoadingPage, weekRank, artists } = useSelector((state) => state.home);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDataHome = async () => {
            dispatch(homeSlice.actions.setIsLoadingPage(true));
            const response = await apis.getHome();
            console.log(response);
            if (response) {
                dispatch(homeSlice.actions.getBanner(response.data.data));
                dispatch(homeSlice.actions.getPlaylist(response.data.data));
                dispatch(homeSlice.actions.getNewRelease(response.data.data));
                dispatch(homeSlice.actions.getArtistTheme(response.data.data));
                dispatch(homeSlice.actions.getTop100(response.data.data));
                dispatch(homeSlice.actions.getRadio(response.data.data));
                dispatch(homeSlice.actions.getWeekRank(response.data.data));
                dispatch(homeSlice.actions.getChart(response.data.data));
                dispatch(homeSlice.actions.getArtists(response.data.data));
            } else {
                console.log(Error);
            }
            dispatch(homeSlice.actions.setIsLoadingPage(false));
        };
        fetchDataHome();
    }, [dispatch]);

    const handlerClickItem = (item) => {
        const chartPath = item?.link?.split(".")[0];
        navigate(chartPath);
    };

    const artistsSeven = artists?.items?.slice(0, 7)
    return (
        <div className="w-full ">
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
                    <div className="flex flex-col 1200:px-[59px] mt-12 gap-4 overflow-hidden">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-[20px] capitalize text-main-text">Nghệ sĩ</h3>
                            <span className="uppercase text-xs text-white">tất cả</span>
                        </div>
                        <div className="flex gap-4">
                            {artistsSeven?.map((item) => (
                                <ArtistItem item={item.artists[0]} key={item.encodeId} />
                            ))}
                        </div>
                    </div>
                    <div className="flex px-[59px] mt-12 gap-4 justify-between max-438:hidden">
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
