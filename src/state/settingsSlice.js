import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
    name: "settings",
    initialState: { isDark: true, refresh: 0 },
    reducers: {
        setDark: (state, action) => {
            state.isDark = action.payload;
        },
        setRefresh: (state) => {
            state.refresh = state.refresh + 1;
        },
    },
});

export const selectIsDark = (state) => state.settings.isDark;
export const selectRefresh = (state) => state.settings.refresh;
export const { setDark, setRefresh } = settingsSlice.actions;
export default settingsSlice.reducer;
