import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminBookingDetail from "./admin/pages/AdminBookingDetail";
import AdminBookings from "./admin/pages/AdminBookings";
import AdminClients from "./admin/pages/AdminClients";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLayout from "./layout/AdminLayout";
import { MainLayout } from "./layout/MainLayout";
import VerifyOtp from "./main/forms/VerifyOtp";
import BookNow from "./user/pages/BookNow";
import AdminServices from "./admin/pages/AdminServices";
import AdminFeedbacks from "./admin/pages/AdminFeedbacks";
import { useEffect } from "react";
import { validateToken } from "./services/token";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "./state/authSlice";

const queryClient = new QueryClient({});

function App() {
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    {user?.isAdmin ? (
                        <Route path="/admin/*" element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route
                                path="bookings"
                                element={<AdminBookings />}
                            />
                            <Route
                                path="bookings/:bookingId"
                                exact
                                element={<AdminBookingDetail />}
                            />
                            <Route path="clients" element={<AdminClients />} />
                            <Route
                                path="services"
                                element={<AdminServices />}
                            />
                            <Route
                                path="feedback"
                                element={<AdminFeedbacks />}
                            />
                        </Route>
                    ) : (
                        <Route path="/*" exact element={<MainLayout />}>
                            <Route path="book" exact element={<BookNow />} />
                        </Route>
                    )}
                    <Route path="/verify-otp" exact element={<VerifyOtp />} />
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}

export default App;
