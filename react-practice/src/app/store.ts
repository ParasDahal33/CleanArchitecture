import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../pages/login/feature/tokenSlice";
import usersReducer from "../pages/users/feature/userSlice";
import navReducer from "../components/sidebar/navSlice";
import currentUserReducer from "../pages/login/feature/loginSlice";
import profileReducer from "../pages/profile/feature/ProfileSlice";
import forgetPasswordReducer from "../pages/forgetPassword/feature/forgetPasswordSlice";
import brandSlice from "../pages/brand/feature/brandSlice";
export const store = configureStore({
      reducer: {
            token: tokenReducer,
            forgetPassword: forgetPasswordReducer,
            currentUser: currentUserReducer,
            nav: navReducer,
            users: usersReducer,
            brands: brandSlice,
            profile: profileReducer,
      },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
