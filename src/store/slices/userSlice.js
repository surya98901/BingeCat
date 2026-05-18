import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  watchList: [],
};

const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },

    clearUser: (state) => {
      state.currentUser = null;
      state.watchList = [];
    },

    addMovie: (state, action) => {
      const exists = state.watchList.some(
        (movie) => movie.id === action.payload.id,
      );

      if (!exists) {
        state.watchList.push(action.payload);
      }
    },

    removeMovie: (state, action) => {
      state.watchList = state.watchList.filter(
        (movie) => movie.id !== action.payload,
      );
    },

    // Clear Lists
    clearWatchList: (state) => {
      state.watchList = [];
    },
  },
});

export const {
  setUser,
  clearUser,

  addMovie,
  removeMovie,
  clearWatchList,
} = userSlice.actions;

export default userSlice.reducer;
