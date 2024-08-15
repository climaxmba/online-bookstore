import type React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { currency, paths } from "../../_lib/constants";
import {
  addToWishlist,
  removeFromWishlist,
  RootState,
} from "../../_lib/redux/store";

import styles from "./bookItem.module.scss";
import { IconButton, Rating } from "@mui/material";
import { Star, StarOutline } from "@mui/icons-material";

export default function BookItem({
  id,
  title,
  description,
  price,
  image,
  rating,
  reviews,
  author,
  category,
  discount,
  isTrending = false,
}: Book) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.value);
  const isInWishlist = !wishlist.every((book) => book.id !== id);

  const handleWishlist = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      isInWishlist
        ? removeFromWishlist(id)
        : addToWishlist({
            id,
            title,
            description,
            price,
            image,
            rating,
            reviews,
            author,
            category,
            discount,
            isTrending,
          })
    );
  };

  return (
    <NavLink to={`${paths.books}/${id}`} className={styles.containerPortrait}>
      <IconButton
        sx={{ p: 0.5 }}
        onClick={handleWishlist}
        className={styles.wishlistContainer}
      >
        {isInWishlist ? (
          <Star htmlColor="gold" />
        ) : (
          <StarOutline htmlColor="gold" />
        )}
      </IconButton>

      {discount ? <span className={styles.discount}>-{discount}%</span> : <></>}

      <div className={styles.imgContainer}>
        <img src={image} alt="" />
      </div>

      <div>
        <div className={styles.bookTitle} title={title}>
          {title}
        </div>
        <div
          className={styles.price}
        >{`${currency}${price.toLocaleString()}`}</div>
        <Rating value={rating} precision={0.1} size="small" readOnly />
      </div>
    </NavLink>
  );
}
