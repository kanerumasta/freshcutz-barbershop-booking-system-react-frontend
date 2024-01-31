import React from "react";
import { FaCalendar, FaReceipt, FaUserCheck } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { DashboardCard } from "../components/DashboardCard";
import { useBookingQuery, useUsersQuery } from "../../services/api";

const AdminDashboard = ({ isDark }) => {
    const usersQuery = useUsersQuery();
    const bookingsQuery = useBookingQuery();
    const filteredUsers = usersQuery?.data?.data.filter(
        (user) => user.is_admin === false
    );
    const filteredBookings = bookingsQuery?.data?.data.filter(
        (b) => b.status === "pending" || b.status === "confirmed"
    );

    return (
        <div className={`px-4 ${isDark ? "bg-gray-800" : ""}`}>
            <div className="rounded-lg">
                <div className="flex flex-col lg:flex-row rounded-lg">
                    <div className="w-full md:flex">
                        <DashboardCard
                            label="Date"
                            number={50}
                            color={"bg-blue-400"}
                            icon={<FaCalendar size={40} color="#fff" />}
                            isDark={isDark}
                        />
                        <DashboardCard
                            label="Clients"
                            number={filteredUsers?.length || 0}
                            color={"bg-red-400"}
                            icon={<FaUserCheck size={40} color="#fff" />}
                            isDark={isDark}
                        />
                    </div>
                    <div className="w-full md:flex">
                        <DashboardCard
                            label="Bookings"
                            number={filteredBookings?.length || 0}
                            color={"bg-green-400"}
                            icon={<FaReceipt size={40} color="#fff" />}
                            isDark={isDark}
                        />
                        <DashboardCard
                            label="Ratings"
                            number={50}
                            color={"bg-yellow-400"}
                            icon={<MdStarRate size={40} />}
                            isDark={isDark}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
