import { configureStore } from "@reduxjs/toolkit";
import { startCounterSlice } from "./slices/startCounterSlice";
import { isDataLoadedSlice } from "./slices/isLoadedSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    startCounter: startCounterSlice.reducer,
    isDataLoaded: isDataLoadedSlice.reducer,
    user: userSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
