import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Player, SidebarLeft, SidebarRight } from "../../components";

const Public = (props) => {
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 0);
        });
    }, []);

    return (
        <div className="w-full h-screen flex flex-col relative bg-main-300">
            <div className="w-full h-full flex flex-auto mb-[90px]">
                <div
                    className={`1200:w-[240px] w-[70px] flex-none ${scroll ? "sticky top-1" : ""
                        }`}
                >
                    <SidebarLeft />
                </div>
                <div className="flex-auto">
                    <div
                        className={`h-[70px] px-[59px] flex items-center mb-5 max-640:hidden ${scroll ? "shadow-sm fixed bg-main-400 w-full" : ""
                            }`}
                    >
                        <Header />
                    </div>
                    <Outlet />
                </div>
                <div className="w-[329px] hidden 438:flex bg-slate-400 flex-non animate-slide-left max-1600:absolute right-0 z-40 bottom-0 top-0 md:hidden ">
                    <SidebarRight />
                </div>
            </div>
            <div className="h-[90px] fixed w-full bottom-0">
                <Player />
            </div>
        </div>
    );
};

export default Public;
