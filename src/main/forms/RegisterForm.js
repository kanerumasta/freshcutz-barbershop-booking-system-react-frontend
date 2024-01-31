import { Button, Checkbox, Input } from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import { MdEmail } from "react-icons/md";
import { backend, useRegisterMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ isLogin, setIsLogin }) => {
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const registerMutation = useRegisterMutation();
    const navigate = useNavigate();
    const validateEmail = (value) =>
        value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const validatePassword = (password) => password.length >= 8;

    const isInvalidEmail = useMemo(() => {
        if (email === "") return false;
        if (emailExists) return false;
        return validateEmail(email) ? false : true;
    }, [email]);

    const passwordDontMatch = useMemo(() => {
        return password !== password2;
    }, [password, password2]);

    const password1TooShort = useMemo(() => {
        if (password === "") return false;
        return validatePassword(password) ? false : true;
    }, [password]);
    const password2TooShort = useMemo(() => {
        if (password2 === "") return false;
        return validatePassword(password2) ? false : true;
    }, [password2]);

    const handleEmailChange = async (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
        const isValidEmail = await backend.validateEmail(emailInput);
        if (!isValidEmail) {
            setEmailExists(true);
        } else {
            setEmailExists(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("first_name", firstName.toLowerCase().trim());
        formData.append("last_name", lastName.toLowerCase().trim());
        formData.append("email", email.toLowerCase().trim());
        formData.append("password", password);
        formData.append("password2", password2);
        try {
            registerMutation.mutate(formData);
        } catch (error) {}
    };
    registerMutation.isSuccess &&
        navigate("/verify-otp", {
            state: { email: email, password: password },
        });
    return (
        <div className="w-full md:w-[70%] lg:w-[600px]">
            <form onSubmit={handleRegisterSubmit}>
                <div>
                    <div className="w-full mb-8">
                        <header className="uppercase text-white justify-center text-2xl font-bold">
                            welcome to freshfade cutz
                        </header>
                    </div>

                    <div className="md:flex mb-6">
                        <Input
                            classNames={{
                                input: "text-white text-xl",
                            }}
                            label="First Name"
                            variant="bordered"
                            labelPlacement="outside"
                            size="lg"
                            color="success"
                            value={firstName}
                            isRequired
                            onValueChange={setFirstname}
                            isClearable
                        />

                        <Input
                            classNames={{
                                input: "text-white text-xl",
                            }}
                            label="Last Name"
                            variant="bordered"
                            labelPlacement="outside"
                            size="lg"
                            color="success"
                            value={lastName}
                            isRequired
                            onValueChange={setLastname}
                            isClearable
                        />
                    </div>
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
                        isInvalid={isInvalidEmail || emailExists}
                        color={isInvalidEmail ? "danger" : "success"}
                        errorMessage={
                            isInvalidEmail
                                ? "Please enter a valid email"
                                : emailExists
                                ? "Email already exists"
                                : ""
                        }
                        onChange={handleEmailChange}
                    />
                    <Input
                        classNames={{
                            base: "mb-6",
                            input: "text-white text-xl",
                        }}
                        variant="bordered"
                        labelPlacement="outside"
                        size="lg"
                        label="Password"
                        value={password}
                        onValueChange={setPassword}
                        type="password"
                        color="success"
                        minLength={8}
                        autoComplete="new-password"
                        isInvalid={password1TooShort}
                        errorMessage={
                            password1TooShort &&
                            "Password must have at least 8 characters"
                        }
                    />
                    <Input
                        classNames={{
                            base: "mb-2",
                            input: "text-white text-xl",
                        }}
                        variant="bordered"
                        labelPlacement="outside"
                        size="lg"
                        label="Confirm Password"
                        color="success"
                        value={password2}
                        onValueChange={setPassword2}
                        type="password"
                        autoComplete="new-password"
                        isInvalid={passwordDontMatch || password2TooShort}
                        errorMessage={
                            passwordDontMatch
                                ? "Password don't match"
                                : password2TooShort
                                ? "Password must have at least 8 characters"
                                : ""
                        }
                        minLength={8}
                    />
                    <div className="my-6 flex items-center text-white/60">
                        <Checkbox
                            isSelected={acceptTerms}
                            onValueChange={setAcceptTerms}
                        />
                        <p>
                            I accept the{" "}
                            <span className="text-blue-400 capitalize hover:cursor-pointer">
                                {" "}
                                terms of use
                            </span>{" "}
                            and{" "}
                            <span className="text-blue-400 capitalize hover:cursor-pointer">
                                {" "}
                                privacy policy{" "}
                            </span>
                        </p>
                    </div>

                    <div className="flex justify-center my  -2">
                        <Button
                            isDisabled={
                                registerMutation.isPending ||
                                emailExists ||
                                passwordDontMatch ||
                                password === "" ||
                                email === "" ||
                                isInvalidEmail ||
                                !acceptTerms
                            }
                            type="submit"
                            className="bg-white w-full h-[50px] font-bold text-2xl tracking-tighter "
                        >
                            {registerMutation.isPending
                                ? "Loading..."
                                : "Register"}
                        </Button>
                    </div>
                    <div className="text-white/60 flex justify-center">
                        Create an account below or{" "}
                        <span
                            onClick={() => setIsLogin(true)}
                            className="hover:cursor-pointer underline text-blue-400"
                        >
                            Sign in
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
