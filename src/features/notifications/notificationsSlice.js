import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = notificationsAdapter.getInitialState({
  status: "idle",
});

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
      Object.values(state.entities).forEach((notif) => (notif.read = true));
    },
  },
  extraReducers: {
    [fetchNotifications.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      Object.values(state.entities).forEach(
        (notif) => (notif.isNew = !notif.read)
      );
      notificationsAdapter.upsertMany(state, action.payload);
      state.status = "success";
    },
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const getNotificationStatus = (state) => state.notifications.status;

export const {
  selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors((st) => st.notifications);
