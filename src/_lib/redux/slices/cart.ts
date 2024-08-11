import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "../../modules/storage";

const initialState = {
  value: storage.getCart(),
  totalAmount: storage.getCartTotal(),
};

const getTotal = (cart: CartItem[]) => {
  return cart
    .reduce((total, book) => total + book.item.price * book.quantity, 0)
    .toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newCart = [...state.value, action.payload];

      state.value = newCart;
      state.totalAmount = getTotal(newCart);
      storage.setCart(newCart);
    },
    incrementItemQuantity: (state, action: PayloadAction<string>) => {
      const newCart = state.value.map((cartItem) =>
        cartItem.item.id === action.payload
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );

      state.value = newCart;
      state.totalAmount = getTotal(newCart);
      storage.setCart(newCart);
    },
    decrementItemQuantity: (state, action: PayloadAction<string>) => {
      const oldCart = state.value;
      const [cartElem] = oldCart.filter(
        (cartItem) => cartItem.item.id === action.payload
      );

      const newCart =
        cartElem && cartElem.quantity === 1
          ? oldCart.filter((cartItem) => cartItem.item.id != cartElem.item.id)
          : oldCart.map((cartItem) =>
              cartItem.item.id === action.payload
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            );

      state.value = newCart;
      state.totalAmount = getTotal(newCart);
      storage.setCart(newCart);
    },
    resetCart: (state) => {
      state.totalAmount = "0.00";
      state.value = [];
      storage.setCart([]);
    },
  },
});

export default cartSlice;
