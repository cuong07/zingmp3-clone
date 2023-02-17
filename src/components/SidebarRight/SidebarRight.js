import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import icons from "../../ultis/icon";
import { AudioPlay, SongItem } from "../../components";
import mp3logo from "../../assets/mp3logo.svg";
import Scrollbars from "react-custom-scrollbars-2";
const { BsAlarm, BsThreeDots } = icons;

var songsList;

const SidebarRight = () => {
    const { songs, detailSongId, isPlaying, curSongId, atAlbum } = useSelector(
        (state) => state.music
    );

    useEffect(() => {
        const getPlaylistSongs = async () => {
            let songsCurIndex = await songs?.song?.items.findIndex(
                (item) => item.encodeId === curSongId
            );
            let playlistSongs = await songs?.song?.items?.filter(
                (item) => item.encodeId !== curSongId
            );
            let playlistSongs_new1 = await playlistSongs?.slice(
                0,
                songsCurIndex
            );
            let playlistSongs_new2 = await playlistSongs?.slice(
                songsCurIndex,
                playlistSongs.length
            );
            songsList = playlistSongs_new2?.concat(playlistSongs_new1);
        };
        getPlaylistSongs();
    }, [curSongId, songs, atAlbum]);

    return (
        <div className="w-full h-full flex flex-col gap-2">
            <div className="flex flex-none text-white justify-around w-full h-[70px] items-center ">
                <span className="flex text-xs gap-2 rounded-3xl p-[3px] bg-[#3e3e3e] w-[233px] h-[34px] justify-center">
                    <span className="w-1/2 cursor-pointer text-xs py-[5px] bg-[#787878] rounded-3xl flex justify-center">
                        Danh sách phát
                    </span>
                    <span className="w-1/2 cursor-pointer text-xs py-[5px] flex justify-center ">
                        Nghe gần đây
                    </span>
                </span>
                <span className="flex gap-3 items-center">
                    <BsAlarm size={18} />
                    <BsThreeDots size={18} />
                </span>
            </div>
            <div className="px-[8px]  w-full h-full">
                <div className="flex gap-3 p-2 bg-[#9b4de0] rounded-md h-[56px] justify-around items-center">
                    <div className="w-full flex gap-3 items-center ">
                        <div className="relative">
                            <img
                                src={detailSongId?.thumbnailM || mp3logo}
                                alt="thumbnail"
                                className="w-10 h-10 rounded-md"
                            />
                            <div className="absolute w-full top-0 left-0 hover:bg-slate-500"></div>
                        </div>
                        <span className="flex flex-col items-center">
                            <span className="text-[14px] text-main-text">
                                {detailSongId?.title?.length > 20
                                    ? `${detailSongId?.title?.slice(0, 20)}...`
                                    : detailSongId?.title ||
                                      "Chưa chọn bài hát"}
                            </span>
                            <span>
                                <span className="text-xs text-[#ffffff80]"></span>
                            </span>
                        </span>
                    </div>
                    <span className="flex items-center">
                        {isPlaying && <AudioPlay />}
                    </span>
                </div>
                <div className="w-full h-full flex flex-col gap-4 relative ">
                    <div className="flex text-main-text flex-col text-[14px]">
                        <span className="font-semibold font-xs">
                            Tiếp theo{" "}
                        </span>
                        <span className="flex">
                            <span className="w-1/4">Từ playlist:</span>{" "}
                            <span className="text-blue-400">
                                {" "}
                                {songs?.title?.length >= 30
                                    ? `${songs?.title?.slice(0, 30)}...`
                                    : songs?.title ||
                                      "Chưa chọn Playlist nào..."}
                            </span>
                        </span>
                    </div>
                    <div className="p-2 overflow-scroll scrollbar-none">
                        {songsList?.map((item) => (
                            <SongItem
                                key={item.encodeId}
                                id={item.encodeId}
                                title={item.title}
                                artist={item.artistsNames}
                                image={item.thumbnailM}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarRight;
