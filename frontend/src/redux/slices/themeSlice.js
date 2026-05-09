import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true' ? true : false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
