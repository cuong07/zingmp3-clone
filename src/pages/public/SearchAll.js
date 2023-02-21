import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SongItem } from "../../components";
import SectionItem from "../../components/Section/SectionItem";

const SearchAll = () => {
    const navigate = useNavigate();
    const { searchAll } = useSelector((state) => state.search);

    console.log(searchAll);

    const handleClickPlaylist = (item) => {
        if (item?.subType === 1) {
            const albumPath = item?.link?.split(".")[0];
            navigate(albumPath);
        }
    };
    return (
        <div className="flex flex-col px-[59px]">
            {/* Nổi bật */}
            <div className="flex flex-col gap-3 mt-12">
                <div className="flex justify-between">
                    <h3 className="text-lg text-main-text uppercase font-semibold">
                        Nổi bật
                    </h3>
                </div>
                <div className="flex flex-wrap">
                    {searchAll?.songs?.slice(0, 3)?.map((item) => (
                        <SongItem
                            key={item.encodeId}
                            id={item.encodeId}
                            image={item.thumbnail}
                            title={item.title}
                            artist={item.artistsNames}
                            styleImage="w-[60px] h-[60px]"
                            style="w-1/3 mt-2 h-auto"
                            type="Bài hát"
                        />
                    ))}
                </div>
            </div>
            {/* Bài hát */}
            <div className="flex flex-col gap-3 mt-12">
                <div className="flex justify-between">
                    <h3 className="text-lg text-main-text uppercase">
                        Bài Hát
                    </h3>
                    <span className="text-sm text-[#ffffff80] uppercase">
                        tất cả
                    </span>
                </div>
                <div className="flex flex-wrap">
                    {searchAll?.songs?.slice(0, 6)?.map((item) => (
                        <SongItem
                            key={item.encodeId}
                            id={item.encodeId}
                            image={item.thumbnail}
                            title={item.title}
                            artist={item.artistsNames}
                            styleImage="w-[60px]"
                            style="w-1/2 mt-2"
                        />
                    ))}
                </div>
            </div>
            {/* Playlist/album */}

            <div className="mt-12 flex flex-col gap-5">
                <div className="flex items-center justify-between ">
                    <h3 className="text-5 font-bold text-main-text uppercase ">
                        playlist/album
                    </h3>
                    <span
                        className="text-xs uppercase text-main-text cursor-pointer"
                        title="more"
                    >
                        Tất cả
                    </span>
                </div>
                <div className="flex justify-between ">
                    {searchAll?.playlists?.slice(0, 5).map((item) => (
                        <SectionItem
                            key={item.encodeId}
                            item={item}
                            handleClickPlaylist={handleClickPlaylist}
                        />
                    ))}
                </div>
            </div>

            <div></div>
            <div></div>
        </div>
    );
};

export default SearchAll;
