import React, { useEffect } from "react";
import { useState } from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import SongItem from "../SongItem/SongItem";

const NewRelease = () => {
    const { newRelease } = useSelector((state) => state.home);
    const [isActived, setIsActived] = useState(0);
    const [newReleaseSongs, setNewReleaseSongs] = useState(null);

    let style = "w-[45%] min-[1024px]:w-[30%] mt-2 h-auto";
    let styleImage = "640:w-[60px] 640:h-[60px] w-20 h-20 ";
    useEffect(() => {
        switch (isActived) {
            case 0:
                setNewReleaseSongs(newRelease?.items?.all.slice(0, 12));
                break;
            case 1:
                setNewReleaseSongs(newRelease?.items?.others.slice(0, 12));
                break;
            case 2:
                setNewReleaseSongs(newRelease?.items?.vPop.slice(0, 12));
                break;
            default:
                break;
        }
        // eslint-disable-next-line no-undef, react-hooks/exhaustive-deps
    }, [isActived]);

    let buttonStyle = "border border-gray-400 py-1 px-4 rounded-2xl text-white";

    return (
        <div className="1200:px-[59px] w-full flex flex-col gap-4">
            <div className="flex justify-between w-full ">
                <h3 className="capitalize text-main-text font-semibold ">
                    {newRelease?.title}
                </h3>
                <span className="uppercase text-xs text-main-text">Tất cả</span>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                    <button
                        className={`${buttonStyle} ${+isActived === 0 ? "bg-[#9b4de0]" : ""
                            }`}
                        onClick={() => setIsActived(0)}
                    >
                        All
                    </button>
                    <button
                        className={`${buttonStyle} ${+isActived === 1 ? "bg-[#9b4de0]" : ""
                            }`}
                        onClick={() => setIsActived(1)}
                    >
                        Quốc tế
                    </button>
                    <button
                        className={`${buttonStyle} ${+isActived === 2 ? "bg-[#9b4de0]" : ""
                            }`}
                        onClick={() => setIsActived(2)}
                    >
                        Việt nam
                    </button>
                </div>
                <div className="flex 640:flex-wrap items-center justify-between  ">
                    {newReleaseSongs?.map((item) => (
                        <SongItem
                            key={item.encodeId}
                            releaseDate={item?.releaseDate}
                            id={item.encodeId}
                            title={item.title}
                            image={item.thumbnailM}
                            artist={item.artistsNames}
                            style={style}
                            styleImage={styleImage}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(NewRelease);
