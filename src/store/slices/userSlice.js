import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const updateUserField = (state, field, value) => {
  if (!state.user) return;
  state.user[field] = value;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
    },

    setMovieList: (state, action) => {
      updateUserField(state, "movieList", action.payload);
    },

    setSeriesList: (state, action) => {
      updateUserField(state, "seriesList", action.payload);
    },

    setWatchlist: (state, action) => {
      updateUserField(state, "watchlist", action.payload);
    },

    // 🔥 BONUS: generic updater (very powerful)
    updateUserData: (state, action) => {
      if (!state.user) return;
      Object.assign(state.user, action.payload);
    },
  },
});

export const {
  setUser,
  clearUser,
  setMovieList,
  setSeriesList,
  setWatchlist,
  updateUserData,
} = userSlice.actions;

export default userSlice.reducer;