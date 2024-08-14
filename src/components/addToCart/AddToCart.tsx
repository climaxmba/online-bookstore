import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton } from "@mui/material";
import {
  addItem,
  decrementItemQuantity,
  incrementItemQuantity,
  RootState,
} from "../../_lib/redux/store";

import styles from "./addToCart.module.scss";
import { Add, Remove } from "@mui/icons-material";

export function AddToCart({
  id,
  title,
  description,
  rating,
  reviews,
  author,
  price,
  category,
  isTrending = false,
  image,
  discount,
}: Book) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.value);
  const [item] = cart.filter((cartItem) => cartItem.item.id === id);

  const handleAddToCart: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(
      addItem({
        item: {
          id,
          title,
          description,
          rating,
          reviews,
          author,
          price,
          category,
          isTrending,
          image,
          discount,
        },
        quantity: 1,
      })
    );
    e.stopPropagation();
  };

  const handleIncrement: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(incrementItemQuantity(id));
    e.stopPropagation();
  };

  const handleDecrement: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(decrementItemQuantity(id));
    e.stopPropagation();
  };

  return (
    <>
      {item ? (
        <div className={styles.cartQuantityContainer}>
          <IconButton color="primary" title="Decrease Quantity" onClick={handleDecrement}>
            <Remove />
          </IconButton>
          <span title="Item Quantity" className={styles.quantityText}>
            {item.quantity}
          </span>
          <IconButton color="primary" title="Increase Quantity" onClick={handleIncrement}>
            <Add />
          </IconButton>
        </div>
      ) : (
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          title="Add to Cart"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      )}
    </>
  );
}
