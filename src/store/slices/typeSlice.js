import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentType: "movies",
};

const typeSlice = createSlice({
  name: "type",

  initialState,

  reducers: {
    setType: (state, action) => {
      state.currentType = action.payload;
    },
  },
});

export const { setType } = typeSlice.actions;

export default typeSlice.reducer;
