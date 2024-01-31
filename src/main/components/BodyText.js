import React from "react";

const BodyText = ({ title, subtitle }) => {
    return (
        <div className="mb-5">
            <h1 className="text-4xl font-bold capitalize">{title}</h1>
            <span className="text-lg">{subtitle}</span>
        </div>
    );
};

export default BodyText;
