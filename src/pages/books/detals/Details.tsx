import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Star, StarOutline } from "@mui/icons-material";
import { IconButton, Rating } from "@mui/material";
import Loading, { LoadingError } from "../../../components/loading/loading";
import { AddToCart } from "../../../components/addToCart/AddToCart";
import booksAPI from "../../../_lib/modules/booksAPI";
import { currency } from "../../../_lib/constants";
import {
  addToWishlist,
  removeFromWishlist,
  RootState,
} from "../../../_lib/redux/store";

import styles from "./details.module.scss";

export default function Details() {
  const { bookId } = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<Book>();
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setBook(
          (await booksAPI.getBookById(bookId as string)) as SetStateAction<
            Book | undefined
          >
        );
      } catch {
        setError(true);
      }
      setLoading(false);
    })();
  }, [bookId]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <LoadingError />
      ) : (
        <div className={styles.container}>
          <div className={styles.main}>
            <div className={styles.imgContainer}>
              <img src={book?.image} alt="" />
            </div>
            <div>
              <div className={styles.bookName}>
                {book?.title} <i>by {book?.author}</i>
              </div>
              <div
                className={styles.price}
              >{`${currency}${book?.price.toLocaleString()}`}</div>
              <div className={styles.ctaContainer}>
                <AddToCart {...(book as Book)} />
                <AddToWishList {...(book as Book)} />
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <h2>Description</h2>
            <div>{book?.description}</div>
          </div>

          <div className={styles.ratingContainer}>
            <h2>Rating</h2>
            <Rating max={5} value={book?.rating} precision={0.1} readOnly />
          </div>

          <div className={styles.reviewsContainer}>
            <h2>Reviews</h2>
            <div className={styles.reviews}>
              {book?.reviews.map((review) => (
                <div key={review.author} className={styles.review}>
                  <h3>{review.author}</h3>
                  <p>{review.message}</p>
                  <Rating
                    max={5}
                    value={review.rating}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddToWishList(book: Book) {
  const dispatch = useDispatch();
  const wishlisted = useSelector(
    (state: RootState) => state.wishlist.value
  ).find((item) => item.id === book.id);

  const handleWishlist: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(wishlisted ? removeFromWishlist(book.id) : addToWishlist(book));
    e.stopPropagation();
  };

  return (
    <IconButton
      title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      onClick={handleWishlist}
    >
      {wishlisted ? (
        <Star sx={{ fontSize: 32 }} htmlColor="gold" />
      ) : (
        <StarOutline sx={{ fontSize: 32 }} htmlColor="gold" />
      )}
    </IconButton>
  );
}
