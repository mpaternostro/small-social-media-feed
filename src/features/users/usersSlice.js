import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", name: "Charly" },
  { id: "2", name: "Ringo" },
  { id: "3", name: "Marce" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
