import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../state/authSlice";

const baseURL = "http://127.0.0.1:8000/";

export const api = axios.create({
    baseURL,
});

export const backend = {
    validateEmail: async (email) => {
        try {
            const response = await api.get(
                `auth/is-unique-email/${email ? email : "samp"}`
            );

            return response.data["unique"];
        } catch (error) {
            console.error(error);
        }
    },
    loginUser: async (formData) => {
        try {
            return await api.post("auth/token", formData);
        } catch (error) {
            console.error(error);
        }
    },

    verifyOtp: async (formData) => {
        const response = await api.post("auth/verify-otp", formData);
        return response;
    },
};
export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: async (formData) => {
            return await api.post("auth/verify-otp", formData);
        },
    });
};

export const useLoginMutation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (formData) => {
            return await api.post("auth/token", formData);
        },
        onSuccess: (res) => {
            const accessToken = res.data.access;
            const refreshToken = res.data.refresh;
            Cookies.set("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            const decoded = jwtDecode(accessToken);
            console.log(decoded);
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
            if (tokenIsAdmin) navigate("/admin");
            
        },
    });
};

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: async (formData) => {
            return await api.post("auth/register", formData);
        },
    });
};

export const useServicesQuery = () => {
    return useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const response = await api.get("api/services");
            return response.data;
        },
    });
};

export const useServicesMutation = () => {
    return useMutation({
        mutationFn: async (formData) => {
            return await api.post("api/services", formData);
        },
    });
};

export const useDisabledDatesQuery = () => {
    return useQuery({
        queryKey: ["disabled-dates"],
        queryFn: async () => {
            const response = await api.get("api/disabled-dates");
            return response;
        },
    });
};

export const useTimeQuery = () => {
    return useQuery({
        queryKey: ["time"],
        queryFn: async () => {
            const response = await api.get("api/time");
            return response;
        },
    });
};

export const useBookMutation = () => {
    return useMutation({
        mutationFn: async (formData) => {
            return await api.post("api/bookings", formData);
        },
    });
};

export const useBookingServicesMutation = () => {
    return useMutation({
        mutationFn: async (formData) => {
            return await api.post("api/booking-services", formData);
        },
    });
};

export const useBookingQuery = () => {
    return useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const response = await api.get("api/bookings");
            return response;
        },
    });
};

export const useBookingDetailQuery = (bookingId) => {
    return useQuery({
        queryKey: ["booking-detail", bookingId],
        queryFn: async ({ queryKey }) => {
            const [, bookingId] = queryKey;
            return api.get(`api/bookings/${bookingId}`);
        },
    });
};
export const useBookingServicesQuery = (bookingId) => {
    return useQuery({
        queryKey: ["booking-services", bookingId],
        queryFn: async ({ queryKey }) => {
            const [, bookingId] = queryKey;
            return api.get(`api/get-booking-services/${bookingId}`);
        },
    });
};

export const useUsersQuery = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await api.get("auth/users");
            return response;
        },
    });
};

export const useConfirmBookingMutation = () => {
    return useMutation({
        mutationFn: async (formData) => {
            return api.patch("api/confirm-booking", formData);
        },
    });
};
export const useCompleteBookingMutation = () => {
    return useMutation({
        mutationFn: async (formData) => {
            return api.patch("api/complete-booking", formData);
        },
    });
};

export const useUserBookingsQuery = (userId) => {
    return useQuery({
        queryKey: ["user-bookings", userId],
        queryFn: async ({ queryKey }) => {
            const [, userId] = queryKey;
            return api.get(`api/user-bookings?user=${userId}`);
        },
    });
};

export const useRateBookingMutation = () => {
    return useMutation({
        mutationFn: async (formData) => {
            return api.patch("api/rate-booking", formData);
        },
    });
};

export const useServiceStylesMutation = () => {
    return useMutation({
        mutationFn: async (formData) => {
            return api.post("api/styles", formData);
        },
    });
};
