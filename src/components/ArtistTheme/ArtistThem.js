import React from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SectionItem from "../Section/SectionItem";

const ArtistThem = () => {
    const artistTheme = useSelector((state) => state.home.artistTheme);
    console.log(artistTheme);

    const navigate = useNavigate();

    const handleClickPlaylist = (item) => {
        const albumPath = item?.link?.split(".")[0];
        navigate(albumPath);
    };

    return (
        <div className="mt-12 1200:px-[59px] flex flex-col gap-5">
            <div className="flex items-center justify-between ">
                <h3 className="text-5 font-bold text-main-text capitalize ">
                    {artistTheme?.title}
                </h3>
                <span
                    className="text-xs uppercase text-main-text cursor-pointer"
                    title="more"
                >
                    Tất cả
                </span>
            </div>
            <div className="flex justify-between ">
                {artistTheme?.item?.map((item) => (
                    <SectionItem
                        key={item.encodeId}
                        item={item}
                        handleClickPlaylist={handleClickPlaylist}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(ArtistThem);
