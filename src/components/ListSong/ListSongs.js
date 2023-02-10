import React from "react";
import { memo } from "react";

import ListSong from "./ListSong";
import icons from "../../ultis/icon";
import moment from "moment";
import { useSelector } from "react-redux";

const { BsDot } = icons;

const ListSongs = ({ totalDuration }) => {

    const songData = useSelector((state) => state.music)
    console.log(songData);

    let durationHour = moment.utc(totalDuration * 1000).format("HH");
    let durationMinute = moment.utc(totalDuration * 1000).format("mm");
    return (
        <div className="w-full flex flex-col text-xs text-gray-600 ">
            <div className="flex justify-between items-center font-semibold p-[10px]">
                <span>Bai hát</span>
                <span>Album</span>
                <span>Thời gian</span>
            </div>
            <div className="flex flex-col">
                {songData?.map((item) => (
                    <ListSong key={item.encodeId} songData={item} />
                ))}
            </div>
            <div className="flex items-center border border-t-gray-300 py-[10px]">
                <span>{`${songData?.length} bài hát`}</span>
                <BsDot size={24} />
                <span>{`${durationHour} giờ ${durationMinute} phút`}</span>
            </div>
        </div>
    );
};

export default memo(ListSongs);
