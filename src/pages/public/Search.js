import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { searchMenu } from "../../ultis/search";

const Search = () => {
    let styleNav =
        "hover:text-main-text border-b-red-700 hover:border-b h-full";
    let styleNavActive =
        "hover:text-main-text border-b-red-700 hover:border-b h-full border-b-red-700 border-b text-main-text";

    return (
        <div>
            <div className="flex border-b-[#ffffff20] w-full border-b-2 ">
                <h3 className="text-2xl pr-5 text-main-text border-r-2 px-[59px]">
                    Kết quả tìm kiếm
                </h3>
                <div className="flex text-sm py-[14px] uppercase text-[#ffffff80] gap-6 pl-4">
                    {searchMenu?.map((item) => (
                        <NavLink
                            key={item.path}
                            className={({ isActive }) =>
                                isActive ? styleNavActive : styleNav
                            }
                            to={item.path}
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Search;
