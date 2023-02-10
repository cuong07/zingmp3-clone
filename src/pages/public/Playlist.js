import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";

import * as apis from "../../apis";
import moment from "moment";
import ListSongs from "../../components/ListSong/ListSongs";


const Playlist = () => {
    const { title, playlistid } = useParams();
    const [playlistSong, setPlaylistSong] = useState([]);
    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const response = await apis.apiGetDetailPlaylist(playlistid);
            setPlaylistSong(response.data.data);
        };
        fetchDetailPlaylist();
    }, [playlistid]);
    let responseDate = moment(playlistSong.contentLastUpdate).format(
        "DD/MM/YYYY"
    );
    return (
        <>
            <div className="flex w-full h-full gap-8 p-[59px]">
                <div className="flex-none flex w-1/5 flex-col items-center gap-2 ">
                    <img
                        className="w-full object-contain rounded-md shadow-md"
                        src={playlistSong?.thumbnailM}
                        alt="thumbnail"
                    />
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-[20px] font-bold text-gray-800">
                            {playlistSong?.title}
                        </h3>
                        <span className="text-gray-600 text-[12px] text-center">
                            {" "}
                            Cập Nhật:
                            <span> {responseDate}</span>
                        </span>
                        <span className="text-center">
                            {playlistSong?.artists?.map((item) => (
                                <span
                                    key={item.id}
                                    className="text-gray-600 text-[12px]"
                                >
                                    {item.name} ,
                                </span>
                            ))}
                        </span>
                        <span className="text-gray-600 text-[12px]">{`${Math.round(
                            playlistSong.like / 1000
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
                                {playlistSong?.sortDescription}
                            </span>
                        </span>
                        <ListSongs
                            songData={playlistSong?.song?.items}
                            totalDuration={playlistSong?.song?.totalDuration}
                        />
                    </div>
                </Scrollbars>
            </div>
        </>
    );
};

export default Playlist;
