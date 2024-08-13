import type React from "react";
import { type SetStateAction, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import BookItem from "../bookItem/BookItem.tsx";
import Loading, { LoadingError } from "../loading/loading";

import styles from "./bookList.module.scss";

/** Requires container style: `{container: book-sectn / inline-size;}` */
export default function BookList({
  getBooks,
  hasBookId = false,
}: {
  getBooks: () => Promise<Book[] | []>;
  hasBookId: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [books, setPackages] = useState<Book[] | []>([]);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setPackages((await getBooks()) as SetStateAction<Book[] | []>);
      } catch {
        setError(true);
      }
      setLoading(false);
    })();
  }, [getBooks]);

  const filteredBooks = searchQuery
    ? books.filter((book) =>
        book.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <LoadingError />
      ) : (
        <div className={hasBookId ? styles.collapsableBooks : styles.books}>
          <h1>Books</h1>
          <SearchAndFilter query={searchQuery} setQuery={setSearchQuery} />
          {filteredBooks.length ? (
            <div className={styles.list}>
              {filteredBooks.map((book) => (
                <BookItem
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  price={book.price}
                  image={book.image}
                  rating={book.rating}
                  reviews={book.reviews}
                  author={book.author}
                  category={book.category}
                  isTrending={book.isTrending}
                  discount={book.discount}
                />
              ))}
            </div>
          ) : (
            <p>No results!</p>
          )}
        </div>
      )}
    </>
  );
}

function SearchAndFilter({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<SetStateAction<typeof query>>;
}) {
  return (
    <div className={styles.searchAndFilter}>
      <TextField
        variant="standard"
        label="Search Books"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      {/* <Button
        sx={{
          textTransform: "uppercase",
          color: "darkorange",
          ":hover": { bgcolor: "#ffeee8" },
        }}
      >
        Filters
      </Button> */}
    </div>
  );
}
