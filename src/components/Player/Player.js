import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../../apis";
import musicSlide from "../../store/musicSlice";
import icons from "../../ultis/icon";
import mp3logo from "../../assets/mp3logo.svg";
import moment from "moment";
import { toast } from "react-toast";
import Loading from "../../../src/UI/Loading";
import "./InputSlider.scss";

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
    BsMic,
    FaRegWindowRestore,
    BsFillVolumeUpFill,
    BsFillVolumeOffFill,
    BsMusicNoteList,
} = icons;

var intervalId;
var volume;

const Player = ({ setIsShowSideBarRight, isShowSideBarRight }) => {
    const { curSongId, isPlaying, isLoadingSong, songs } = useSelector(
        (state) => state.music
    );

    const [duration, setDuration] = useState(0);
    const [timeCur, setTimeCur] = useState(0);
    const [audio, setAudio] = useState(new Audio());
    const [songInfo, setSongInfo] = useState(null);
    const [isLike, setIsLike] = useState(false);
    const [isRand, setIsRand] = useState(false);

    const thumbRef = useRef();
    const trackRef = useRef();
    const volumeRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        intervalId && clearInterval(intervalId);
        setTimeCur(0);
        const fetchData = async () => {
            dispatch(musicSlide.actions.setIsLoadingSong(true));
            const [songResponse, detailResponse] = await Promise.all([
                apis.apiGetSong(curSongId),
                apis.apiGetDetailSong(curSongId),
            ]);
            dispatch(musicSlide.actions.setIsLoadingSong(false));
            if (songResponse?.data.err === 0) {
                audio.pause();
                if (songResponse?.data?.data["128"]) {
                    console.log(songResponse?.data?.data["128"]);
                    setAudio(new Audio(songResponse?.data?.data["128"]));
                } else {
                    handlerNextSong();
                }
            }
            if (detailResponse?.data.err === 0) {
                dispatch(
                    musicSlide.actions.getDetailSongId(
                        detailResponse?.data.data
                    )
                );
                setSongInfo(detailResponse?.data.data);
                setDuration(detailResponse?.data?.data?.duration);
            } else {
                setAudio(new Audio());
                dispatch(musicSlide.actions.setIsPlaying(false));
                toast.warn(songResponse?.data?.msg);
            }
        };
        fetchData();
    }, [curSongId]);

    useEffect(() => {
        intervalId && clearInterval(intervalId);
        if (isPlaying) {
            play();
            intervalId = setInterval(() => {
                let percent =
                    Math.round(
                        (audio.currentTime * 10000) / songInfo?.duration
                    ) / 100;
                setTimeCur(Math.round(audio.currentTime));
                thumbRef.current.style.cssText = `right: ${100 - percent}%`
            }, 200);
            if (timeCur === duration) {
                setTimeCur(0);
            }
        }
    }, [audio, isPlaying]);

    const play = async () => {
        await audio.play();
    };

    useEffect(() => {
        audio.load();
        if (isPlaying) play();
    }, [audio]);

    const handlerTogglePlayMusic = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(musicSlide.actions.setIsPlaying(false));
        } else {
            play();
            dispatch(musicSlide.actions.setIsPlaying(true));
        }
    };

    const handlerToggleLike = () => {
        setIsLike(!isLike);
    };

    const handlerClickProgressbar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect();
        const percent =
            Math.round(
                ((e.clientX - trackRect.left) * 10000) / trackRect.width
            ) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        audio.currentTime = (percent * duration) / 100;
        setTimeCur(Math.round((percent * duration) / 100));
        dispatch(musicSlide.actions.setIsPlaying(true));
    };

    const handlerRandSong = () => {
        if (songs) {
            let min = Math.ceil(0);
            let max = Math.floor(songs?.song?.items.length);
            let handlerCurSongIndex = Math.floor(
                Math.random() * (max - min) + min
            );
            dispatch(
                musicSlide.actions.setCurSongId(
                    songs?.song?.items[handlerCurSongIndex].encodeId
                )
            );
        }
    };

    const handlerNextSong = () => {
        if (songs) {
            if (isRand) {
                handlerRandSong();
            } else {
                let handlerCurSongIndex = songs?.song?.items?.findIndex(
                    (item) => curSongId === item.encodeId
                );
                dispatch(
                    musicSlide.actions.setCurSongId(
                        songs?.song?.items[handlerCurSongIndex + 1]?.encodeId
                    )
                );
            }
        }
    };

    const handlerPrevSong = () => {
        if (songs) {
            if (isRand) {
                handlerRandSong();
            } else {
                let handlerCurSongIndex = songs?.song?.items?.findIndex(
                    (item) => curSongId === item.encodeId
                );
                dispatch(
                    musicSlide.actions.setCurSongId(
                        songs?.song?.items[handlerCurSongIndex - 1].encodeId
                    )
                );
            }
        }
    };

    audio.onended = () => {
        handlerNextSong();
    };

    const handlerChangeVolume = () => {
        volume = volumeRef.current.value;
        audio.volume = volume / 100;
    };

    const handlerToggleSideBarRight = () => {
        setIsShowSideBarRight((prev) => !prev);
    };

    return (
        <div className="bg-main-player px-5 h-full flex">
            <div className="w-[30%] flex-auto flex items-center gap-3 ">
                <img
                    src={songInfo?.thumbnail || mp3logo}
                    alt="Chưa chọn bài hát"
                    className={`w-16 h-16 object-cover rounded-md ${isPlaying
                        ? "animate-rotate-center rounded-full"
                        : "animate-rotate-center-pause"
                        }`}
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-main-text text-sm">
                        {songInfo?.title || "Chưa chọn bài nào"}
                    </span>
                    <span className="text-xs text-[#ffffff80]">
                        {songInfo?.artistsNames}
                    </span>
                </div>
                <div className="flex gap-4 pl-2">
                    <span
                        onClick={handlerToggleLike}
                        className="cursor-pointer text-main-text"
                    >
                        {isLike && <AiFillHeart size={18} color="#f44336" />}
                        {!isLike && <AiOutlineHeart size={18} />}
                    </span>
                    <span className="cursor-pointer text-main-text">
                        <BsThreeDots size={18} />
                    </span>
                </div>
            </div>
            <div className="w-[40%] flex-auto items-center justify-center flex flex-col gap-4 py-2 ">
                <div className="flex gap-8 items-center justify-center">
                    <span
                        className={` text-main-text ${songs ? "cursor-pointer" : "cursor-none"
                            } ${isRand ? "text-blue-600" : ""}`}
                        title="Bật phát ngẫu nhiên"
                        onClick={() => {
                            setIsRand(!isRand);
                        }}
                    >
                        <CiShuffle size={18} />
                    </span>
                    <span
                        className={`text-main-text ${songs ? "cursor-pointer" : "cursor-none"
                            }`}
                        onClick={handlerPrevSong}
                    >
                        <IoMdSkipBackward size={18} />
                    </span>
                    <span
                        className="cursor-pointer p-[6px] border border-gray-700 hover:text-main-500 rounded-full text-main-text"
                        onClick={handlerTogglePlayMusic}
                    >
                        {isLoadingSong && <Loading />}
                        {!isLoadingSong && (
                            <span>
                                {!isPlaying && <FaPlay size={26} />}
                                {isPlaying && <FaPause size={26} />}
                            </span>
                        )}
                    </span>

                    <span
                        className="cursor-pointer text-main-text"
                        onClick={handlerNextSong}
                    >
                        <IoMdSkipForward size={18} />
                    </span>
                    <span
                        className="cursor-pointer text-main-text"
                        title="Bật phát lại tất cả"
                    >
                        <CiRepeat size={18} />
                    </span>
                </div>
                <div className="w-full flex justify-center items-center gap-3 text-xs ">
                    <span className="text-main-text">
                        {moment.utc(timeCur * 1000).format("mm:ss")}
                    </span>
                    <div
                        className="w-3/4 h-[3px] relative bg-white rounded-full cursor-pointer hover:h-2"
                        onClick={handlerClickProgressbar}
                        ref={trackRef}
                    >
                        <div
                            ref={thumbRef}
                            className="absolute h-full left-0 top-0 bg-main-500 rounded-full"
                        ></div>
                    </div>
                    <span className="text-main-text">
                        {moment.utc(duration * 1000).format("mm:ss")}
                    </span>
                </div>
            </div>
            <div className="w-[30%] flex-auto text-white flex justify-center gap-5 items-center">
                <span className="flex gap-5">
                    <BsMic size={20} />
                    <FaRegWindowRestore size={20} />
                </span>
                <span className="flex gap-5 items-center">
                    <span>
                        {audio.volume === 0 ? (
                            <BsFillVolumeOffFill size={20} />
                        ) : (
                            <BsFillVolumeUpFill size={20} />
                        )}
                    </span>
                    <input
                        ref={volumeRef}
                        type="range"
                        step="1"
                        max="100"
                        min="0"
                        className="bg-[#ccc] slider"
                        onChange={handlerChangeVolume}
                    />
                </span>
                <span
                    className="cursor-pointer "
                    onClick={handlerToggleSideBarRight}
                >
                    <BsMusicNoteList size={20} />
                </span>
            </div>
        </div>
    );
};

export default Player;
