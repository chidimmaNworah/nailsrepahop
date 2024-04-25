import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    updateCart(state, action) {
      state.cartItems = action.payload;
    },
    removeFromCart(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
    },
    emptyCart(state, action) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateCart, removeFromCart, emptyCart } =
  cartSlice.actions;

export const removeProductFromCart = (productId) => async (dispatch) => {
  try {
    await axios.delete(`/api/cart/${productId}`);
    dispatch(removeFromCart(productId));
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};

export default cartSlice.reducer;
