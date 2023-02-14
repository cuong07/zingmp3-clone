import React, { memo } from "react";
import { Bars } from "react-loader-spinner";

const AudioLoader = () => {
    return (
        <Bars
            height="40"
            width="40"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    );
};

export default memo(AudioLoader);
