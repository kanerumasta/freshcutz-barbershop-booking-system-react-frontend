import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        services: [],
        date: null,
        time: null,
        customer: null,
        total: 0,
    },
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setTime: (state, action) => {
            state.time = action.payload;
        },
        setCustomer: (state, action) => {
            state.customer = action.payload;
        },
        setTotal: (state, action) => {
            state.total = action.payload;
        },
        clearData: (state) => {
            state.services = [];
            state.date = null;
            state.time = null;
            state.customer = null;
        },
    },
});

export const selectServices = (state) => state.booking.services;
export const selectDate = (state) => state.booking.date;
export const selectTime = (state) => state.booking.time;
export const selectCustomer = (state) => state.booking.customer;
export const selectTotal = (state) => state.booking.total;
export const {
    setServices,
    setDate,
    setTime,
    setCustomer,
    clearData,
    setTotal,
} = bookingSlice.actions;
export default bookingSlice.reducer;
