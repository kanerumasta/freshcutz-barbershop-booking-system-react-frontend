import React from "react";
import ReactLoading from "react-loading";
const Loading = ({ label = "Loading" }) => {
    return (
        <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
            <div className="flex flex-col items-center ">
                <ReactLoading
                    type="spinningBubbles"
                    color="blue"
                    height={100}
                    width={100}
                />
                <p className="mt-6 text-blue-500 text-3xl font-bold">{label}</p>
            </div>
        </div>
    );
};

export default Loading;
