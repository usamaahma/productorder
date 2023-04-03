import { createSlice } from "@reduxjs/toolkit";
const data = JSON.parse(localStorage.getItem("data"));

const initialState = {
  totalitems: data ? data.totalitems : 0,
  totalprice: data ? data.totalprice : 0,
  cart: data ? data.cart : [],
};
const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        // item already exists in the cart, increase quantity
        const updatedCart = [...state.cart];
        updatedCart[itemIndex].quantity += 1;
        state.cart = updatedCart;
        state.totalitems += 1;
        state.totalprice += action.payload.price;
      } else {
        // item does not exist in the cart, add it
        state.cart = state.cart.concat({ ...action.payload, quantity: 1 });
        state.totalitems += 1;
        state.totalprice += action.payload.price;
      }
      localStorage.setItem("data", JSON.stringify(state));
    },
    deleteItem: (state, action) => {
      state.totalitems -= 1;
      state.totalprice -= action.payload.price;
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        const updatedCart = [...state.cart];
        if (updatedCart[index].quantity > 1) {
          updatedCart[index].quantity -= 1;
        } else {
          updatedCart.splice(index, 1);
        }
        state.cart = updatedCart;
      }
      localStorage.setItem("data", JSON.stringify(state));
    },
    removecart: (state) => {
      localStorage.removeItem("data");
      state.cart = [];
      state.totalitems = 0;
      state.totalprice = 0;
    },
  },
});
export const { addItem, deleteItem, removecart } = cartSlice.actions;
export default cartSlice.reducer;
