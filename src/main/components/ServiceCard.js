import React from "react";

const ServiceCard = ({ image }) => {
    return (
        <div className="rounded-lg w-[20%]">
            <div
                className={`${image} w-full h-[150px] lg:h-[300px] mb-4 rounded-lg`}
            ></div>
            <div className="flex justify-center text-white text-xl font-bold">
                TITLE
            </div>
        </div>
    );
};

export default ServiceCard;
