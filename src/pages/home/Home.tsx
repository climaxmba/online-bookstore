import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";

import {
  CasesOutlined,
  HistoryEduOutlined,
  LandscapeOutlined,
  MenuBookOutlined,
} from "@mui/icons-material";
import Layout from "../../components/layout/Layout";
import SearchBox from "../../components/searchBox/SearchBox";
import { Spinner, SpinnerError } from "../../components/loading/loading";
import BookItem from "../../components/bookItem/BookItem";
import { carouselResponsive, paths } from "../../_lib/constants";
import booksAPI from "../../_lib/modules/booksAPI";

import "react-multi-carousel/lib/styles.css";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <HeroSection />
        <CategorySection />
        <DailyDeals />
        <TrendingBooks />
      </div>
    </Layout>
  );
}

function HeroSection() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[] | []>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setBooks(
          (await booksAPI.getFeaturedBooks()) as SetStateAction<Book[] | []>
        );
      } catch {
        setError(true);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className={styles.heroSection}>
      <img className={styles.bgImage} src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      <div className={styles.pannels}>
        <div>
          <h1>Escape into a World of Stories.</h1>
          <p>
            Find your next adventure with Online Bookstore, your one-stop
            shop for all things books. Browse thousands of titles, discover
            hidden gems, and let your imagination soar. Start exploring today!
          </p>
        </div>

        <SearchBox />
      </div>

      <h2>Featured Books</h2>

      {loading ? (
        <Spinner />
      ) : error ? (
        <SpinnerError />
      ) : books.length ? (
        <Carousel
          autoPlay
          rewind
          rewindWithAnimation
          autoPlaySpeed={6000}
          responsive={carouselResponsive}
          className={styles.carousel}
        >
          {books.map((book) => (
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
        </Carousel>
      ) : (
        <p>No results!</p>
      )}
    </div>
  );
}

function CategorySection() {
  return (
    <div id="categories" className={styles.categorySection}>
      <h1>Browse by Category</h1>

      <div className={styles.categories}>
        <Link to={`${paths.categories}/fiction`}>
          <MenuBookOutlined sx={{ fontSize: 80 }} />
          Fiction
        </Link>
        <Link to={`${paths.categories}/adventure`}>
          <LandscapeOutlined sx={{ fontSize: 80 }} />
          Adventure
        </Link>
        <Link to={`${paths.categories}/mystery`}>
          <CasesOutlined sx={{ fontSize: 80 }} />
          Mystery
        </Link>
        <Link to={`${paths.categories}/history`}>
          <HistoryEduOutlined sx={{ fontSize: 80 }} />
          History
        </Link>
      </div>
    </div>
  );
}

function DailyDeals() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[] | []>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setBooks(
          (await booksAPI.getDailyDeals()) as SetStateAction<Book[] | []>
        );
      } catch {
        setError(true);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div id="deals" className={styles.dailyDeals}>
      <h1>The Deals</h1>

      {loading ? (
        <Spinner />
      ) : error ? (
        <SpinnerError />
      ) : books.length ? (
        <Carousel
          autoPlay
          rewind
          rewindWithAnimation
          autoPlaySpeed={6000}
          responsive={carouselResponsive}
          className={styles.carousel}
        >
          {books.map((book) => (
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
        </Carousel>
      ) : (
        <p>No results!</p>
      )}
    </div>
  );
}

function TrendingBooks() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[] | []>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setBooks(
          (await booksAPI.getTrendingBooks()) as SetStateAction<Book[] | []>
        );
      } catch {
        setError(true);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div id="trending" className={styles.trendingBooks}>
      <h1>Trending Books</h1>

      {loading ? (
        <Spinner />
      ) : error ? (
        <SpinnerError />
      ) : books.length ? (
        <Carousel
          autoPlay
          rewind
          rewindWithAnimation
          autoPlaySpeed={6000}
          responsive={carouselResponsive}
          className={styles.carousel}
        >
          {books.map((book) => (
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
        </Carousel>
      ) : (
        <p>No results!</p>
      )}
    </div>
  );
}
