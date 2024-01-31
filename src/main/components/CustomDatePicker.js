import { format, isBefore, isSunday, parseISO } from "date-fns";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useDisabledDatesQuery } from "../../services/api";
import { selectDate, setDate } from "../../state/bookingSlice";

const CustomDatePicker = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector(selectDate);
    const { data } = useDisabledDatesQuery();

    const handleDateChange = (date) => {
        const formattedDate = format(
            parseISO(date.toISOString()),
            "yyyy-MM-dd"
        );
        dispatch(setDate(formattedDate));
    };

    const isDateValid = (date) => {
        // Check if the date is not in the past
        if (isBefore(date, new Date())) {
            return false;
        }

        // Check if the date is not a Sunday
        if (isSunday(date)) {
            return false;
        }

        if (data?.data?.find((disabledDate) => disabledDate.date === date)) {
            return false;
        }

        return true;
    };

    return (
        <DatePicker
            placeholderText="Select Date Slot"
            selected={selectedDate ? new Date(selectedDate) : null}
            onChange={handleDateChange}
            minDate={new Date()} // Disable past dates
            filterDate={isDateValid} // Custom date validation
            excludeDates={data?.data?.map(
                (disabledDate) => new Date(disabledDate.date)
            )}
            className="w-full p-2 border rounded-md hover:cursor-pointer"
        />
    );
};

export default CustomDatePicker;
