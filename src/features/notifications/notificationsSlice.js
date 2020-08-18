import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  notifications: [],
  status: "idle",
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : "";
    const endpoint = `/fakeApi/notifications?since=${latestTimestamp}`;
    const response = await client.get(endpoint);
    return response.notifications;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    allNotificationsRead: (state, action) => {
      state.notifications.forEach((notif) => (notif.read = true));
    },
  },
  extraReducers: {
    [fetchNotifications.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.notifications.forEach((notif) => (notif.isNew = !notif.read));
      state.notifications.push(...action.payload);
      state.notifications.sort((a, b) => b.date.localeCompare(a.date));
      state.status = "success";
    },
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const selectAllNotifications = (state) =>
  state.notifications.notifications;

export const getNotificationStatus = (state) => state.notifications.status;
