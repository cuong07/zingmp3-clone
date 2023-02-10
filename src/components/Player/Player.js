import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../../apis";
import musicSlide from "../../store/musicSlice";
import icons from "../../ultis/icon";
import mp3logo from "../../assets/mp3logo.svg";
import moment from "moment";
import { toast } from "react-toast";


const {
    AiFillHeart,
    AiOutlineHeart,
    BsThreeDots,
    CiRepeat,
    IoMdSkipBackward,
    IoMdSkipForward,
    CiShuffle,
    FaPlay,
    FaPause,
} = icons;

var intervalId;

const Player = () => {
    const { curSongId, isPlaying, atAlbum } = useSelector((state) => state.music);

    const [duration, setDuration] = useState(0);
    const [timeCur, setTimeCur] = useState(0);
    const [audio, setAudio] = useState(new Audio());
    const [songInfo, setSongInfo] = useState(null);
    const [isLike, setIsLike] = useState(false);
    const thumbRef = useRef();
    const trackRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const [songResponse, detailResponse] = await Promise.all([
                apis.apiGetSong(curSongId),
                apis.apiGetDetailSong(curSongId)
            ]);
            if (songResponse?.data.err === 0) {
                audio.pause();
                console.log(songResponse?.data?.data);
                setAudio(new Audio(songResponse?.data?.data["128"]));
            }
            if (detailResponse?.data.err === 0) {
                setSongInfo(detailResponse?.data.data);
                setDuration(detailResponse?.data.data.duration);
            } else {
                setAudio(new Audio())
                dispatch(musicSlide.actions.setIsPlaying(false));
                toast.warn(songResponse.data.msg)
            }
        };
        fetchData();
    }, [curSongId]);


    useEffect(() => {
        intervalId && clearInterval(intervalId);
        if (isPlaying) {
            audio.play();
            intervalId = setInterval(() => {
                let percent =
                    Math.round(
                        (audio.currentTime * 10000) / songInfo.duration
                    ) / 100;
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;
                setTimeCur(Math.round(audio.currentTime));
            }, 200);
            if (timeCur === duration) {
                setTimeCur(0)
            }
        }
    }, [audio, isPlaying]);

    const handlerTogglePlayMusic = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(musicSlide.actions.setIsPlaying(false));
        } else {
            audio.play();
            dispatch(musicSlide.actions.setIsPlaying(true));
        }
    };
    const handlerToggleLike = () => {
        setIsLike(!isLike);
    };

    const handlerClickProgressbar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect();
        const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        audio.currentTime = percent * duration / 100;
        setTimeCur(Math.round(percent * duration / 100))
        dispatch(musicSlide.actions.setIsPlaying(true))
    }

    const handlerNextSong = () => {

    }

    return (
        <div className="bg-main-400 px-5 h-full flex">
            <div className="w-[30%] flex-auto flex items-center gap-3 ">
                <img
                    src={songInfo?.thumbnail || mp3logo}
                    alt="Chưa chọn bài hát"
                    className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-700 text-sm">
                        {songInfo?.title || "Chưa chọn bài nào"}
                    </span>
                    <span className="text-xs text-gray-500">
                        {songInfo?.artistsNames}
                    </span>
                </div>
                <div className="flex gap-4 pl-2">
                    <span onClick={handlerToggleLike}>
                        {isLike && <AiFillHeart size={18} />}
                        {!isLike && <AiOutlineHeart size={18} />}
                    </span>
                    <span>
                        <BsThreeDots size={18} />
                    </span>
                </div>
            </div>
            <div className="w-[40%] flex-auto items-center justify-center flex flex-col gap-4 py-2 ">
                <div className="flex gap-8 items-center justify-center">
                    <span
                        className="cursor-pointer"
                        title="Bật phát ngẫu nhiên"
                    >
                        <CiShuffle size={18} />
                    </span>
                    <span className={`${atAlbum ? 'cursor-pointer' : 'cursor-none'}`}  >
                        <IoMdSkipBackward size={18} />
                    </span>
                    <span
                        className="cursor-pointer p-[6px] border border-gray-700 hover:text-main-500 rounded-full"
                        onClick={handlerTogglePlayMusic}
                    >
                        {!isPlaying && <FaPlay size={26} />}
                        {isPlaying && <FaPause size={26} />}
                    </span>
                    <span className="cursor-pointer" onClick={handlerNextSong}>
                        <IoMdSkipForward size={18} />
                    </span>
                    <span
                        className="cursor-pointer"
                        title="Bật phát lại tất cả"
                    >
                        <CiRepeat size={18} />
                    </span>
                </div>
                <div className="w-full flex justify-center items-center gap-3 text-xs ">
                    <span>{moment.utc(timeCur * 1000).format("mm:ss")}</span>
                    <div
                        className="w-3/4 h-[3px] relative bg-[rgba(0,0,0,0.1)] rounded-full cursor-pointer hover:h-2"
                        onClick={handlerClickProgressbar}
                        ref={trackRef}
                    >
                        <div
                            ref={thumbRef}
                            className="absolute h-full left-0 top-0 bg-main-500 rounded-full"
                        ></div>
                    </div>
                    <span>
                        {moment
                            .utc(duration * 1000)
                            .format("mm:ss")}
                    </span>
                </div>
            </div>
            <div className="w-[30%] flex-auto border border-red-500 "></div>
        </div>
    );
};

export default Player;
