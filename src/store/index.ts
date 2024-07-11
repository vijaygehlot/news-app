import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './feedSlice';

const store = configureStore({
  reducer: {
    feed: feedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
