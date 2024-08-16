import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";

import Home from "./pages/home/Home";
import Error from "./pages/404/Error";
import Books from "./pages/books/Books";
import Details from "./pages/books/detals/Details";
import Wishlist from "./pages/wishlist/Wishlist";
import Search from "./pages/search/Search";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";

import { paths } from "./_lib/constants";
import { store } from "./_lib/redux/store";
import Category from "./pages/category/Category";

const theme = createTheme({
  palette: {
    primary: {
      light: "#815e00",
      main: "#a17600",
      dark: "#cf9800",
    },
    secondary: {
      light: "#78ffde",
      main: "#00ffc1",
      dark: "#008d6b",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textWrap: "nowrap",
        },
      },
    },
  },
});

export default function App() {
  const router = createBrowserRouter([
    {
      path: paths.root,
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: paths.books,
      element: <Books />,
      children: [
        {
          path: paths.details,
          element: <Details />,
        },
      ],
    },
    {
      path: paths.categories,
      element: <Category />,
    },
    {
      path: paths.category,
      element: <Category />,
    },
    {
      path: paths.wishlist,
      element: <Wishlist />,
    },
    {
      path: paths.search,
      element: <Search />,
    },
    {
      path: paths.cart,
      element: <Cart />,
    },
    {
      path: paths.checkout,
      element: <Checkout />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}
