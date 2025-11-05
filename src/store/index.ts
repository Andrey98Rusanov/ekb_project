import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import dashboardDataReducer from './slices/dashboardDataSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    dashboardData: dashboardDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
