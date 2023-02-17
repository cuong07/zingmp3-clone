import React from "react";

const Button = ({ text, style }) => {
    return (
        <button
            type="button"
            className={
                style ? style : "py-1 px-4 rounded-3xl border bg-transparent"
            }
        >
            {text}
        </button>
    );
};

export default Button;
