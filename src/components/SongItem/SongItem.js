import moment from "moment/moment";
import React from "react";
import { memo } from "react";
import { useDispatch } from "react-redux";
import musicSlide from "../../store/musicSlice";

const SongItem = ({
    image,
    title,
    artist,
    id,
    style,
    styleImage,
    releaseDate,
    type,
}) => {
    const dispatch = useDispatch();

    const handlerClickSong = () => {
        dispatch(musicSlide.actions.setCurSongId(id));
        dispatch(musicSlide.actions.setIsPlaying(true));
    };
    return (
        <div
            className={`flex gap-3 hover:bg-[#3e3e3e] items-center p-2 cursor-pointer h-auto ${style ? style : ""
                }`}
            onClick={() => handlerClickSong()}
        >
            <img
                src={image}
                alt={title}
                className={`rounded-md ${styleImage ? styleImage : ""}`}
            />
            <div className="flex flex-col">
                {type && (
                    <span className="text-xs text-[#ffffff80]">{type}</span>
                )}
                <span className="text-[14px] text-main-text">{title}</span>
                <span className="text-xs text-[#ffffff80]">{artist}</span>
                {releaseDate && (
                    <span className="text-xs text-[#ffffff80]">
                        {moment(releaseDate * 1000).fromNow()}
                    </span>
                )}
            </div>
        </div>
    );
};

export default memo(SongItem);
