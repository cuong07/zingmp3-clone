import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import homeSlice from "../../store/homeSlice";

const WeekRank = () => {
    const dispatch = useDispatch();
    const { title, chartId } = useParams();
    const { weekRank } = useSelector((state) => state.home);

    useEffect(() => {
        const fetchWeekRank = async () => {
            const response = await apis.getWeekRank(chartId);
            if (response.data.err === 0) {
                dispatch(homeSlice.actions.getWeekRank(response?.data?.data));
            }
        };
        fetchWeekRank();
    }, [chartId]);
    return (
        <div>
            <div>week rank</div>
        </div>
    );
};

export default WeekRank;
