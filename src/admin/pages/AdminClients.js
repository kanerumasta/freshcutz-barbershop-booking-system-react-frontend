import {
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import React from "react";
import { useUsersQuery } from "../../services/api";

const AdminClients = () => {
    const usersQuery = useUsersQuery();
    const filteredUsers = usersQuery?.data?.data.filter(
        (user) => user.is_admin === false
    );
    if (usersQuery.isLoading) return <div>Loading</div>;
    if (usersQuery.isError) return <div>Error</div>;

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableColumn>FIRST NAME</TableColumn>
                    <TableColumn>LAST NAME</TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody items={filteredUsers}>
                    {(user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="capitalize">
                                    {user.first_name}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="capitalize">
                                    {user.last_name}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="">{user.email}</div>
                            </TableCell>
                            <TableCell>
                                {user.is_active ? (
                                    <Chip variant="dot" color="success">
                                        Active
                                    </Chip>
                                ) : (
                                    <Chip variant="dot" color="danger">
                                        Inactive
                                    </Chip>
                                )}
                            </TableCell>
                            <TableCell>
                                <Button
                                    color={
                                        user.is_active ? "danger" : "success"
                                    }
                                    className="font-bold"
                                >
                                    {user.is_active ? "Suspend" : "Activate"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminClients;
