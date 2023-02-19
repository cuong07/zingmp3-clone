import React from "react";
import { memo } from "react";
import { useSelector } from "react-redux";

const Radio = () => {
    const { radio } = useSelector((state) => state.home);

    const radioList = radio?.items?.slice(0, 7);

    return (
        <div className="px-[59px] mt-12 flex flex-col  gap-5 ">
            <div className="flex justify-between ">
                <h3 className="text-[16px] text-main-text font-semibold">
                    {radio?.title}
                </h3>
                <span className="text-[16px] text-main-text">Tất cả</span>
            </div>
            <div className="flex justify-between">
                {radioList?.map((item) => (
                    <div className="flex-1 px-[14px] flex-col flex gap-2">
                        <div className="w-full relative text-center">
                            <img
                                src={item?.host?.thumbnail}
                                alt="thumbnail"
                                className="rounded-full border-4 border-red-600"
                            />
                            <img
                                src={item?.thumbnail}
                                alt="thumbnail"
                                className="rounded-full w-1/3 absolute right-0 bottom-0"
                            />
                            <span className="absolute -bottom-2 -translate-x-1/2 px-2 py-[2px] bg-red-600 rounded-3xl text-white">
                                LIVE
                            </span>
                        </div>
                        <div className="text-center">
                            <h4 className="text-center w-full text-[16px] font-semibold text-main-text ">
                                {item?.host?.name}
                            </h4>
                            <span className="text-xs text-[#ffffff80]">
                                {item?.activeUsers > 1000
                                    ? ` ${Math.round(
                                        item?.activeUsers / 1000
                                    )}K đang nghe`
                                    : `${item?.activeUsers} đang nghe`}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(Radio);
