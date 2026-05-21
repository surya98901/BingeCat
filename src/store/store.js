import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import moviesReducer from "./slices/moviesSlice";
import tvSeriesReducer from "./slices/tvSeriesSlice";
import themeReducer from "./slices/themeSlice";
import watchProviderReducer from "./slices/watchProviderslice";
import typeReducer from "./slices/typeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    tvSeries: tvSeriesReducer,
    watchProvider: watchProviderReducer,
    theme: themeReducer,
    type: typeReducer,
  },
});

export { store };
