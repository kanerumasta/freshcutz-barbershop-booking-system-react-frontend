import React, { useContext } from "react";
import { sidebarContext } from "../../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsDark } from "../../state/settingsSlice";

export const MenuButton = ({ name, path, icon }) => {
    const {
        activeSidebarMenu,
        setActiveSidebarMenu,
        setIsOpenSidebar,
        isOpenSidebar,
    } = useContext(sidebarContext);
    const navigate = useNavigate();
    const handleClick = () => {
        setIsOpenSidebar(!isOpenSidebar);
        setActiveSidebarMenu(name);
        navigate(path);
    };
    const isDark = useSelector(selectIsDark);

    return (
        <div
            onClick={handleClick}
            className={` transition-all ease-in-out delay-50 text-md py-4 uppercase font-bold  flex flex-col justify-center w-full items-center cursor-pointer ${
                name === activeSidebarMenu
                    ? isDark
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-100 text-yellow-500"
                    : isDark
                    ? "bg-transparent text-white/40"
                    : "bg-transparent text-gray-600"
            }`}
        >
            {icon}

            {name}
        </div>
    );
};
