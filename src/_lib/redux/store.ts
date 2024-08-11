import { configureStore } from "@reduxjs/toolkit";

import wishlistSlice from "./slices/wishlist";
import cartSlice from "./slices/cart";

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const {
  addItem,
  incrementItemQuantity,
  decrementItemQuantity,
  resetCart,
} = cartSlice.actions;

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
