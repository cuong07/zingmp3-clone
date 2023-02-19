import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";

import * as apis from "../../apis";
import ListSongs from "../../components/ListSong/ListSongs";
import musicSlide from "../../store/musicSlice";
import LoadingPage from "../../UI/LoadingPage";
import homeSlice from "../../store/homeSlice";
import { AudioLoader } from "../../components";
import { FaPlay } from "react-icons/fa";

const Album = () => {
    const { title, playlistid } = useParams();

    const dispatch = useDispatch();
    const { songs, isPlaying } = useSelector((state) => state.music);
    const { isLoadingPage } = useSelector((state) => state.home);

    console.log(songs);

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            dispatch(homeSlice.actions.setIsLoadingPage(true));
            const response = await apis.apiGetDetailPlaylist(playlistid);
            if (response.data.err === 0) {
                dispatch(musicSlide.actions.setSongs(response?.data?.data));
            }
            dispatch(homeSlice.actions.setIsLoadingPage(false));
        };
        fetchDetailPlaylist();
    }, [playlistid]);
    const artists = songs?.artists?.map((item) => item)

    let AlbumContent = (
        <>
            <div className="flex w-full h-full gap-8 p-[59px]">
                <div className="flex-none flex w-1/5 flex-col items-center gap-2 ">
                    <div className="w-full relative">
                        <img
                            className={`w-full object-contain rounded-md duration-500 ease-in-out delay-2000 ${isPlaying
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
                                <span className="p-3 rounded-full border border-white text-white">
                                    <FaPlay />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-[20px] font-bold text-main-text text-center">
                            {songs?.title}
                        </h3>
                        <span className="text-[#ffffff80] text-[12px] text-center">
                            {" "}
                            Cập Nhật:
                            <span>
                                {" "}
                                {moment
                                    .unix(songs?.contentLastUpdate)
                                    .format("DD/MM`/YYYY")}
                            </span>
                        </span>
                        <span className="text-center">
                            {songs?.artists?.map((item) => (
                                <span
                                    key={item.id}
                                    className="text-[#ffffff80] text-[12px]"
                                >
                                    {item.name} ,
                                </span>
                            ))}
                        </span>
                        <span className="text-[#ffffff80] text-[12px]">{`${Math.round(
                            songs?.like / 1000
                        )}K Lượt yêu thích`}</span>
                    </div>
                </div>
                <Scrollbars autoHide className="w-ful bg-transparent">
                    <div className="flex-auto overflow-y-auto mb-11 ">
                        <span>
                            <span className="text-[14px] text-[#696969]">
                                Lời tựa
                            </span>
                            <span className="text-[14px] text-main-text ">
                                {" "}
                                {songs?.sortDescription}
                            </span>
                        </span>
                        <ListSongs totalDuration={songs?.song?.totalDuration} />
                    </div>
                </Scrollbars>
            </div>
            <div className="px-[59px] flex gap-5 mt-12 flex-col">
                <div className="flex justify-between">
                    <h1 className="text-main-text capitalize font-semibold">Nghệ sĩ tham gia</h1>
                    <span>Tất cả</span>
                </div>
                <div className="flex gap-5">
                    {artists?.map((item) => (
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="rounded-full overflow-hidden">
                                <img src={item.thumbnailM} alt="" className="hover:scale-110 duration-500 " />
                            </div>
                            <span className="flex flex-col gap-1 text-center">
                                <span className="text-[14px] text-main-text">{item.alias}</span>
                                <span className="text-xs text-[#ffffff80]">{item.totalFollow > 1000 ? `${Math.round(item.totalFollow / 1000)}K quan tâm` : `${item.totalFollow} quan tâm`}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <>
            {isLoadingPage &&
                ReactDOM.createPortal(
                    <LoadingPage />,
                    document.getElementById("loading")
                )}
            {!isLoadingPage && AlbumContent}
        </>
    );
};

export default Album;
