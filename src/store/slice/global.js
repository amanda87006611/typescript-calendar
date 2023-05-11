import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    origin: null,
    yearList: null,
    loading: false,
  },
  reducers: {},
  extraReducers: {},
});

export default globalSlice.reducer;
