import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../pages/login/feature/tokenSlice";
import usersReducer from "../pages/users/feature/userSlice";
import navReducer from "../components/sidebar/navSlice";
import currentUserReducer from "../pages/login/feature/loginSlice";
import profileReducer from "../pages/profile/feature/ProfileSlice";
import forgetPasswordReducer from "../pages/forgetPassword/feature/forgetPasswordSlice";
import toDoItemReducer from "../pages/ToDoItems/feature/toDoItemsSlice";
export const store = configureStore({
      reducer: {
            token: tokenReducer,
            forgetPassword: forgetPasswordReducer,
            currentUser: currentUserReducer,
            nav: navReducer,
            users: usersReducer,
            profile: profileReducer,
            toDoItem: toDoItemReducer,
      },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
