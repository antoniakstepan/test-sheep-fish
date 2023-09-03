import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from "../features/product/productSlice"
import categoryReducer from "../features/categories/categorySlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    category: categoryReducer
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
