import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const endpoint = "/fakeApi/users";
  const response = await fetch(endpoint);
  return JSON.parse(response["_bodyInit"]).users;
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
