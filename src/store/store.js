import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import moviesReducer from "./slices/moviesSlice";
import tvSeriesReducer from "./slices/tvSeriesSlice";
// import searchReducer from "./searchSlice";
import themeReducer from "./slices/themeSlice";
import watchProviderReducer from "./slices/watchProviderslice"; 


const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    tvSeries: tvSeriesReducer,
    watchProvider: watchProviderReducer,
    theme: themeReducer,
  },
});

export { store };