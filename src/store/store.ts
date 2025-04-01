import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import notification from "./notificationSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    notification: notification
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
