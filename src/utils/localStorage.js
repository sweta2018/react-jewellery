// Load cart from localStorage
export const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.error("Could not load cart from localStorage", e);
    return [];
  }
};

// Save cart to localStorage
export const saveCartToLocalStorage = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem('cart', serializedCart);
  } catch (e) {
    console.error("Could not save cart to localStorage", e);
  }
};
// Load wishlist from localStorage
export const loadWishlistFromLocalStorage = () => {
  try {
    const serializedWishlist = localStorage.getItem('wishlist');
    return serializedWishlist ? JSON.parse(serializedWishlist) : [];
  } catch (e) {
    console.error("Could not load wishlist from localStorage", e);
    return [];
  }
};

// Save wishlist to localStorage
export const saveWishlistToLocalStorage = (state) => {
  try {
    const serializedWishlist = JSON.stringify(state);
    localStorage.setItem('wishlist', serializedWishlist);
  } catch (e) {
    console.error("Could not save wishlist to localStorage", e);
  }
};
