import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.svg";
import mp3logo from "../../assets/mp3logo.svg";
import path from "../../ultis/path";
import { sidebarMenu } from "../../ultis/menu";
import { navbarItems } from "../../ultis/navbarItems";
import icons from "../../ultis/icon";

const {
    FcMusic,
    FcDoughnutChart,
    FcSignature,
    BsPlusLg
} = icons;

const notActiveStyle =
    "py-2 px-[25px] font-bold flex items-center gap-4 text-[#A0A0A0] text-[13px] h-[50px] ";
const activeStyle =
    "py-2 px-[25px] font-bold flex items-center gap-4 text-white text-[13px] h-[50px] ";

const SidebarLeft = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-full">
            <div
                onClick={() => navigate(path.HOME)}
                className="w-full h-[70px] 1200:py-[15px] 1200:px-[25px] relative flex items-center justify-start cursor-pointer "
            >
                <img
                    src={logo}
                    alt="logo"
                    className="w-[120px] h-10 max-1200:hidden "
                />
                <img src={mp3logo} alt="logo" className="1200:hidden mx-auto" />
            </div>
            <div className="flex flex-col mt-[15px]">
                {sidebarMenu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                            isActive ? activeStyle : notActiveStyle
                        }
                    >
                        <span className="">{item.icon}</span>
                        <span className="1200:flex hidden">{item.text}</span>
                    </NavLink>
                ))}
            </div>
            <div className="h-[1px] bg-[#ffffff80] mx-6"></div>
            <div className="flex flex-col mt-[15px] overflow-scroll scrollbar-none ">
                <div className="w-full">
                    {navbarItems?.map((item) => (
                        <NavLink
                            key={item.text}
                            className={({ isActive }) =>
                                isActive ? activeStyle : notActiveStyle}

                        >
                            <span>{item.icon}</span>
                            <span className="1200:flex hidden">{item.text}</span>
                        </NavLink>
                    ))}
                </div>
                <div className="my-[10px] mx-[20px] bg-gradient-bg-vip rounded-lg px-2 py-[15px] text-center max-1200:hidden">
                    <h3 className="mb-[10px] text-[12px] font-semibold text-main-text ">nghe nhạc không quảng cáo cùng kho nhạc vip</h3>
                    <span className="px-[35px] py-[6px] bg-[#ffdb00] rounded-3xl text-sm font-semibold cursor-pointer ">nâng câp</span>
                </div>
                <div className="px-6 flex flex-col gap-4 mt-[10px]">
                    <p className="text-white font-semibold max-1200:hidden">Thư viện</p>
                    <div className="flex flex-col gap-3">
                        <span className="flex gap-2 text-[#ffffff] ">
                            <FcMusic size={24} />
                            <span className="max-1200:hidden">Bài hát</span>
                        </span>
                        <span className="flex gap-2 text-[#ffffff] ">
                            <FcDoughnutChart size={24} />
                            <span className="max-1200:hidden">Playlist</span>
                        </span>
                        <span className="flex gap-2 text-[#ffffff] ">
                            <FcSignature size={24} />
                            <span className="max-1200:hidden">Gần đây</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center bg-[#333] text-white py-5 fixed right-0 mb-[90px] bottom-0 left-0 gap-1">
                <BsPlusLg />
                <span className="max-1200:hidden">Tạo playlist mới</span>
            </div>
        </div >
    );
};

export default SidebarLeft;
