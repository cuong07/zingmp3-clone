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
    const artists = songs?.artists?.map((item) => item);

    let AlbumContent = (
        <>
            <div className="flex w-full h-full max-1200:flex-col gap-8 1200:p-[59px]">
                <div className="flex-none flex 1200:w-1/5 1200:flex-col 1200:items-center gap-2 w-3/4 max-1200:min-w-max max-438:hidden">
                    <div className="w-full relative max-1200:flex max-1200:w-1/3 ">
                        <img
                            className={`w-full object-contain rounded-md duration-1000 ease-in-out ${isPlaying
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
                    <div className="flex flex-col 1200:items-center 1200:justify-center">
                        <h3 className="text-[20px] font-bold text-main-text 1200:text-center">
                            {songs?.title}
                        </h3>
                        <span className="text-[#ffffff80] text-[12px] 1200:text-center">
                            {" "}
                            Cập Nhật:
                            <span>
                                {" "}
                                {moment
                                    .unix(songs?.contentLastUpdate)
                                    .format("DD/MM`/YYYY")}
                            </span>
                        </span>
                        <span className="1200:text-center">
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
                    <div className="flex-auto overflow-y-auto mb-11 max-438:min-w-max ">
                        <span className="max-1200:hidden">
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
            <div className="px-[59px] flex gap-5 mt-12 flex-col max-438:hidden">
                <div className="flex justify-between text-main-text">
                    <h1 className=" capitalize font-semibold">
                        Nghệ sĩ tham gia
                    </h1>
                    <span>Tất cả</span>
                </div>
                <div className="flex gap-5">
                    {artists?.map((item) => (
                        <div
                            className="w-1/5 flex flex-col gap-4 justify-center items-center"
                            key={item.alias}
                        >
                            <div className="rounded-full overflow-hidden">
                                <img
                                    src={item.thumbnailM}
                                    alt=""
                                    className="hover:scale-110 duration-500 rounded-full"
                                />
                            </div>
                            <span className="flex flex-col gap-1 text-center">
                                <span className="text-[14px] text-main-text">
                                    {item.alias}
                                </span>
                                <span className="text-xs text-[#ffffff80]">
                                    {item.totalFollow > 1000
                                        ? `${Math.round(
                                            item.totalFollow / 1000
                                        )}K quan tâm`
                                        : `${item.totalFollow} quan tâm`}
                                </span>
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
