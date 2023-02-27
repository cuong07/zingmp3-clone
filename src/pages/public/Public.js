import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import "../../UI/Glassmorphism.scss";
import { Header, Player, SidebarLeft, SidebarRight } from "../../components";

const Public = (props) => {
    // const [scroll, setScroll] = useState(false);
    const [isShowSideBarRight, setIsShowSideBarRight] = useState(true);
    // useEffect(() => {
    //     window.addEventListener("scroll", () => {
    //         setScroll(window.scrollY > 0);
    //     });
    // }, []);

    return (
        <div className="w-full flex flex-col relative">
            <div className="w-full h-screen flex flex-auto ">
                <div className="1200:w-[240px] w-[70px] flex-none glass shadow-2xl">
                    <SidebarLeft />
                </div>
                <div className="flex-auto flex flex-col pb-[90px]">
                    <div
                        className={`h-[70px] px-[59px] flex-none items-center max-640:hidden glass z-50 `}
                    >
                        <Header />
                    </div>
                    <div className="flex-auto w-full overflow-auto scrollbar-none">
                        <Outlet />
                    </div>
                </div>
                {isShowSideBarRight && (
                    <div className="w-[329px] flex flex-none animate-slide-left glass overflow-hidden pb-[90px]">
                        <SidebarRight />
                    </div>
                )}
            </div>
            <div className="h-[90px] fixed w-full bottom-0">
                <Player setIsShowSideBarRight={setIsShowSideBarRight} />
            </div>
        </div>
    );
};

export default Public;
