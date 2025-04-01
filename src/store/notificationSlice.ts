import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "", // "success", "error", "info", "warning"
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification: (state) => {
      state.message = "";
      state.type = "";
    },
  },
});

export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
