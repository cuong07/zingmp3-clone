import React from "react";
import icons from "../../ultis/icon";

const { BiSearch } = icons;

const Search = () => {
    return (
        <div className="w-full flex items-center text-gray-500 ">
            <span className="h-10 pl-4 rounded-l-[20px]  bg-[#DDE4E4] flex items-center justify-center">
                <BiSearch size={20} />
            </span>
            <input
                type="text"
                className="outline-none px-4 py-2 bg-[#DDE4E4] h-10 w-full rounded-r-[20px]  "
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát...."
            />
        </div>
    );
};

export default Search;
