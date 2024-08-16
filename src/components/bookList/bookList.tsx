import { SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import BookItem from "../bookItem/BookItem.tsx";
import Loading, { LoadingError } from "../loading/loading";
import { paths } from "../../_lib/constants.ts";
import SearchAndFilter from "../searchAndFilter/SearchAndFilter";

import styles from "./bookList.module.scss";

/** Requires container style: `{container: book-sectn / inline-size;}` */
export default function BookList({
  getBooks,
  hasBookId = false,
}: {
  getBooks: () => Promise<Book[] | []>;
  hasBookId: boolean;
}) {
  const [filters, setFilters] = useState<{
    minPrice: number;
    maxPrice: number | null;
  }>({ minPrice: 0, maxPrice: null });
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[] | []>([]);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [params, setParams] = useSearchParams();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const { q } = Object.fromEntries(params);
  const isInBooksPage = location.pathname.includes(paths.books);

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

  useEffect(() => {
    if (isInBooksPage && q) setSearchQuery(q);
    setParams({});
  }, [isInBooksPage, q, setParams]);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) => {
        if (
          (book.price >= filters.minPrice &&
            filters.maxPrice !== null &&
            book.price <= filters.maxPrice) ||
          (book.price >= filters.minPrice && filters.maxPrice === null)
        ) {
          if (
            book.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
          )
            return true;
        }
        return false;
      })
    );
  }, [books, filters, searchQuery]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <LoadingError />
      ) : (
        <div className={hasBookId ? styles.collapsableBooks : styles.books}>
          <h1>Books</h1>
          <SearchAndFilter
            query={searchQuery}
            setQuery={setSearchQuery}
            filters={filters}
            setFilters={setFilters}
          />
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
