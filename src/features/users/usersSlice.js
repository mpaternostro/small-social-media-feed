import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const endpoint = "/fakeApi/users";
  const response = await client.get(endpoint);
  return response.users;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (st) => st.users;

export const selectUserById = (st, userId) =>
  st.users.find(({ id }) => id === userId);
