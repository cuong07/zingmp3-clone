import React from "react";
import { memo } from "react";
import { useSelector } from "react-redux";

const NewRelease = () => {
    const { newRelease } = useSelector((state) => state.home);
    return (
        <div>
            <div>
                <h3>tittle</h3>
            </div>
        </div>
    );
};

export default memo(NewRelease);
