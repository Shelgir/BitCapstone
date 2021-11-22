import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.value.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    removeFromCart: (state, action) => {
      state.value.forEach((product, index) => {
        if (product._id === action.payload) {
          state.value.splice(index, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
  },
});

export const { addToCart, removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;
