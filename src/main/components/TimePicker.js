import { useEffect, useState } from "react";
import { api, useTimeQuery } from "../../services/api";
import { formatTime } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { selectDate, selectTime, setTime } from "../../state/bookingSlice";
import { Select, SelectItem } from "@nextui-org/react";

export const TimePicker = () => {
    const { isLoading, data, isError } = useTimeQuery();
    const datePicked = useSelector(selectDate);
    const timePicked = useSelector(selectTime);
    const [disabledKeys, setDisabledKeys] = useState([]);
    const dispatch = useDispatch();

    const isDateTimeTaken = async (date, time) => {
        try {
            const response = await api.get(
                `http://localhost:8000/api/is-time-taken?date=${date}&time=${time}`
            );
            if (response && response.status && response.status === 200) {
                return response.data.is_taken;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeTime = (e) => {
        dispatch(setTime(parseInt(e.target.value)));
    };

    const fetchAvailability = async () => {
        try {
            const promises = data?.data?.map((t) =>
                isDateTimeTaken(datePicked, t.id)
            );
            const results = await Promise.all(promises);

            setDisabledKeys(
                data?.data
                    ?.filter((t, index) => results[index])
                    .map((t) => String(t.id))
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (data?.data) {
            fetchAvailability();
            console.log(disabledKeys);
        }
    }, [data, datePicked]);

    if (isLoading) return <div>Loading..</div>;
    if (isError) return <div>Error</div>;

    return (
        <div className="min-w-[200px]">
            <Select
                label="Select Time Slot:"
                variant="bordered"
                onChange={handleChangeTime}
                disabledKeys={disabledKeys}
                selectedKeys={timePicked ? [String(timePicked)] : ""}
            >
                {data?.data?.map((t, index) => (
                    <SelectItem key={t.id} value={t.id}>
                        {formatTime(t.time)}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};
