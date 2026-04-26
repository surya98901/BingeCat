import {createSlice} from "@reduxjs/toolkit";

const watchProviderSlice = createSlice({
    name: "watchProvider",
    initialState: {
        providers: null
    },
    reducers: {
        setWatchProviders: (state, action) => {
            state.providers = action.payload;
        },
    },
});
 export const { setWatchProviders } = watchProviderSlice.actions;
export default watchProviderSlice.reducer;
