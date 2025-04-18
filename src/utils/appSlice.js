import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    toogleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = null;
    },
  }
});

export const { toogleMenu ,closeMenu } = appSlice.actions;
export default appSlice.reducer;
