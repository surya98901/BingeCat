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
        addUpcomingMovie : (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addTrailer: (state, action) => {
            state.trailer = action.payload;
        },
        addGptSuggestedMovies: (state, action) => {
            state.gptSuggestedMovies = action.payload;
        },
    },
});
export const { addMovie,addTrailer,addPopularMovie,addTopRatedMovie,addUpcomingMovie, addGptSuggestedMovies  } = moviesSlice.actions;
export default moviesSlice.reducer;