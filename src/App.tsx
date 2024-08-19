import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";

const Home = React.lazy(() =>  import("./pages/home/Home"))
const NoRoute = React.lazy(() => import("./pages/404/NoRoute"));
const Books = React.lazy(() => import("./pages/books/Books"));
const Details = React.lazy(() => import("./pages/books/detals/Details"));
const Wishlist = React.lazy(() => import("./pages/wishlist/Wishlist"));
const Cart = React.lazy(() => import("./pages/cart/Cart"));
const Checkout = React.lazy(() => import("./pages/checkout/Checkout"));
const Category = React.lazy(() => import("./pages/category/Category"));
import Loading from "./components/loading/loading";

import { paths } from "./_lib/constants";
import { store } from "./_lib/redux/store";

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
      errorElement: <NoRoute />,
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
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </ThemeProvider>
  );
}
