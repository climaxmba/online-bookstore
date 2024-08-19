import { useEffect, useState } from "react";

import useDebounce from "../../_lib/customHooks/useDebounce.ts";
import BookItem from "../bookItem/BookItem.tsx";
import Loading, { LoadingError } from "../loading/loading.tsx";
import SearchAndFilter from "../searchAndFilter/SearchAndFilter";

import styles from "./cateoryBookList.module.scss";

export default function CategoryBookList({
  getBooks,
}: {
  getBooks: () => Promise<Book[] | []>;
}) {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[] | []>([]);
  const [error, setError] = useState(false);

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [filters, setFilters] = useState<{
    minPrice: number;
    maxPrice: number | null;
  }>({ minPrice: 0, maxPrice: null });

  // Load books
  useEffect(() => {
    (async () => {
      try {
        const bookArray = await getBooks();
        if (!bookArray.length) throw new Error()
        setBooks(bookArray);
      } catch {
        setError(true);
      }
    })();
  }, [getBooks]);

  // Set loading to true on `searchQuery` and `books` change
  useEffect(() => {
    if (!error) setLoading(true);
  }, [searchQuery, books, error]);

  // Filter books
  useEffect(() => {
    const filteredArray = books.filter((book) => {
      if (
        (book.price >= filters.minPrice &&
          filters.maxPrice !== null &&
          book.price <= filters.maxPrice) ||
        (book.price >= filters.minPrice && filters.maxPrice === null)
      ) {
        if (
          book.title
            .toLocaleLowerCase()
            .includes(debouncedSearchQuery.toLowerCase())
        )
          return true;
      }
      return false;
    });
    setFilteredBooks(filteredArray);
    if (books.length) setLoading(false);
  }, [books, filters, debouncedSearchQuery]);

  return (
    <div className={styles.books}>
      <SearchAndFilter
        query={searchQuery}
        setQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />
      {error ? (
        <LoadingError />
      ) : loading ? (
        <Loading />
      ) : filteredBooks.length ? (
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
  );
}
