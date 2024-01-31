import { Button, Input } from "@nextui-org/react";
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backend, useLoginMutation, useVerifyOtp } from "../../services/api";
import { useMutation } from "@tanstack/react-query";

const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state.email;
    const password = location.state.password;
    const loginMutation = useLoginMutation();
    const [otp, setOtp] = React.useState(["", "", "", ""]);
    const inputRefs = useRef([...Array(4)].map(() => React.createRef()));
    const verifyOtpMutation = useVerifyOtp();

    const handleVerify = async () => {
        try {
            const otpString = otp.join("");
            const formData = new FormData();
            formData.append("email", email);
            formData.append("otp", otpString);
            await verifyOtpMutation.mutateAsync(formData);
            if (verifyOtpMutation.isSuccess) {
                const fd = new FormData();
                fd.append("email", email);
                fd.append("password", password);
                await loginMutation.mutateAsync(fd);
                if (loginMutation.isSuccess) {
                    navigate("/");
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleInputChange = (index, value) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = value;

        setOtp(updatedOtp);

        if (value === "" && index > 0) {
            // If the value is deleted and the cursor is not in the first box, move to the previous box
            inputRefs.current[index - 1].current.focus();
        } else if (index < inputRefs.current.length - 1 && value !== "") {
            // If a digit is entered and the cursor is not in the last box, move to the next box
            inputRefs.current[index + 1].current.focus();
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
            {verifyOtpMutation.isError && (
                <div className="font-bold text-md rounded-lg capitalize bg-red-600 p-4 text-white">
                    {verifyOtpMutation.error?.response?.data?.message}
                </div>
            )}
            <h3 className="text-2xl font-semibold mb-4">
                An OTP was sent to {email}. Enter it below
            </h3>

            <div className="flex space-x-2">
                {otp.map((digit, index) => (
                    <Input
                        key={index}
                        ref={inputRefs.current[index]}
                        value={digit}
                        onValueChange={(value) =>
                            handleInputChange(index, value)
                        }
                        type="number"
                        min="0"
                        max="9"
                        className="w-1/4 text-4xl text-center"
                    />
                ))}
            </div>
            <Button
                color="warning"
                className="font-bold my-4 text-lg uppercase"
                isDisabled={
                    verifyOtpMutation.isPending || loginMutation.isPending
                }
                onClick={handleVerify}
               
            >
                {verifyOtpMutation.isPending
                    ? "Verifying"
                    : loginMutation.isPending
                    ? "Redirecting"
                    : "Verify"}
            </Button>
        </div>
    );
};

export default VerifyOtp;
