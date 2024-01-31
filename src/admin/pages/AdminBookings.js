import {
    Chip,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import {
    useBookingQuery,
    useTimeQuery,
    useUsersQuery,
} from "../../services/api";
import { useNavigate } from "react-router-dom";
import Loading from "../../main/components/Loading";
import { formatTime } from "../../utils/functions";
const AdminBookings = () => {
    const bookingsQuery = useBookingQuery();
    const usersQuery = useUsersQuery();
    const listTime = useTimeQuery();

    const navigate = useNavigate();

    const getUserName = (customerId, users) => {
        const user = users.find((user) => parseInt(user.id) === customerId);
        return `${user.first_name} ${user.last_name}`;
    };
    const getUserEmail = (customerId, users) => {
        const user = users.find((user) => parseInt(user.id) === customerId);
        return user.email;
    };

    const getTime = (timeId, listTime) => {
        const time = listTime.find((t) => t.id === timeId);
        return time.time;
    };

    const handleRowSelection = (e) => {
        navigate(e);
    };

    if (bookingsQuery.isLoading || usersQuery.isLoading || listTime.isLoading)
        return <Loading />;

    if (bookingsQuery.isError || usersQuery.isError || listTime.isError)
        return <div>{JSON.stringify(bookingsQuery.error)}</div>;
    if (bookingsQuery.isSuccess && usersQuery.isSuccess && listTime.isSuccess)
        return (
            <div className="flex justify-center">
                <Table
                    aria-label="table"
                    onRowAction={handleRowSelection}
                    classNames={{
                        th: "bg-yellow-500 font-bold uppercase",
                        tr: "hover:bg-black/20 hover:cursor-pointer",
                    }}
                >
                    <TableHeader>
                        <TableColumn>Reference ID</TableColumn>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Time</TableColumn>
                        <TableColumn>Status</TableColumn>
                    </TableHeader>
                    <TableBody items={bookingsQuery.data?.data}>
                        {(item) => (
                            <TableRow key={item?.id}>
                                <TableCell>{item.code}</TableCell>
                                <TableCell>
                                    <div className="capitalize font-bold">
                                        {" "}
                                        {getUserName(
                                            item.customer,
                                            usersQuery?.data?.data
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {getUserEmail(
                                        item.customer,
                                        usersQuery?.data?.data
                                    )}
                                </TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>
                                    {formatTime(
                                        getTime(item.time, listTime.data?.data)
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        variant="dot"
                                        color={
                                            item.status === "pending"
                                                ? "warning"
                                                : item.status === "confirmed"
                                                ? "primary"
                                                : item.status === "completed"
                                                ? "success"
                                                : "danger"
                                        }
                                        className="capitalize"
                                    >
                                        {item.status}
                                    </Chip>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        );
};

export default AdminBookings;
