import React from "react";

export const DashboardCard = ({ icon, color, isDark, label, number }) => {
    return (
        <div
            className={`${color} space-x-4 w-full rounded-lg mb-4 flex items-center md:mx-2 p-6 md:py-14 shadow-lg`}
        >
            <div className="font-bold text-6xl text-white">{number}</div>
            <div className="flex flex-col items-center">
                {icon}

                <div className="font-bold text-2xl text-black">{label}</div>
            </div>
        </div>
    );
};
