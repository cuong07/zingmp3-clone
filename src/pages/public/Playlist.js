import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";

import * as apis from "../../apis";
import moment from "moment";
import ListSongs from "../../components/ListSong/ListSongs";
import { useDispatch, useSelector } from "react-redux";
import musicSlide from "../../store/musicSlice";
import LoadingPage from "../../UI/LoadingPage";
import homeSlice from "../../store/homeSlice";
import { AudioLoader } from "../../components";

import icons from "../../ultis/icon";

const Playlist = () => {
    const { songs, isPlaying } = useSelector((state) => state.music);
    const { isLoadingPage } = useSelector((state) => state.home);
    const { title, playlistid } = useParams();

    const { FaPlay } = icons;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(homeSlice.actions.setIsLoadingPage(true));
        const fetchDetailPlaylist = async () => {
            const response = await apis.apiGetDetailPlaylist(playlistid);
            dispatch(musicSlide.actions.setSongs(response?.data?.data));
        };
        dispatch(homeSlice.actions.setIsLoadingPage(false));
        fetchDetailPlaylist();
    }, [playlistid]);
    let responseDate = moment(songs?.contentLastUpdate).format("DD/MM/YYYY");

    let PlaylistContent = (
        <div className="flex w-full h-full max-1200:flex-col gap-8 1200:p-[59px]">
            <div className="flex-none flex 1200:w-1/5 1200:flex-col 1200:items-center gap-2 w-3/4 max-1200:min-w-max">
                <div className="w-full relative max-1200:flex max-1200:w-1/3 ">
                    <img
                        className={`w-full object-contain rounded-md transition-all ease-in-out delay-2000 ${isPlaying
                            ? "animate-rotate-center rounded-full"
                            : "animate-rotate-center-pause"
                            }`}
                        src={songs?.thumbnailM}
                        alt="thumbnail"
                    />
                    <div
                        className={`absolute left-0 top-0 w-full h-full hover:bg-overlay-30 flex items-center justify-center ${isPlaying && "rounded-full"
                            }`}
                    >
                        {isPlaying && (
                            <span className="w-full flex justify-center">
                                <AudioLoader />
                            </span>
                        )}
                        {!isPlaying && (
                            <span className="p-3 rounded-full border border-white text-white ">
                                <FaPlay />
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-[20px] font-bold text-main-text">
                        {songs?.title}
                    </h3>
                    <span className="text-main-text text-[12px] text-center">
                        {" "}
                        Cập Nhật:
                        <span> {responseDate}</span>
                    </span>
                    <span className="text-center">
                        {songs?.artists?.map((item) => (
                            <span
                                key={item.id}
                                className="text-main-text text-[12px]"
                            >
                                {item.name} ,
                            </span>
                        ))}
                    </span>
                    <span className="text-main-text text-[12px]">{`${Math.round(
                        songs?.like / 1000
                    )}K Lượt yêu thích`}</span>
                </div>
            </div>
            <Scrollbars className="w-full h-[80%]">
                <div className="flex-auto overflow-y-auto mb-11 ">
                    <span>
                        <span className="text-[14px] text-[#696969]">
                            Lời tựa
                        </span>
                        <span className="text-[14px]  text-main-text ">
                            {" "}
                            {songs?.sortDescription}
                        </span>
                    </span>
                    <ListSongs
                        songData={songs?.song?.items}
                        totalDuration={songs?.song?.totalDuration}
                    />
                </div>
            </Scrollbars>
        </div>

    );
    return (
        <>
            {isLoadingPage && <LoadingPage />}
            {!isLoadingPage && PlaylistContent}
        </>
    );
};

export default Playlist;
