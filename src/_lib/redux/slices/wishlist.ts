import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "../../modules/storage";

const initialState: { value: Book[] | [] } = {
  value: storage.getWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Book>) => {
      const tempList = [...state.value];
      const item = action.payload;

      if (tempList.every((elem) => elem.id !== item.id)) tempList.push(item);

      state.value = tempList;
      storage.setWishlist(tempList);
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      const newState = state.value.filter((elem) => elem.id !== action.payload);
      state.value = newState;
      storage.setWishlist(newState);
    },
  },
});

export default wishlistSlice;
