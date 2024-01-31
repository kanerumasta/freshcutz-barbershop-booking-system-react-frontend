import React from "react";
import { PiStarBold, PiStarFill } from "react-icons/pi";
export const Stars = ({ rate }) => {
    return (
        <div className="flex items-center">
            {rate > 0 ? (
                <PiStarFill size={20} color="#fed102" />
            ) : (
                <PiStarBold size={20} color="#fed102" />
            )}
            {rate > 1 ? (
                <PiStarFill size={20} color="#fed102" />
            ) : (
                <PiStarBold size={20} color="#fed102" />
            )}
            {rate > 2 ? (
                <PiStarFill size={20} color="#fed102" />
            ) : (
                <PiStarBold size={20} color="#fed102" />
            )}
            {rate > 3 ? (
                <PiStarFill size={20} color="#fed102" />
            ) : (
                <PiStarBold size={20} color="#fed102" />
            )}
            {rate > 4 ? (
                <PiStarFill size={20} color="#fed102" />
            ) : (
                <PiStarBold size={20} color="#fed102" />
            )}
        </div>
    );
};
