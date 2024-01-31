import React, { useContext } from "react";
import { sidebarContext } from "../../layout/AdminLayout";

import { FaComments, FaUsers } from "react-icons/fa";
import { MdClose, MdDashboard, MdOutlineLibraryBooks } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectIsDark } from "../../state/settingsSlice";
import { SIDEBAR_MENU } from "../../utils/constants";
import { MenuButton } from "./MenuButton";
import { FaScissors } from "react-icons/fa6";

const AdminSidebar = () => {
    const { isOpenSidebar, setIsOpenSidebar } = useContext(sidebarContext);
    const isDark = useSelector(selectIsDark);

    return (
        <div
            onClick={() => setIsOpenSidebar(true)}
            className={`${
                isOpenSidebar
                    ? "-translate-x-[200%] lg:translate-x-0"
                    : "translate-x-0 bg-black/40"
            } lg:relative lg:w-[150px] transition ease-in-out delay-50 absolute w-screen backdrop-blur-sm z-30 h-screen`}
        >
            <div
                className={`shadow-lg transition delay-50 w-[150px] h-full ${
                    isDark ? "bg-[#1d2432]" : "bg-white"
                } `}
            >
                <div className="p-4 flex justify-end">
                    <MdClose
                        color={isDark ? "#fff" : "gray"}
                        size={30}
                        className="lg:hidden hover:cursor-pointer"
                        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                    />
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="w-40 h-40 bg-logo bg-no-repeat bg-cover bg-center"></div>
                    {/* <div
                    className={`mb-10 flex items-center justify-center text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-700"
                    }`}
                >
                    FreshFades
                </div> */}
                </div>
                <div className="">
                    <MenuButton
                        name={SIDEBAR_MENU.dashboard}
                        path="/admin"
                        icon={<MdDashboard size={40} />}
                    />
                    <MenuButton
                        name={SIDEBAR_MENU.bookings}
                        path="bookings"
                        icon={<MdOutlineLibraryBooks size={40} />}
                    />
                    <MenuButton
                        name={SIDEBAR_MENU.clients}
                        path="clients"
                        icon={<FaUsers size={40} />}
                    />

                    <MenuButton
                        name={SIDEBAR_MENU.services}
                        path="services"
                        icon={<FaScissors size={40} />}
                    />

                    <MenuButton
                        name={SIDEBAR_MENU.feedbacks}
                        path="feedback"
                        icon={<FaComments size={40} />}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
