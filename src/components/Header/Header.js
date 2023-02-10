import React from "react";
import Setting from "./Setting";
import icons from "../../ultis/icon";
import Search from "./Search";

const { HiArrowNarrowLeft, HiArrowNarrowRight } = icons;

const Header = () => {
    return (
        <div className="flex justify-between w-full items-center">
            <div className="flex gap-5 w-full items-center ">
                <div className="flex text-gray-400 gap-5">
                    <span>
                        <HiArrowNarrowLeft size={24} />
                    </span>
                    <span>
                        <HiArrowNarrowRight size={24} />
                    </span>
                </div>
                <div className="w-1/2 ">
                    <Search />
                </div>
            </div>
            <div>
                <Setting />
            </div>
        </div>
    );
};

export default Header;
