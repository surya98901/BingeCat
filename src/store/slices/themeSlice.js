import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: localStorage.getItem("theme") || "dark",
  },
  reducers: {
    ToggleTheme: (state) => {
        state.theme = state.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", state.theme);
    },
    },
});

export const { ToggleTheme } = themeSlice.actions;
export default themeSlice.reducer;