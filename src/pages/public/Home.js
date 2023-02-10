import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Slider } from "../../components";
import * as apis from "../../apis/home";
import homeSlice from "../../store/homeSlice";

const Home = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDataHome = async () => {
            const response = await apis.getHome();
            console.log(response);
            if (response) {
                dispatch(homeSlice.actions.getBanner(response.data.data));
            } else {
                console.log(Error);
            }
        };
        fetchDataHome();
    }, []);

    return (
        <div className="overflow-y-auto w-full">
            <Slider />
        </div>
    );
};

export default Home;
