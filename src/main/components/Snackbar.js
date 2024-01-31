import React from "react";
import { STATUS } from "../../utils/constants";
import { CSSTransition } from "react-transition-group";

const Snackbar = ({ status, message }) => {
    return (
        <CSSTransition
            in={status !== null}
            timeout={1000}
            classNames={{
                enter: "translate-y-[-100%]",
                enterActive: "translate-y-0",
                exit: "opacity-100 transform translate-x-0",
                exitActive:
                    "opacity-0 transform translate-x-full transition-transform ease-in",
            }}
            unmountOnExit
        >
            <div
                onClick={() => {}}
                className={`animate-pulse fixed top-0 right-0 w-[500px] h-[100px] ${
                    status === STATUS.error ? "bg-red-500" : "bg-green-600"
                }`}
            >
                {message}
            </div>
        </CSSTransition>
    );
};

export default Snackbar;
