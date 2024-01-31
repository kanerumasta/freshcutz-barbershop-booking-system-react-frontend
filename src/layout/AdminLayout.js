import React, { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../admin/components/AdminSidebar";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { AdminNavbar } from "../admin/components/AdminNavbar";
import { validateToken } from "../services/token";
import { setUser } from "../state/authSlice";
import { selectIsDark } from "../state/settingsSlice";
import { SIDEBAR_MENU } from "../utils/constants";
export const sidebarContext = createContext();

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [activeSidebarMenu, setActiveSidebarMenu] = useState(
        SIDEBAR_MENU.dashboard
    );
    const isDark = useSelector(selectIsDark);

    useEffect(() => {
        const isValidToken = validateToken();
        if (isValidToken) {
            const accessToken = Cookies.get("accessToken");
            const decoded = jwtDecode(accessToken);

            const tokenIsAdmin = decoded.is_admin;
            const tokenEmail = decoded.email;
            const tokenUserId = decoded.user_id;
            dispatch(
                setUser({
                    email: tokenEmail,
                    isAdmin: tokenIsAdmin,
                    userId: tokenUserId,
                })
            );

            tokenIsAdmin ? navigate("/admin") : navigate("/");
        }
    }, []);

    return (
        <div
            className={`transition-all delay-50 ease-in-out flex ${
                isDark ? "bg-gray-900" : "bg-white"
            }`}
        >
            <sidebarContext.Provider
                value={{
                    isOpenSidebar,
                    setIsOpenSidebar,
                    activeSidebarMenu,
                    setActiveSidebarMenu,
                }}
            >
                <AdminSidebar />

                <div
                    className={`min-h-screen transition delay-50 ${
                        !isDark && "bg-gray-300"
                    } w-full`}
                >
                    <AdminNavbar />
                    <div className="px-4 h-screen lg:h-[calc(100vh-80px)] overflow-y-scroll pb-10 lg:pt-10 pt-24">
                        <Outlet />
                    </div>
                </div>
            </sidebarContext.Provider>
        </div>
    );
};

export default AdminLayout;
