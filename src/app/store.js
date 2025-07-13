import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice'; // ✅
import authReducer from '../features/auth/authSlice';


import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
  loadWishlistFromLocalStorage,
  saveWishlistToLocalStorage,
} from '../utils/localStorage';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer, // ✅ ensure this line is present
    auth: authReducer,
  },
   preloadedState: {
       cart: loadCartFromLocalStorage(),
    wishlist: loadWishlistFromLocalStorage(), // ✅ Load wishlist from localStorage
  },
});

// ✅ Subscribe to changes and save cart + wishlist
store.subscribe(() => {
  const state = store.getState();
  saveCartToLocalStorage(state.cart);
  saveWishlistToLocalStorage(state.wishlist); // ✅ Save wishlist
});

export default store;