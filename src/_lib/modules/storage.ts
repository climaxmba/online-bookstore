const storage = (() => {
  function getWishlist(): Book[] | [] {
    try {
      return JSON.parse(localStorage.getItem("wishlist") || "[]") || [];
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  function setWishlist(books: Book[] | []) {
    localStorage.setItem("wishlist", JSON.stringify(books));
  }

  function getCart(): CartItem[] | [] {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]") || [];
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  function setCart(cartArr: CartItem[] | []) {
    localStorage.setItem("cart", JSON.stringify(cartArr));
  }

  function getCartTotal(): string | void {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    try {
      return cart
        .reduce(
          (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
          0
        )
        .toFixed(2);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getWishlist,
    setWishlist,
    getCart,
    setCart,
    getCartTotal,
  };
})();

export default storage;
