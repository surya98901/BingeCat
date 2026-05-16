import { createSlice } from "@reduxjs/toolkit";

const tvSeriesSlice = createSlice({
  name: "tvSeries",
  initialState: {
    nowPlayingSeries: null,
    popularSeries: null,
    topRatedSeries: null,
    upcomingSeries: null,
    gptSuggestedSeries: null,
    SeriesDetails: null,
    trailer: null,
  },
  reducers: {
    addSeries: (state, action) => {
      state.nowPlayingSeries = action.payload;
    },
    addPopularSeries: (state, action) => {
      state.popularSeries = action.payload;
    },
    addTopRatedSeries: (state, action) => {
      state.topRatedSeries = action.payload;
    },
    addUpcomingSeries: (state, action) => {
      state.upcomingSeries = action.payload;
    },
    addtvTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    addSeriesDetails: (state, action) => {
      state.SeriesDetails = action.payload;
    },
    addGptSuggestedSeries: (state, action) => {
      state.gptSuggestedSeries = action.payload;
    },
  },
});
export const {
  addSeries,
  addtvTrailer,
  addPopularSeries,
  addTopRatedSeries,
  addUpcomingSeries,
  addSeriesDetails,
  addGptSuggestedSeries,
} = tvSeriesSlice.actions;
export default tvSeriesSlice.reducer;
