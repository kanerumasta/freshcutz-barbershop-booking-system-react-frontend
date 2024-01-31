import Cookies from "js-cookie";

export const stylesHasSamePrices = (array) => {
    const firstPrice = parseFloat(array[0].price);
    array.forEach((element) => {
        if (parseFloat(element) !== firstPrice) return false;
    });
    return true;
};

export const formatTime = (inputTime) => {
    const timeArray = inputTime.split(":");
    const hour = parseInt(timeArray[0], 10);
    const minute = parseInt(timeArray[1], 10);

    let formattedTime;

    if (hour >= 0 && hour < 12) {
        formattedTime = `${hour}:${String(minute).padStart(2, "0")} AM`;
    } else if (hour === 12) {
        formattedTime = `12:${String(minute).padStart(2, "0")} PM`;
    } else {
        formattedTime = `${hour - 12}:${String(minute).padStart(2, "0")} PM`;
    }

    return formattedTime;
};

export const clearToken = () => {
    localStorage.removeItem("refreshToken");
    Cookies.remove("accessToken");
};
