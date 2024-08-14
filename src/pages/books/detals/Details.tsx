import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import booksAPI from "../../../_lib/modules/booksAPI";
import Loading, { LoadingError } from "../../../components/loading/loading";

// import styles from "./details.module.scss";

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
      {loading ? <Loading /> : error ? <LoadingError /> : <p>{book?.author}</p>}
    </div>
  );
}
