import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import "../../UI/Glassmorphism.scss";
import { Header, Player, SidebarLeft, SidebarRight } from "../../components";

const Public = (props) => {
    const [isShowSideBarRight, setIsShowSideBarRight] = useState(true)
    return (
        <div className="w-full flex flex-col relative">
            <div className="w-full h-screen flex flex-auto relative ">
                <div className="1200:w-[240px] w-[70px] flex-none glass shadow-2xl">
                    <SidebarLeft />
                </div>
                <div className="flex-auto flex flex-col pb-[90px]">
                    <div
                        className={`h-[70px] 1200:px-[59px] flex-none items-center glass z-40 `}
                    >
                        <Header />
                    </div>
                    <div className="flex-auto w-full overflow-scroll scrollbar-none ">
                        <Outlet />
                    </div>
                </div>
                {isShowSideBarRight && (
                    <div className="w-[329px] flex flex-none max-1200:absolute right-0 top-0 bottom-0 animate-slide-left bg-[#282828] z-40  pb-[90px]">
                        <SidebarRight />
                    </div>
                )}
            </div>
            <div className="h-[90px] fixed w-full bottom-0 !z-50">
                <Player setIsShowSideBarRight={setIsShowSideBarRight} />
            </div>
        </div>
    );
};

export default Public;
