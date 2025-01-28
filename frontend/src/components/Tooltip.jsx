import React from "react";

const Tooltip = ({ children, text, angle }) => {
    return (
        <div className="relative group inline-block">
            {/* Content that triggers the tooltip */}
            {children}

            {/* Tooltip text */}
            <div className={`absolute ${angle}-full z-999 left-1/2 transform -translate-x-1/2 ${angle == "top" ? "mt-2" : angle == "bottom" ? "mb-2" : angle == "left" ? "ml-2" : angle == "right" ? "mr-2" : ""} hidden group-hover:block bg-gray-800 text-white text-sm py-1 px-3 rounded-md shadow-lg`}>
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
