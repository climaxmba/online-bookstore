import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  billing: {
    options: [
      {
        method: "e-Wallet",
        title: "Use e-Wallet",
        info: "The amount would be deducted from your wallet right away.",
        selected: true,
      },
      {
        method: "Cash",
        title: "Pay with Cash",
        info: "You pay with cash, after delivery.",
        selected: false,
      },
    ],
  },
  shipping: {
    address: "321 York Street, NY",
    options: [
      {
        title: "Express Delivery",
        info: "Your order would be delivered to your house, this attracts a delivery fee of $15.",
        selected: true,
      },
      {
        title: "Regular Shipping",
        info: "Not as fast as Express Delivery",
        selected: false,
      },
    ],
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setBillingOptions: (state, action: PayloadAction<typeof initialState.billing.options>) => {
      state.billing.options = action.payload;
    },
    setShippingOptions: (state, action: PayloadAction<typeof initialState.shipping.options>) => {
      state.shipping.options = action.payload;
    },
    setShippingAddress: (state, action: PayloadAction<string>) => {
      state.shipping.address = action.payload;
    },
    resetCheckout: (_state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _state = initialState;
    },
  },
});

export default checkoutSlice;
