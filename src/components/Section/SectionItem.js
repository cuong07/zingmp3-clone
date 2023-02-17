import React from "react";
import { useState } from "react";
import icons from "../../ultis/icon";
const { AiOutlineHeart, FaPlay, BsThreeDots } = icons;

const SectionItem = ({ item, handleClickPlaylist }) => {
    const [isShown, setIsShown] = useState(false);

    return (
        <div
            className="px-[14px] flex-1 flex flex-col gap-1 cursor-pointer "
            onClick={() => handleClickPlaylist(item)}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            <div className="relative overflow-hidden rounded-md">
                <div
                    className={`absolute top-0 left-0 bottom-0 right-0 duration-500 ${
                        isShown ? "bg-[#00000030] z-10 " : ""
                    }`}
                >
                    {isShown && (
                        <span className="w-full h-full flex items-center justify-center gap-5 text-white">
                            <AiOutlineHeart size={20} title="đang update" />
                            <FaPlay size={24} />
                            <BsThreeDots size={20} title="đang update" />
                        </span>
                    )}
                </div>
                <img
                    className={`rounded-md duration-500 ${
                        isShown ? "scale-110" : ""
                    }`}
                    src={item.thumbnailM}
                    alt="thumbnail"
                />
            </div>
            <div>
                <h4 className="text-[14px] text-main-text">{item.title}</h4>
                <p className="text-[14px] text-[#ffffff80]">
                    {item.sortDescription.length >= 40
                        ? `${item.sortDescription.slice(0, 40)}...`
                        : item.sortDescription}
                </p>
            </div>
        </div>
    );
};

export default SectionItem;
