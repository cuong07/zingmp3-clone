import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import icons from "../../ultis/icon";

const { HiUserAdd } = icons;

const SearchArtist = () => {
    const { artists } = useSelector((state) => state.search);
    const navigate = useNavigate()

    const handlerClickItem = (item) => {
        navigate(item?.link)
    }


    return (
        <div className="px-[59px] mt-12 flex flex-col ">
            <h3 className="text-main-text text-lg font-semibold mb-4">
                Nghệ Sĩ/OA
            </h3>
            <div>
                <div className="flex gap-4 flex-wrap justify-between">
                    {artists?.map((item) => (
                        <div className="w-[20%] flex flex-col gap-2 "
                            onClick={() => handlerClickItem(item)}
                        >
                            <div className="rounded-full overflow-hidden mb-[10px]">
                                <img
                                    src={item.thumbnailM}
                                    alt="thumbnailM"
                                    className="hover:scale-110 duration-500"
                                />
                            </div>
                            <div className="flex flex-col gap-1 text-center">
                                <span className="font-semibold text-sm text-main-text">
                                    {item.name}
                                </span>
                                <span className="text-[#ffffff80] text-sm">
                                    {item.totalFollow > 1000
                                        ? `${Math.round(
                                            item.totalFollow / 1000
                                        )}K quan tâm`
                                        : `${item.totalFollow} quan tâm`}
                                </span>
                            </div>
                            <div className="w-full flex justify-center">
                                <span className="flex gap-1 bg-[#9b4de0] py-[6px] px-[19px] rounded-3xl items-center text-main-text cursor-pointer">
                                    <HiUserAdd size={20} />
                                    <span>quan tâm</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchArtist;
