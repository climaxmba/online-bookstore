import type React from "react";
import { type SetStateAction, useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";
import BookItem from "../bookItem/BookItem.tsx";
import Loading, { LoadingError } from "../loading/loading.tsx";

import styles from "./cateoryBookList.module.scss";

export default function CategoryBookList({
  getBooks,
}: {
  getBooks: () => Promise<Book[] | []>;
}) {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[] | []>([]);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setBooks((await getBooks()) as SetStateAction<Book[] | []>);
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
        <div className={styles.books}>
          <SearchAndFilter query={searchQuery} setQuery={setSearchQuery} />
          {filteredBooks.length ? (
            <div className={styles.list}>
              {filteredBooks.map((book) => (
                <BookItem
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  description={book.description}
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
      <Button>Filters</Button>
    </div>
  );
}
