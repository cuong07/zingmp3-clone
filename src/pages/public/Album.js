import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import ListSongs from "../../components/ListSong/ListSongs";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import musicSlide from "../../store/musicSlice";

const Album = () => {
    const { title, playlistid } = useParams();

    const dispatch = useDispatch();
    const playlistData = useSelector((state) => state.music.songs);

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const response = await apis.apiGetDetailPlaylist(playlistid);
            console.log(response);
            if (response.data.err === 0) {
                dispatch(musicSlide.actions.setSongs(response?.data?.data));
            }
        };
        fetchDetailPlaylist();
    }, [playlistid]);

    return (
        <>
            <div className="flex w-full h-full gap-8 p-[59px]">
                <div className="flex-none flex w-1/5 flex-col items-center gap-2 ">
                    <img
                        className="w-full object-contain rounded-md shadow-md"
                        src={playlistData?.thumbnailM}
                        alt="thumbnail"
                    />
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-[20px] font-bold text-gray-800">
                            {playlistData?.title}
                        </h3>
                        <span className="text-gray-600 text-[12px] text-center">
                            {" "}
                            Cập Nhật:
                            <span>
                                {" "}
                                {moment
                                    .unix(playlistData?.contentLastUpdate)
                                    .format("DD/MM`/YYYY")}
                            </span>
                        </span>
                        <span className="text-center">
                            {playlistData?.artists?.map((item) => (
                                <span
                                    key={item.id}
                                    className="text-gray-600 text-[12px]"
                                >
                                    {item.name} ,
                                </span>
                            ))}
                        </span>
                        <span className="text-gray-600 text-[12px]">{`${Math.round(
                            playlistData.like / 1000
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
                                {playlistData?.sortDescription}
                            </span>
                        </span>
                        <ListSongs
                            totalDuration={playlistData?.song?.totalDuration}
                        />
                    </div>
                </Scrollbars>
            </div>
        </>
    );
};

export default Album;
