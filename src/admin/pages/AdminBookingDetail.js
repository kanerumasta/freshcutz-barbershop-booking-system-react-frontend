import {
    Button,
    Image,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaBackward, FaUser } from "react-icons/fa";
import { FaPesoSign } from "react-icons/fa6";
import { MdQrCode, MdQuestionMark } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../main/components/Loading";
import {
    useBookingDetailQuery,
    useBookingServicesQuery,
    useCompleteBookingMutation,
    useConfirmBookingMutation,
    useUsersQuery,
} from "../../services/api";
import { selectIsDark, setRefresh } from "../../state/settingsSlice";

const AdminBookingDetail = () => {
    const navigate = useNavigate();
    const { bookingId } = useParams();
    const usersQuery = useUsersQuery();
    const bookingDetailQuery = useBookingDetailQuery(bookingId);
    const bookingServicesQuery = useBookingServicesQuery(bookingId);
    const confirmBookingMutation = useConfirmBookingMutation();
    const completeBookingMutation = useCompleteBookingMutation();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const isDark = useSelector(selectIsDark);
    const dispatch = useDispatch();

    const getUserName = (customerId, users) => {
        const user = users?.find((user) => parseInt(user.id) === customerId);
        return `${user.first_name} ${user.last_name}`;
    };

    const handleCompleteBooking = () => {
        const formData = new FormData();
        formData.append("booking_id", bookingId);
        completeBookingMutation.mutate(formData);
    };
    const handleConfirmBooking = () => {
        const formData = new FormData();
        formData.append("booking_id", bookingId);
        confirmBookingMutation.mutate(formData);
    };
    useEffect(() => {
        if (
            confirmBookingMutation.isSuccess ||
            completeBookingMutation.isSuccess
        ) {
            onOpen();
        }
    }, [confirmBookingMutation.isSuccess, completeBookingMutation.isSuccess]);
    if (confirmBookingMutation.isPending)
        return <Loading label="Confirming..." />;

    if (
        bookingDetailQuery.isLoading ||
        bookingServicesQuery.isLoading ||
        usersQuery.isLoading
    )
        return <Loading />;
    if (
        bookingDetailQuery.isError ||
        bookingServicesQuery.isError ||
        usersQuery.isError
    )
        return <div>Error</div>;
    return (
        <div>
            <div>
                <div
                    onClick={() => navigate(-1)}
                    className="hover:cursor-pointer p-2 w-10 flex items-center justify-center h-10 rounded-full hover:bg-yellow-500/20"
                >
                    <FaBackward color={isDark ? "#fff" : "#000"} />
                </div>
            </div>
            <div className="">
                <div class=" p-6 bg-white shadow-md rounded-md">
                    <div class="mb-4 text-2xl font-semibold">
                        Booking Details
                    </div>

                    <div class="">
                        <div className="flex items-center">
                            <MdQrCode color="gray" />
                            <label class=" ml-2 w-[200px] capitalize font-bold text-sm text-gray-700">
                                Booking Reference:
                            </label>
                            <p class="text-lg font-medium capitalize text-gray-900">
                                {bookingDetailQuery?.data?.data?.code}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <MdQuestionMark color="gray" />
                            <label class="ml-2 w-[200px] capitalize font-bold text-sm text-gray-700">
                                Status:
                            </label>
                            <p class="text-lg font-medium capitalize text-gray-900">
                                {bookingDetailQuery?.data?.data?.status}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <FaUser color="gray" />
                            <label class="ml-2 w-[200px] capitalize font-bold text-sm text-gray-700">
                                Customer:
                            </label>
                            <p class="text-lg font-medium capitalize text-gray-900">
                                {getUserName(
                                    bookingDetailQuery?.data?.data?.customer,
                                    usersQuery.data?.data
                                )}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <FaPesoSign color="gray" />
                            <label class="ml-2 w-[200px] capitalize font-bold text-sm text-gray-700">
                                Total:
                            </label>
                            <p class="text-lg font-medium capitalize text-gray-900">
                                {bookingDetailQuery?.data?.data?.total}
                            </p>
                        </div>
                    </div>
                </div>

                <div>services</div>
                <Table
                    aria-label="table"
                    classNames={{
                        th: "bg-yellow-500 text-center uppercase font-bold",
                        td: "text-center",
                    }}
                >
                    <TableHeader>
                        <TableColumn>Service</TableColumn>
                        <TableColumn>Style</TableColumn>
                        <TableColumn>Image</TableColumn>
                    </TableHeader>
                    <TableBody items={bookingServicesQuery.data?.data}>
                        {(item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.service.name}</TableCell>
                                <TableCell>{item.style.name}</TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        <Image
                                            width={300}
                                            height={200}
                                            src={`http://127.0.0.1:8000${item.style.image}`}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Spacer y={6} />
                {bookingDetailQuery.data.data.status === "pending" ? (
                    <Button
                        onClick={handleConfirmBooking}
                        radius="lg"
                        className=" bg-orange-500 p-8 text-xl font-bold text-white"
                    >
                        Confirm Booking
                    </Button>
                ) : bookingDetailQuery.data.data.status === "confirmed" ? (
                    <Button
                        startContent={<AiFillLike color="blue" size={30} />}
                        onClick={handleCompleteBooking}
                        radius="lg"
                        className=" bg-orange-500 p-8 text-xl font-bold text-white"
                    >
                        Service Completed
                    </Button>
                ) : (
                    ""
                )}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Successful
                            </ModalHeader>
                            {/* <ModalBody>
                                <p>Booking is now confirmed!!</p>
                            </ModalBody> */}
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        dispatch(setRefresh());
                                        navigate("/admin/bookings");
                                    }}
                                >
                                    OK
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AdminBookingDetail;
