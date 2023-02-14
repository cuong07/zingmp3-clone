import React from 'react'
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ArtistThem = () => {

    const artistTheme = useSelector((state) => state.home.artistTheme);
    console.log(artistTheme);

    const navigate = useNavigate();

    const handleClickPlaylist = (item) => {
        const albumPath = item?.link?.split(".")[0];
        navigate(albumPath);
    };

    let artist = artistTheme?.items?.slice(0, 5);
    return (
        <div className="mt-12 px-[59px] flex flex-col gap-5">
            <div className="flex items-center justify-between ">
                <h3 className="text-5 font-bold text-main-text capitalize ">
                    {artistTheme.title}
                </h3>
                <span
                    className="text-xs uppercase text-main-text cursor-pointer"
                    title="more"
                >
                    Tất cả
                </span>
            </div>
            <div className="flex justify-between ">
                {artist?.map((item) => (
                    <div
                        className="px-[14px] flex-1 flex flex-col gap-1 cursor-pointer "
                        key={item.encodeId}
                        onClick={() => handleClickPlaylist(item)}
                    >
                        <img
                            className="rounded-md"
                            src={item.thumbnailM}
                            alt="thumbnail"
                        />
                        <h4 className="text-[14px] text-main-text">
                            {item.title}
                        </h4>
                        <p className="text-[14px] text-[#ffffff80]">
                            {item.sortDescription}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(ArtistThem);