import {
    Accordion,
    AccordionItem,
    Button,
    Chip,
    Progress,
    Spinner,
    Tab,
    Tabs,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaCalendar, FaClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import CustomDatePicker from "../../main/components/CustomDatePicker";
import { StyleSelector } from "../../main/components/StyleSelector";
import { TimePicker } from "../../main/components/TimePicker";
import {
    useBookMutation,
    useBookingServicesMutation,
    useServicesQuery,
} from "../../services/api";
import { selectUser } from "../../state/authSlice";
import {
    clearData,
    selectDate,
    selectServices,
    selectTime,
    selectTotal,
} from "../../state/bookingSlice";
import { stylesHasSamePrices } from "../../utils/functions";
import BookingInstructions from "../../main/components/BookingInstructions";
import { MdCheckCircle } from "react-icons/md";

//GCASH NUMBER (SEND)
//SEND PROOF TO MESSENGER (LINK)
//
const AddBookingForm = () => {
    const [step, setStep] = useState(1);
    const services = useSelector(selectServices);
    const selectedDate = useSelector(selectDate);
    const selectedTime = useSelector(selectTime);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const addBookingMutation = useBookMutation();
    const bookingServicesMutation = useBookingServicesMutation();
    const total = useSelector(selectTotal);

    const { data } = useServicesQuery();

    const handleAddBooking = async () => {
        const formData = new FormData();
        formData.append("customer", user?.userId);
        formData.append("date", selectedDate);
        formData.append("time", parseInt(selectedTime));
        formData.append("total", parseFloat(total));

        addBookingMutation.mutate(formData);
    };

    const isNextDisabled = () => {
        switch (step) {
            case 1:
                return services.length === 0;
            case 2:
                return !selectedDate || !selectedTime;
            case 3:
            case 4:
            case 5:
                // No additional conditions for steps 3, 4, and 5
                return false;
            default:
                return true;
        }
    };

    const closeForm = () => {
        dispatch(clearData());
        setStep(1);
    };

    useEffect(() => {
        const handleBookingServices = async () => {
            services.forEach((serv) => {
                const formData = new FormData();
                formData.append(
                    "booking",
                    parseInt(addBookingMutation.data.data.id)
                );
                formData.append("service", parseInt(serv.service));
                formData.append("style", parseInt(serv.style));
                bookingServicesMutation.mutate(formData);
            });
            setStep((step) => step + 1);
        };

        if (addBookingMutation.isSuccess) {
            handleBookingServices();
        }
    }, [addBookingMutation.isSuccess]);

    return (
        <div className="lg:w-[40%] w-full min-h-[80%] bg-white p-2 rounded-lg">
            {addBookingMutation.isPending ? (
                <Spinner
                    aria-label="loading"
                    color="primary"
                    label="Loading.."
                    labelColor="primary"
                />
            ) : (
                <>
                    <div
                        className={`${
                            step === 5 && "hidden"
                        } flex items-center mb-12 mt-6 px-10`}
                    >
                        <Chip
                            size="sm"
                            className="ring-2 ring-offset-4 ring-yellow-500"
                            color={step >= 1 ? "warning" : "default"}
                        >
                            {" "}
                        </Chip>
                        <Progress
                            aria-label="Progress"
                            color="warning"
                            size="sm"
                            value={step >= 2 ? 100 : 0}
                        />
                        <Chip
                            size="sm"
                            className="ring-2 ring-offset-4 ring-yellow-500"
                            color={step >= 2 ? "warning" : "default"}
                        >
                            {" "}
                        </Chip>
                        <Progress
                            aria-label="Progress"
                            color="warning"
                            size="sm"
                            value={step >= 3 ? 100 : 0}
                        />
                        <Chip
                            size="sm"
                            className="ring-2 ring-offset-4 ring-yellow-500"
                            color={step >= 3 ? "warning" : "default"}
                        >
                            {" "}
                        </Chip>
                        <Progress
                            aria-label="Progress"
                            color="warning"
                            size="sm"
                            value={step >= 4 ? 100 : 0}
                        />
                        <Chip
                            size="sm"
                            className="ring-2 ring-offset-4 ring-yellow-500"
                            color={step >= 4 ? "warning" : "default"}
                        >
                            {" "}
                        </Chip>
                    </div>
                    <div className="overflow-hidden w-full h-full rounded-lg">
                        <div
                            className={`transition ease-in-out delay-100 flex ${
                                step === 1
                                    ? "translate-x-0"
                                    : step === 2
                                    ? "-translate-x-[100%]"
                                    : step === 3
                                    ? "-translate-x-[200%]"
                                    : step === 4
                                    ? "-translate-x-[300%]"
                                    : step === 5
                                    ? "-translate-x-[400%]"
                                    : ""
                            }`}
                        >
                            <div className=" min-w-full">
                                <Accordion aria-label="accordion">
                                    {data?.map(
                                        (service) =>
                                            service.styles.length > 0 && (
                                                <AccordionItem
                                                    textValue="item"
                                                    key={service.id}
                                                    title={
                                                        <div className="font-bold uppercase">
                                                            {service.name}
                                                            {stylesHasSamePrices(
                                                                service.styles
                                                            ) && (
                                                                <span className="ml-3">
                                                                    {
                                                                        service
                                                                            .styles[0]
                                                                            ?.price
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    }
                                                >
                                                    <StyleSelector
                                                        service={service.id}
                                                        styles={service.styles}
                                                    />
                                                </AccordionItem>
                                            )
                                    )}
                                </Accordion>
                            </div>
                            <div className="min-w-full ">
                                <div className=" text-black/50 font-bold text-xl p-8">
                                    Please select date and time
                                </div>
                                <div className="flex flex-col items-center">
                                    <Tabs
                                        variant="bordered"
                                        color="primary"
                                        aria-label="Date and Time Tabs"
                                    >
                                        <Tab
                                            key="date"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <FaCalendar />
                                                    <span className="font-bold">
                                                        DATE
                                                    </span>
                                                </div>
                                            }
                                        >
                                            <CustomDatePicker />
                                        </Tab>
                                        <Tab
                                            key="time"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <FaClock />
                                                    <span className="font-bold">
                                                        TIME
                                                    </span>
                                                </div>
                                            }
                                        >
                                            <TimePicker />
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                            <div className=" min-w-full py-6 px-4">
                                <div className="uppercase font-bold mb-8">
                                    review your booking
                                </div>
                                <div className="shadow-md p-4 mb-4">
                                    <div className="mb-6 text-xl font-bold text-gray-400 uppercase">
                                        services
                                    </div>
                                    <div className="px-4 text-sm">
                                        {services?.map((service) => (
                                            <div
                                                key={service.service}
                                                className="font-bold uppercase"
                                            >
                                                <span className="mr-2">
                                                    {
                                                        data.find(
                                                            (d) =>
                                                                parseInt(
                                                                    d.id
                                                                ) ===
                                                                parseInt(
                                                                    service.service
                                                                )
                                                        ).name
                                                    }
                                                </span>
                                                <span className="mr-2">
                                                    {
                                                        data
                                                            .find(
                                                                (d) =>
                                                                    parseInt(
                                                                        d.id
                                                                    ) ===
                                                                    parseInt(
                                                                        service.service
                                                                    )
                                                            )
                                                            .styles.find(
                                                                (s) =>
                                                                    parseInt(
                                                                        s.id
                                                                    ) ===
                                                                    parseInt(
                                                                        service.style
                                                                    )
                                                            ).name
                                                    }
                                                </span>
                                                <span>
                                                    P
                                                    {
                                                        data
                                                            .find(
                                                                (d) =>
                                                                    parseInt(
                                                                        d.id
                                                                    ) ===
                                                                    parseInt(
                                                                        service.service
                                                                    )
                                                            )
                                                            .styles.find(
                                                                (s) =>
                                                                    parseInt(
                                                                        s.id
                                                                    ) ===
                                                                    parseInt(
                                                                        service.style
                                                                    )
                                                            ).price
                                                    }
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-2 border-solid border-gray-200 my-6"></div>
                                    <div className="mb-4 text-xl font-bold text-gray-400 uppercase">
                                        Total
                                    </div>
                                    <div className="px-6 font-bold">
                                        <p>P{total}</p>
                                    </div>
                                    <div className="border-2 border-solid border-gray-200 my-6"></div>
                                    <div className="mb-4 text-xl font-bold text-gray-400 uppercase">
                                        contact info
                                    </div>
                                    <div className="px-6 font-bold">
                                        <p>{user?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-full">
                                <BookingInstructions />
                            </div>
                            <div className="min-w-full bg-green-50 border-l-4 border-green-500 p-4 rounded-md flex items-center">
                                <MdCheckCircle className="text-green-500 mr-4 text-4xl" />
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">
                                        Thank you for your submission!
                                    </h2>
                                    <p>
                                        Your booking request has been received.
                                        We will review your information and
                                        notify you once the booking is
                                        confirmed.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex px-4 justify-between">
                            {step > 1 && step < 5 ? (
                                <Button onClick={() => setStep(step - 1)}>
                                    PREVIOUS
                                </Button>
                            ) : (
                                <span>{""}</span>
                            )}
                            {step === 4 ? (
                                <Button
                                    color="warning"
                                    className="text-white font-bold"
                                    onPress={handleAddBooking}
                                >
                                    BOOK APPOINTMENT
                                </Button>
                            ) : step === 5 ? (
                                <Button
                                    color="warning"
                                    className="text-white font-bold"
                                    onClick={closeForm}
                                >
                                    BOOK ANOTHER APPOINTMENT
                                </Button>
                            ) : (
                                <Button
                                    isDisabled={isNextDisabled()}
                                    color="primary"
                                    onClick={() => setStep(step + 1)}
                                >
                                    NEXT
                                </Button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddBookingForm;
