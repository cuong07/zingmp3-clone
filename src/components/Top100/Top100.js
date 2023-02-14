import React from 'react'
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Top100 = () => {

    const top100 = useSelector((state) => state.home.top100);
    console.log(top100);

    const navigate = useNavigate();

    const handleClickPlaylist = (item) => {
        const albumPath = item?.link?.split(".")[0];
        navigate(albumPath);
    };

    let topSongs = top100?.items?.slice(0, 5);
    return (
        <div className="mt-12 px-[59px] flex flex-col gap-5">
            <div className="flex items-center justify-between ">
                <h3 className="text-5 font-bold text-main-text capitalize ">
                    {top100.title}
                </h3>
                <span
                    className="text-xs uppercase text-main-text cursor-pointer"
                    title="more"
                >
                    Tất cả
                </span>
            </div>
            <div className="flex justify-between ">
                {topSongs?.map((item) => (
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
                            {`${item.sortDescription.length > 60 ? item?.sortDescription.slice(0, 60) : item.sortDescription}...`}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Top100);