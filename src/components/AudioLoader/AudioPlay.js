import React from "react";
import { memo } from "react";
import { Audio } from "react-loader-spinner";

const AudioPlay = () => {
    return (
        <Audio
            height="20"
            width="20"
            color="#4fa94d"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    );
};

export default memo(AudioPlay);
