import { useSelector } from "react-redux";

import Layout from "../../components/layout/Layout";
import BookItem from "../../components/bookItem/BookItem";
import { RootState } from "../../_lib/redux/store";

import styles from "./wishlist.module.scss";

export default function Category() {
  const wishlist = useSelector((state: RootState) => state.wishlist.value);

  return (
    <Layout>
      <h1
        style={{
          marginTop: "5rem",
          marginLeft: "1rem"
        }}
      >
        Wishlist
      </h1>
      {wishlist.length ? (
        <section className={styles.container}>
          {wishlist.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: "large",
            fontStyle: "italic",
          }}
        >
          Oops! Noting's here yet.
        </p>
      )}
    </Layout>
  );
}
