import React from "react";
import { useBookingQuery, useUsersQuery } from "../../services/api";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import Loading from "../../main/components/Loading";
import { Stars } from "../../main/components/Stars";
const AdminFeedbacks = () => {
    const bookingsQuery = useBookingQuery();
    const usersQuery = useUsersQuery();
    const filteredBookings = bookingsQuery.data?.data.filter(
        (b) => b.status === "completed" && b.rate
    );

    const getUserName = (customerId, users) => {
        const user = users.find((user) => parseInt(user.id) === customerId);
        return `${user.first_name} ${user.last_name}`;
    };
    const getUserEmail = (customerId, users) => {
        const user = users.find((user) => parseInt(user.id) === customerId);
        return user.email;
    };
    if (usersQuery.isLoading || bookingsQuery.isLoading) return <Loading />;
    if (usersQuery.isError || bookingsQuery.isError) return <div>ERROR</div>;
    return (
        <div>
            <div>
                <Table
                    aria-label="table"
                    classNames={{
                        th: "bg-yellow-500 font-bold uppercase",
                    }}
                >
                    <TableHeader>
                        <TableColumn>BOOKING NO.</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>EMAIL</TableColumn>

                        <TableColumn>COMMENT</TableColumn>
                        <TableColumn>RATE</TableColumn>
                    </TableHeader>
                    <TableBody items={filteredBookings}>
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
                                <TableCell>{item.comment}</TableCell>
                                <TableCell>
                                    <Stars rate={item.rate} />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminFeedbacks;
