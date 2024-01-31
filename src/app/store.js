import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/authSlice";
import settingsReducer from "../state/settingsSlice";
import bookingReducer from "../state/bookingSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        settings: settingsReducer,
        booking : bookingReducer,
    },
});
