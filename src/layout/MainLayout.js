import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { MdClose, MdMenu, MdNotifications } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../main/forms/LoginForm";
import RegisterForm from "../main/forms/RegisterForm";
import AboutMe from "../main/pages/AboutMe";
import Home from "../main/pages/Home";
import MyBookings from "../main/pages/MyBookings";
import OpeningHours from "../main/pages/OpeningHours";
import Services from "../main/pages/Services";
import { api } from "../services/api";
import { validateToken } from "../services/token";
import { selectIsAuthenticated, selectUser, setUser } from "../state/authSlice";
import { selectRefresh } from "../state/settingsSlice";
import AddBookingForm from "../user/forms/AddBookingForm";

export const MainLayout = () => {
    const [openMenu, setOpenMenu] = useState(true);
    const [openLogin, setOpenLogin] = useState(true);
    const [book, setBook] = useState(true);
    const [isLogin, setIsLogin] = useState(true);
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const openingRef = useRef(null);
    const servicesRef = useRef(null);
    const myBookingsRef = useRef(null);
    const [activeSection, setActiveSection] = useState("home");
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const isValidToken = validateToken();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const refresh = useSelector(selectRefresh);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchNotifications = async () => {
                try {
                    const response = await api.get(
                        `api/user-notifications?user=${user?.userId}`
                    );
                    if (response && response.status && response.status === 200)
                        setNotifications(response?.data);
                } catch (error) {
                    console.error("Error fetching notifications:", error);
                    // Handle error, display a message, etc.
                }
            };

            fetchNotifications();
        }
    }, [isAuthenticated, user?.userId, refresh]);

    const handleScroll = () => {
        const scrollPosition = window.scrollY + 200;
        const homeOffset = homeRef?.current?.offsetTop || 0;
        const aboutOffset = aboutRef?.current?.offsetTop || 0;
        const servicesOffset = servicesRef?.current?.offsetTop || 0;
        const openingOffset = openingRef?.current?.offsetTop || 0;
        const myBookingsOffset = myBookingsRef?.current?.offsetTop || 0;

        if (scrollPosition >= homeOffset && scrollPosition < aboutOffset) {
            setActiveSection("home");
        } else if (
            scrollPosition >= aboutOffset &&
            scrollPosition < servicesOffset
        ) {
            setActiveSection("about");
        } else if (
            scrollPosition >= servicesOffset &&
            scrollPosition < openingOffset
        ) {
            setActiveSection("services");
        } else if (
            scrollPosition >= openingOffset &&
            scrollPosition < myBookingsOffset
        ) {
            setActiveSection("opening");
        } else if (scrollPosition >= myBookingsOffset) {
            setActiveSection("myBookings");
        } else {
            setActiveSection(null);
        }
    };

    useEffect(() => {
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

            tokenIsAdmin && navigate("/admin");
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="bg-black/90">
            <nav className="z-30 flex px-4 h-20 bg-black justify-between items-center fixed top-0 left-0 w-screen">
                <div className="flex items-center h-full">
                    <Button
                        onClick={() => setOpenMenu(!openMenu)}
                        className="lg:hidden bg-transparent"
                        isIconOnly
                    >
                        <MdMenu color="#fff" size={30} />
                    </Button>
                    <div className="w-20 h-20 bg-logo bg-no-repeat bg-cover bg-center"></div>
                    <div className="ml-4 hidden md:flex text-left uppercase text-2xl font-bold text-white">
                        fresh fade cutz
                    </div>
                </div>
                <div
                    className={` absolute z-10 h-screen lg:h-full ${
                        openMenu ? "translate-y-[-150%]" : "translate-y-0"
                    }   lg:relative lg:translate-y-0 lg:top-0 top-20 left-0 w-screen lg:w-auto transition delay-75 lg:delay-0 ease-in`}
                >
                    <ul className="py-6 h-full lg:flex text-white bg-black/80">
                        <li
                            onClick={() => {
                                homeRef.current.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setOpenMenu(!openMenu);
                            }}
                            className={`hover:cursor-pointer hover:bg-white/20 text-xl uppercase  tracking-wider px-6 justify-center flex items-center py-4 transition-all delay-50 ease-in-out rounded-sm ${
                                activeSection === "home"
                                    ? "text-yellow-500"
                                    : ""
                            }`}
                        >
                            home
                        </li>
                        <li
                            onClick={() => {
                                aboutRef.current.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setOpenMenu(!openMenu);
                            }}
                            className={`hover:cursor-pointer hover:bg-white/20 text-xl uppercase  tracking-wider px-6 justify-center flex items-center py-4 transition-all delay-50 ease-in-out rounded-sm ${
                                activeSection === "about"
                                    ? "text-yellow-500"
                                    : ""
                            }`}
                        >
                            about me
                        </li>

                        <li
                            onClick={() => {
                                servicesRef.current.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setOpenMenu(!openMenu);
                            }}
                            className={`hover:cursor-pointer hover:bg-white/20 text-xl uppercase  tracking-wider px-6 justify-center flex items-center py-4 transition-all delay-50 ease-in-out rounded-sm ${
                                activeSection === "services"
                                    ? "text-yellow-500"
                                    : ""
                            }`}
                        >
                            services
                        </li>
                        <li
                            onClick={() => {
                                openingRef.current.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setOpenMenu(!openMenu);
                            }}
                            className={`hover:cursor-pointer hover:bg-white/20 text-xl uppercase  tracking-wider px-6 justify-center flex items-center py-4 transition-all delay-50 ease-in-out rounded-sm ${
                                activeSection === "opening"
                                    ? "text-yellow-500"
                                    : ""
                            }`}
                        >
                            opening hours
                        </li>
                        {isAuthenticated && (
                            <li
                                onClick={() => {
                                    myBookingsRef.current.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                    setOpenMenu(!openMenu);
                                }}
                                className={`hover:cursor-pointer hover:bg-white/20 text-xl uppercase  tracking-wider px-6 justify-center flex items-center py-4 transition-all delay-50 ease-in-out rounded-sm ${
                                    activeSection === "myBookings"
                                        ? "text-yellow-500"
                                        : ""
                                }`}
                            >
                                my bookings
                            </li>
                        )}
                    </ul>
                </div>
                {!isAuthenticated ? (
                    <div>
                        <Button
                            className="text-white text-md text-lg font-bold"
                            color="warning"
                            onClick={() => {
                                setOpenLogin(!openLogin);
                                setIsLogin(true);
                            }}
                        >
                            Login
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Dropdown>
                            <DropdownTrigger>
                                <div className="w-[70px] flex items-center justify-center relative">
                                    <Button
                                        className="bg-transparent"
                                        radius="full"
                                        startContent={
                                            <MdNotifications
                                                size={30}
                                                color="#fff"
                                            />
                                        }
                                    ></Button>
                                    {notifications.length > 0 ? (
                                        <Chip
                                            className="font-bold absolute top-0 right-0"
                                            size={5}
                                            color="danger"
                                        >
                                            {notifications?.length}
                                        </Chip>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                color="warning"
                                emptyContent="No notifications"
                                aria-label="Static Actions"
                            >
                                <DropdownSection title="Notifications">
                                    {notifications?.map((notif) => (
                                        <DropdownItem
                                            description={notif.message}
                                            key={notif.id}
                                        >
                                            <div className="font-bold capitalize text-lg">
                                                {" "}
                                                {notif.title}
                                            </div>
                                        </DropdownItem>
                                    ))}
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            className="font-bold text-lg text-md"
                            color="default"
                            onClick={() => {
                                localStorage.removeItem("refreshToken");
                                Cookies.remove("accessToken");
                                window.location.reload();
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </nav>
            <div ref={homeRef}>
                <Home
                    openLogin={openLogin}
                    setOpenLogin={setOpenLogin}
                    setBook={setBook}
                />
            </div>
            <div ref={aboutRef}>
                <AboutMe />
            </div>
            <div ref={servicesRef}>
                <Services />
            </div>
            <div ref={openingRef}>
                <OpeningHours />
            </div>
            {isAuthenticated && (
                <div ref={myBookingsRef}>
                    <MyBookings />
                </div>
            )}

            <div
                className={`flex flex-col w-screen h-screen p-8 bg-black/80 backdrop-blur-[5px] z-40 transition-all ease-in-out delay-50 fixed top-0  left-0 ${
                    openLogin ? "translate-y-[200%]" : "translate-y-0"
                }`}
            >
                <MdClose
                    className="hover:cursor-pointer absolute top-4 right-8"
                    onClick={() => setOpenLogin(!openLogin)}
                    size={20}
                    color="#fff"
                />

                <div className="z-50 w-full h-full items-center flex justify-center">
                    {isLogin ? (
                        <LoginForm
                            openLogin={openLogin}
                            setOpenLogin={setOpenLogin}
                            isLogin={isLogin}
                            setIsLogin={setIsLogin}
                        />
                    ) : (
                        <RegisterForm
                            isLogin={isLogin}
                            setIsLogin={setIsLogin}
                        />
                    )}
                </div>
            </div>
            <div
                className={`px-2 flex flex-col items-center justify-center w-screen h-screen bg-black/80 backdrop-blur-[5px] z-40 transition-all ease-in-out delay-50 fixed top-0 left-0 ${
                    book ? " translate-x-[200%]" : "translate-x-0"
                }`}
            >
                <MdClose
                    className="z-30 hover:cursor-pointer absolute top-4 right-8"
                    onClick={() => {
                        setBook(true);
                    }}
                    size={20}
                    color="#fff"
                />

                <AddBookingForm />
            </div>
        </div>
    );
};
