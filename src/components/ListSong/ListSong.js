import moment from "moment";
import React from "react";
import { memo } from "react";
import { useDispatch } from "react-redux";
import musicSlide from "../../store/musicSlice";
import icons from "../../ultis/icon";

const { GiMusicalNotes } = icons;

const ListSong = ({ curIndex, songData }) => {
    const dispatch = useDispatch();

    const getSongIdHandler = (songId) => {
        dispatch(musicSlide.actions.setCurSongId(songId));
        dispatch(musicSlide.actions.setIsPlaying(true));
        dispatch(musicSlide.actions.setAtAlbum(true));
    };

    const durationSong = moment.utc(songData.duration * 1000).format("mm:ss");
    return (
        <div
            className="flex justify-between items-center p-[10px] border-t-2 border-t-[#868686] hover:bg-[#595959] cursor-pointer"
            onClick={() => getSongIdHandler(songData.encodeId)}
        >
            <div className="flex items-center gap-3 flex-1">
                <span>
                    <GiMusicalNotes />
                </span>
                <img
                    src={songData?.thumbnail}
                    alt="thumbnail"
                    className="h-10 w-10 object-cover rounded-md"
                />
                <span className="flex flex-col">
                    <span className="text-sm font-semibold text-main-text">
                        {" "}
                        {songData?.title.length > 30
                            ? `${songData?.title.slice(0, 50)}...`
                            : songData?.title}
                    </span>
                    <span className="text-[#696969">{songData?.artistsNames}</span>
                </span>
            </div>
            <div className="flex-1 flex justify-center items-center text-main-text">
                {songData?.album?.title}
            </div>
            <div className="flex-1 flex justify-end items-center text-main-text ">
                {durationSong}
            </div>
        </div>
    );
};

export default memo(ListSong);
