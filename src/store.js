import { configureStore } from "@reduxjs/toolkit";
import { productsApiSlice } from "./services/service-api";
import CartSlice from "./features/CartSlice";
import UserAuthSlice from "./features/UserAuthSlice";

export default configureStore({
  reducer: {
    api: productsApiSlice.reducer,
    cart: CartSlice,
    auth: UserAuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApiSlice.middleware),
});

// optional, but required for re
