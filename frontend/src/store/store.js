import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import postsReducer from "./features/posts/postsSlice";
import usersReducer from "./features/users/usersSlice";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
  },
//   devTools: process.env.NODE_ENV !== "production",
});

export default store;
