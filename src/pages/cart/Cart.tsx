import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { AddToCart } from "../../components/addToCart/AddToCart";
import Layout from "../../components/layout/Layout";
import { currency, paths } from "../../_lib/constants";
import { RootState } from "../../_lib/redux/store";

import styles from "./cart.module.scss";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.value);
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Cart</h1>
        {cart.length ? (
          <>
            <CartList cart={cart} />
            <Button
              variant="contained"
              onClick={() => navigate(paths.checkout)}
            >
              Proceed to Checkout
            </Button>
          </>
        ) : (
          <>
            <p>Your Cart is empty! </p>
            <Button
              variant="contained"
              onClick={() => navigate(paths.books)}
            >
             Find Books
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
}

function CartList({ cart }: { cart: CartItem[] }) {
  return (
    <div className={styles.cartList}>
      {cart.map((cartElem) => (
        <BookItemDetailed key={cartElem.item.id} {...cartElem.item} />
      ))}
    </div>
  );
}

function BookItemDetailed(book: Book) {
  return (
    <div className={styles.containerDetailed}>
      <div className={styles.imgContainer}>
        <img src={book.image} alt="" />
      </div>
      <div>
        <div className={styles.title}>{book.title}</div>
        <div className={styles.price}>{`${currency}${book.price}`}</div>
        <AddToCart {...book} />
      </div>
    </div>
  );
}
