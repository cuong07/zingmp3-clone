import React, { useEffect, useState } from "react";

import icons from "../../ultis/icon";
import { apiSearch } from "../../apis";
import { useDispatch } from "react-redux";
import searchSlice from "../../store/searchSilce";
import { useNavigate } from "react-router-dom";

const { BiSearch } = icons;

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        window.addEventListener("keyup", handlerSearch);
        return () => {
            window.removeEventListener("keyup", handlerSearch);
        };
    }, [keyword]);

    const handlerSearch = async (e) => {
        if (e.keyCode === 13) {
            const response = await apiSearch(keyword);
            setKeyword("");
            dispatch(searchSlice.actions.setSearchAll(response.data.data));
            navigate({
                pathname: "/tim-kiem/tat-ca",
            });
        }
    };

    return (
        <div className="w-full flex items-center text-gray-500 ">
            <span className="h-10 pl-4 rounded-l-[20px]  flex items-center justify-center">
                <BiSearch size={20} />
            </span>
            <input
                type="text"
                value={keyword}
                className="outline-none px-4 py-2 bg-transparent text-main-text h-10 w-full rounded-r-[20px]  "
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát...."
                onChange={(e) => {
                    setKeyword(e.target.value);
                }}
            />
        </div>
    );
};

export default Search;
