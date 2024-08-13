import type React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { currency, paths } from "../../_lib/constants";
import { addToWishlist, removeFromWishlist } from "../../_lib/redux/store";

import styles from "./bookItem.module.scss";
import { IconButton, Rating } from "@mui/material";
import { Star, StarOutline } from "@mui/icons-material";

interface BookProps extends Book {
  isInWishlist?: boolean;
}

export default function BookItem({
  id,
  title,
  price,
  image,
  rating,
  reviews,
  author,
  category,
  discount,
  isTrending = false,
  isInWishlist = false,
}: BookProps) {
  const dispatch = useDispatch();

  const handleWishlist = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      isInWishlist
        ? addToWishlist({
            id,
            title,
            price,
            image,
            rating,
            reviews,
            author,
            category,
            discount,
            isTrending,
          })
        : removeFromWishlist(id)
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

      <div className={styles.imgContainer}>
        <img src={image} alt="" />
      </div>

      <div>
        <div className={styles.bookTitle} title={title}>
          {title}
        </div>
        <div className={styles.price}>{`${currency}${price}`}</div>
        <Rating value={rating} precision={0.1} size="small" readOnly />
      </div>
    </NavLink>
  );
}
