import { Outlet, useParams } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import BookList from "../../components/bookList/bookList";
import booksAPI from "../../_lib/modules/booksAPI";

import styles from "./books.module.scss";

export default function Books() {
  const { bookId } = useParams();
  
  return (
    <Layout>
      <section className={styles.container}>
        <BookList
          getBooks={booksAPI.getBooks}
          hasBookId={bookId ? true : false}
        />
        {bookId && (
          <div className={styles.bookDetails}>
            <Outlet />
          </div>
        )}
      </section>
    </Layout>
  );
}
