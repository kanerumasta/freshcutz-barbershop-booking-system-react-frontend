import { Button } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../state/authSlice";

const Home = ({ setBook, setOpenLogin, openLogin }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        <div className="flex items-center  justify-center h-screen bg-wallpaper bg-no-repeat bg-cover bg-center ">
            <div className="backdrop-blur-[2px] pt-14 bg-black/50 w-full h-full flex items-center justify-center"></div>
            <Button
                className="absolute top-[70%] left-[42%] animate-bounce text-white p-10 text-3xl font-bold"
                color="warning"
                onClick={() =>
                    isAuthenticated ? setBook(false) : setOpenLogin(!openLogin)
                }
            >
                Book Now
            </Button>
        </div>
    );
};

export default Home;
