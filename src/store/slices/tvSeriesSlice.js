import { createSlice } from "@reduxjs/toolkit";

const tvSeriesSlice = createSlice({
    name: "tvSeries",
    initialState: {
        nowPlayingSeries: null,
        popularSeries: null,
        topRatedSeries: null,
        upcomingSeries: null,
        gptSuggestedSeries: null,
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
        addUpcomingSeries : (state, action) => {
            state.upcomingSeries = action.payload;
        },
        addTrailer: (state, action) => {
            state.trailer = action.payload;
        },
        addGptSuggestedSeries: (state, action) => {
            state.gptSuggestedSeries = action.payload;
        },
    },
});
export const { addSeries,addTrailer,addPopularSeries,addTopRatedSeries,addUpcomingSeries, addGptSuggestedSeries  } = tvSeriesSlice.actions;
export default tvSeriesSlice.reducer;