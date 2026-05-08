import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  movieList: [],
  seriesList: [],
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {

    // User Authentication
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },

    clearUser: (state) => {
      state.currentUser = null;
      state.movieList = [];
      state.seriesList = [];
    },

    // Movie Watchlist
    addMovie: (state, action) => {

      const exists = state.movieList.some(
        (movie) => movie.id === action.payload.id
      );

      if (!exists) {
        state.movieList.push(action.payload);
      }
    },

    removeMovie: (state, action) => {
      state.movieList = state.movieList.filter(
        (movie) => movie.id !== action.payload
      );
    },

    // Series Watchlist
    addSeries: (state, action) => {

      const exists = state.seriesList.some(
        (series) => series.id === action.payload.id
      );

      if (!exists) {
        state.seriesList.push(action.payload);
      }
    },

    removeSeries: (state, action) => {
      state.seriesList = state.seriesList.filter(
        (series) => series.id !== action.payload
      );
    },

    // Clear Lists
    clearMovieList: (state) => {
      state.movieList = [];
    },

    clearSeriesList: (state) => {
      state.seriesList = [];
    },
  },
});

export const {
  setUser,
  clearUser,

  addMovie,
  removeMovie,

  addSeries,
  removeSeries,

  clearMovieList,
  clearSeriesList,

} = userSlice.actions;

export default userSlice.reducer;