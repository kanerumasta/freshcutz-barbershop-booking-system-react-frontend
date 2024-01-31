import { Button, Input, Spacer } from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useLoginMutation } from "../../services/api";

const LoginForm = ({ isLogin, setIsLogin, setOpenLogin, openLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useLoginMutation();

    const validateEmail = (value) =>
        value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        try {
            await loginMutation.mutateAsync(formData);
        } catch (error) {}
    };

    useEffect(() => {
        if (loginMutation.isSuccess) {
            setOpenLogin(!openLogin);
        }
    }, [loginMutation.isSuccess]);

    return (
        <div className="w-full md:w-[70%] lg:w-[400px]">
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <div className="w-full">
                        <header className="uppercase text-white justify-center text-2xl font-bold">
                            welcome to freshfade cutz
                        </header>
                        <span className="text-white/60">
                            Sign in below or create an account to get started
                        </span>
                    </div>
                    <Spacer y={4} />

                    <Input
                        classNames={{
                            base: "mb-6",
                            input: "text-white text-xl",
                        }}
                        endContent={
                            <div className="flex items-center h-full">
                                <MdEmail color="#666666" size={20} />
                            </div>
                        }
                        isRequired
                        value={email}
                        type="email"
                        label="Email"
                        variant="bordered"
                        labelPlacement="outside"
                        size="lg"
                        isInvalid={
                            isInvalid ||
                            loginMutation.error?.response?.data?.non_field_errors[0].includes(
                                "Email"
                            )
                        }
                        color={isInvalid ? "danger" : "success"}
                        errorMessage={
                            isInvalid
                                ? "Please enter a valid email"
                                : loginMutation.error?.response?.data?.non_field_errors[0].includes(
                                      "Email"
                                  )
                                ? "Email not found"
                                : ""
                        }
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        classNames={{
                            input: "text-md text-white text-xl",
                        }}
                        type={showPassword ? "text" : "password"}
                        variant="bordered"
                        endContent={
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="hover:cursor-pointer flex items-center h-full"
                            >
                                {showPassword ? (
                                    <FaEye color="#666666" size={20} />
                                ) : (
                                    <FaEyeSlash color="#666666" size={20} />
                                )}
                            </div>
                        }
                        color="success"
                        isRequired
                        labelPlacement="outside"
                        size="lg"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        isInvalid={loginMutation.error?.response?.data?.non_field_errors[0].includes(
                            "password"
                        )}
                        errorMessage={
                            loginMutation.error?.response?.data?.non_field_errors[0].includes(
                                "password"
                            ) && "Your password entered is incorrect"
                        }
                    />

                    <div className="px-4 mt-2 mb-10">
                        <span className=" text-white text-sm">
                            Forgot Password?
                        </span>
                    </div>

                    <div className="flex flex-col justify-center">
                        <Button
                            isDisabled={
                                isInvalid ||
                                email === "" ||
                                loginMutation.isPending
                            }
                            onClick={handleLoginSubmit}
                            type="submit"
                            className="bg-white w-full p-7 font-bold text-2xl tracking-tighter "
                        >
                            {loginMutation.isPending ? "Loading" : "Sign in"}
                        </Button>
                        <div className="mt-6 flex justify-center text-white">
                            New here?
                            <div
                                onClick={() => setIsLogin(!isLogin)}
                                className="hover:cursor-pointer ml-3 underline text-blue-400"
                            >
                                Sign up instead
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
