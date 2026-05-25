import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  movieWatchList: [],
  tvShowWatchList: [],
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
      state.movieWatchList = [];
      state.tvShowWatchList = [];
    },

    addMovie: (state, action) => {
      const exists = state.movieWatchList.some(
        (movie) => movie.id === action.payload.id,
      );

      if (!exists) {
        state.movieWatchList.push(action.payload);
      }
    },
    removeMovie: (state, action) => {
      state.movieWatchList = state.movieWatchList.filter(
        (movie) => movie.id !== action.payload,
      );
    },
    clearMovieWatchList: (state) => {
      state.movieWatchList = [];
    },

    addTvShow: (state, action) => {
      const exists = state.tvShowWatchList.some(
        (tvShow) => tvShow.id === action.payload.id,
      );

      if (!exists) {
        state.tvShowWatchList.push(action.payload);
      }
    },
    removeTvShow: (state, action) => {
      state.tvShowWatchList = state.tvShowWatchList.filter(
        (tvShow) => tvShow.id !== action.payload,
      );
    },
    clearTvShowWatchList: (state) => {
      state.tvShowWatchList = [];
    },
  },
});

export const {
  setUser,
  clearUser,

  addMovie,
  removeMovie,
  clearMovieWatchList,
  addTvShow,
  removeTvShow,
  clearTvShowWatchList,
} = userSlice.actions;

export default userSlice.reducer;
