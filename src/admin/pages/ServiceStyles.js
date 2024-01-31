// ServiceStyles.js
import { Button } from "@nextui-org/react";
import React from "react";
import { FaPlus } from "react-icons/fa";

const ServiceStyles = ({
    styles,
    isDark,
    onAddStyleClick,
    hasButton = true,
}) => {
    return (
        <div
            className={`mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4`}
        >
            {styles.map((style, index) => (
                <div
                    key={style.id}
                    className={`mb-4 p-4 ${
                        isDark ? "bg-gray-800" : "bg-white"
                    } rounded-lg overflow-hidden shadow-md relative`}
                >
                    <h3
                        className={`text-lg font-semibold capitalize mb-2 ${
                            isDark ? "text-white" : "text-black"
                        }`}
                    >
                        {style.name}
                    </h3>
                    <p
                        className={`text-gray-600 ${
                            isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                    >
                        P{style.price}
                    </p>
                    {style.image && (
                        <img
                            src={style.image}
                            alt={style.name}
                            className="mt-2 rounded-lg max-w-full h-auto"
                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                    )}
                </div>
            ))}
            {hasButton && (
                <div className="flex items-center">
                    <Button
                        radius="full"
                        color="success"
                        isIconOnly
                        onClick={onAddStyleClick}
                    >
                        <FaPlus color="#fff" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ServiceStyles;
