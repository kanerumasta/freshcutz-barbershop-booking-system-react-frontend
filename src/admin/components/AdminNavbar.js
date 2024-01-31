import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Switch,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { MdMenu, MdNotifications, MdSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarContext } from "../../layout/AdminLayout";
import { api } from "../../services/api";
import { clearUser, selectUser } from "../../state/authSlice";
import {
    selectIsDark,
    selectRefresh,
    setDark,
} from "../../state/settingsSlice";
import { clearToken } from "../../utils/functions";

export const AdminNavbar = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const { isOpenSidebar, setIsOpenSidebar, activeSidebarMenu } =
        useContext(sidebarContext);
    const dispatch = useDispatch();
    const isDark = useSelector(selectIsDark);
    const [notifications, setNotifications] = useState([]);

    const refresh = useSelector(selectRefresh);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get(
                    `api/user-notifications?user=${user?.userId}`
                );
                if (response && response.status && response.status === 200)
                    setNotifications(response?.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [refresh]);

    const toggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    };

    const toggleDarkMode = () => {
        dispatch(setDark(!isDark));
    };

    return (
        <div
            className={`py-4 z-10 ${
                isDark ? "bg-gray-900" : "bg-gray-300"
            } w-full transition-all delay-50 ease-in-out flex lg:relative absolute top-0 left-0 items-center px-2 bg-tranparent justify-between`}
        >
            <div className="flex items-center">
                <div>
                    <MdMenu
                        size={30}
                        onClick={toggleSidebar}
                        color={isDark ? "#fff" : "gray"}
                        className="transition delay-50 lg:hidden hover:cursor-pointer"
                        aria-label="Toggle Sidebar"
                    />
                </div>

                <span
                    className={`${
                        isDark ? "text-white" : "text-gray-700"
                    } uppercase transition delay-50 text-2xl font-bold `}
                >
                    {activeSidebarMenu}
                </span>
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    isSelected={isDark}
                    onValueChange={toggleDarkMode}
                    color="success"
                    startContent={<MdSunny />}
                    endContent={<IoMdMoon />}
                    aria-label="Toggle Dark Mode"
                />
                <div className="flex items-center justify-center">
                    <Dropdown aria-label="notifications">
                        <DropdownTrigger>
                            <Button
                                className="bg-transparent"
                                aria-label="User Options"
                            >
                                <div className="flex w-[50px] relative item-center">
                                    <MdNotifications
                                        color={isDark ? "#fff" : "gray"}
                                        size={30}
                                    />
                                    {notifications.length > 0 && (
                                        <Chip
                                            className="absolute -top-1 -right-1"
                                            color="danger"
                                        >
                                            {notifications.length}
                                        </Chip>
                                    )}
                                </div>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            onAction={(key) =>
                                navigate(`/admin/bookings/${key}`)
                            }
                            title="Notifications"
                            color="warning"
                            emptyContent="No notifications"
                        >
                            {notifications?.map((notif) => (
                                <DropdownItem
                                    key={notif.booking}
                                    description={notif.message}
                                    value={notif.booking}
                                >
                                    <div className="font-bold capitalize text-lg">
                                        {" "}
                                        {notif.title}
                                    </div>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            size="lg"
                            radius="full"
                            color="warning"
                            isIconOnly
                            aria-label="User Options"
                        >
                            <FaUser size={30} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem aria-label="View Profile">
                            Profile
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => {
                                clearToken();
                                dispatch(clearUser());
                                navigate("/");
                            }}
                            aria-label="Logout"
                        >
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};
