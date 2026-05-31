import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  movieWatchList: [],
  tvShowWatchList: [],
  likedMovies: [],
  likedTvShows: [],
  geminiSuggestedMovies: [],
  chatAiSuggestedMovies: [],
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

    addLikedMovie: (state, action) => {
      const exists = state.likedMovies.some(
        (movie) => movie.id === action.payload.id,
      );

      if (!exists) {
        state.likedMovies.push(action.payload);
      }
    },
    removeLikedMovie: (state, action) => {
      state.likedMovies = state.likedMovies.filter(
        (movie) => movie.id !== action.payload,
      );
    },
    clearLikedMovies: (state) => {
      state.likedMovies = [];
    },

    addLikedTvShow: (state, action) => {
      const exists = state.likedTvShows.some(
        (tvShow) => tvShow.id === action.payload.id,
      );

      if (!exists) {
        state.likedTvShows.push(action.payload);
      }
    },
    removeLikedTvShow: (state, action) => {
      state.likedTvShows = state.likedTvShows.filter(
        (tvShow) => tvShow.id !== action.payload,
      );
    },
    clearLikedTvShows: (state) => {
      state.likedTvShows = [];
    },

    setGeminiSuggestedMovies: (state, action) => {
      state.geminiSuggestedMovies = action.payload;
    },
    clearGeminiSuggestedMovies: (state) => {
      state.geminiSuggestedMovies = [];
    },

    setChatAiSuggestedMovies: (state, action) => {
      state.chatAiSuggestedMovies = action.payload;
    },
    clearChatAiSuggestedMovies: (state) => {
      state.chatAiSuggestedMovies = [];
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
  addLikedMovie,
  removeLikedMovie,
  clearLikedMovies,
  addLikedTvShow,
  removeLikedTvShow,
  clearLikedTvShows,
  setGeminiSuggestedMovies,
  clearGeminiSuggestedMovies,
  setChatAiSuggestedMovies,
  clearChatAiSuggestedMovies,
} = userSlice.actions;

export default userSlice.reducer;
