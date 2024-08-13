export const paths = {
  root: "/",
  deals: "/deals",
  books: "/books",
  categories: "/categories",
  category: "/categories/:category",
  details: "/books/:packageId",
  wishlist: "/wishlist",
  search: "/search",
  cart: "/cart",
  checkout: "/checkout",
};

export const currency = "$";

export const carouselResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
