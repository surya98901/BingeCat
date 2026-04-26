import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    gptSuggestedMovies: null,
    trailer: null,
    movieDetails: null, // ✅ add this
  },
  reducers: {
    addMovie: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovie: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovie: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovie: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    addMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    addGptSuggestedMovies: (state, action) => {
      state.gptSuggestedMovies = action.payload;
    },
  },
});
export const { addMovie,addTrailer,addPopularMovie,addTopRatedMovie,addUpcomingMovie,addMovieDetails, addGptSuggestedMovies  } = moviesSlice.actions;
export default moviesSlice.reducer;