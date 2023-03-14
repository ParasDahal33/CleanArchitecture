import { createSlice } from "@reduxjs/toolkit";

interface NavState {
      isSideClosed: boolean;
      navItem: { name: string; isClosed: boolean };
}

const MAX_MOBILE_WIDTH = 425;

const initialState: NavState = {
      /**
       * default close side nav on mobile device
       */
      isSideClosed: window.innerWidth <= MAX_MOBILE_WIDTH,
      navItem: { name: "", isClosed: true },
};

const navSlice = createSlice({
      name: "navigation",
      initialState,
      reducers: {
            alterSideBarState: (state) => {
                  state.isSideClosed = !state.isSideClosed;
            },
            alterNavMenuState: (state, action) => {
                  state.navItem = {
                        name: action.payload,
                        isClosed: state.navItem.name === action.payload ? !state.navItem.isClosed : false,
                  };
            },
            closeNavMenuItem: (state) => {
                  state.navItem = { name: "", isClosed: true };
            },
      },
});

export const { alterSideBarState, alterNavMenuState, closeNavMenuItem } = navSlice.actions;

export default navSlice.reducer;
