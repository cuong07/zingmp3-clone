import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import mp3logo from "../../assets/mp3logo.svg";
import path from "../../ultis/path";

import { sidebarMenu } from "../../ultis/menu";

const notActiveStyle =
    "py-2 px-[25px] font-bold flex items-center gap-4 text-[#32323D] text-[13px] h-[50px] ";
const activeStyle =
    "py-2 px-[25px] font-bold flex items-center gap-4 text-[#0F7070] text-[13px] h-[50px] ";

const SidebarLeft = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-full bg-main-200  ">
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
            <div className="flex flex-col  ">
                {sidebarMenu.map((item) => (
                    <NavLink
                        key={item.path}
                        s
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
        </div>
    );
};

export default SidebarLeft;
