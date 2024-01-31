import {
    Button,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    useRateBookingMutation,
    useTimeQuery,
    useUserBookingsQuery,
} from "../../services/api";
import { selectUser } from "../../state/authSlice";
import { setRefresh } from "../../state/settingsSlice";
import Loading from "../components/Loading";
import Rate from "../components/Rate";
import { formatTime } from "../../utils/functions";

const MyBookings = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [rate, setRate] = useState();
    const [comment, setComment] = useState("");
    const user = useSelector(selectUser);
    const userBookingsQuery = useUserBookingsQuery(user?.userId);
    const listTime = useTimeQuery();
    const rateBookingMutation = useRateBookingMutation();
    const [bookingIdToRate, setBookingIdToRate] = useState();
    const dispatch = useDispatch();

    const cleanRateData = () => {
        setRate(0);
        setComment("");
    };

    const handleSubmitRate = () => {
        const formData = new FormData();
        formData.append("booking_id", bookingIdToRate);
        formData.append("rate", rate);
        formData.append("comment", comment);
        rateBookingMutation.mutate(formData);
        onClose();
    };

    useEffect(() => {
        if (rateBookingMutation.isSuccess) {
            dispatch(setRefresh());
            cleanRateData();
            userBookingsQuery.refetch();
        }
    }, [rateBookingMutation.isSuccess]);

    if (userBookingsQuery.isLoading) return <Loading />;

    const getTime = (timeId, listTime) => {
        const time = listTime?.find((t) => t.id === timeId);
        return time?.time;
    };

    return (
        <div className=" h-screen p-8 pt-24">
            <div className="text-2xl font-bold text-white my-10">
                My Bookings
            </div>
            <Table aria-label="Bookings table">
                <TableHeader>
                    <TableColumn>REFERENCE ID</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>TIME</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>TOTAL</TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody items={userBookingsQuery?.data?.data}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.code}</TableCell>
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
                            <TableCell>{item.total}</TableCell>
                            <TableCell>
                                {item.status === "completed" && !item.rate && (
                                    <Button
                                        onClick={() => {
                                            setBookingIdToRate(item.id);
                                            onOpen();
                                        }}
                                        className="transition delay-75 hover:bg-orange-500 hover:text-white hover:cursor-pointer"
                                        startContent={<FaStar />}
                                    >
                                        Rate
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                We Are Happy To Hear Your Feedback
                            </ModalHeader>
                            <ModalBody>
                                <Rate
                                    comment={comment}
                                    rate={rate}
                                    setRate={setRate}
                                    setComment={setComment}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    color="success"
                                    onPress={handleSubmitRate}
                                >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default MyBookings;
