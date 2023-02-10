import React from "react";
import icons from "../../ultis/icon";

const { AiTwotoneSetting, CgProfile } = icons;

const Setting = () => {
    return (
        <div className="flex gap-6 items-center text-gray-500">
            <span className="hover:cursor-pointer ">
                <AiTwotoneSetting size={20} />
            </span>
            <span className="hover:cursor-pointer ">
                <CgProfile size={20} />
            </span>
        </div>
    );
};

export default Setting;
