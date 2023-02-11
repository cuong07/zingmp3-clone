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

const Playlist = () => {
    const songs = useSelector((state) => state.music.songs);
    const { isLoadingPage } = useSelector((state) => state.home);
    const { title, playlistid } = useParams();

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
        <div className="flex w-full h-full gap-8 p-[59px]">
            <div className="flex-none flex w-1/5 flex-col items-center gap-2 ">
                <img
                    className="w-full object-contain rounded-md shadow-md"
                    src={songs?.thumbnailM}
                    alt="thumbnail"
                />
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-[20px] font-bold text-gray-800">
                        {songs?.title}
                    </h3>
                    <span className="text-gray-600 text-[12px] text-center">
                        {" "}
                        Cập Nhật:
                        <span> {responseDate}</span>
                    </span>
                    <span className="text-center">
                        {songs?.artists?.map((item) => (
                            <span
                                key={item.id}
                                className="text-gray-600 text-[12px]"
                            >
                                {item.name} ,
                            </span>
                        ))}
                    </span>
                    <span className="text-gray-600 text-[12px]">{`${Math.round(
                        songs.like / 1000
                    )}K Lượt yêu thích`}</span>
                </div>
            </div>
            <Scrollbars className="w-full h-[80%]">
                <div className="flex-auto overflow-y-auto mb-11 ">
                    <span>
                        <span className="text-[14px] text-[#696969]">
                            Lời tựa
                        </span>
                        <span className="text-[14px] ">
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
