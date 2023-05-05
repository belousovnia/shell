import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import checkoutSlise from "../features/Checkout/store/checkoutSlise";

export const store = configureStore({
  reducer: {
    checkoutStore: checkoutSlise,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
