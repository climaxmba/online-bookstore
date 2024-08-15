import { configureStore } from "@reduxjs/toolkit";

import wishlistSlice from "./slices/wishlist";
import cartSlice from "./slices/cart";
import checkoutSlice from "./slices/checkout";

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const {
  addItem,
  incrementItemQuantity,
  decrementItemQuantity,
  resetCart,
} = cartSlice.actions;
export const {
  setBillingOptions,
  setShippingAddress,
  setShippingOptions,
  resetCheckout,
} = checkoutSlice.actions;

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice.reducer,
    cart: cartSlice.reducer,
    checkout: checkoutSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
