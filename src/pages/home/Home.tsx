import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import Layout from "../../components/layout/Layout";
import SearchBox from "../../components/searchBox/SearchBox";
import {
  CasesOutlined,
  HistoryEduOutlined,
  LandscapeOutlined,
  MenuBookOutlined,
} from "@mui/icons-material";
import { carouselResponsive, paths } from "../../_lib/constants";

import "react-multi-carousel/lib/styles.css";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <HeroSection />
        <CategorySection />
        <TrendingBooks />
      </div>
    </Layout>
  );
}

function HeroSection() {
  return (
    <div className={styles.heroSection}>
      <h1>Featured Books</h1>

      <Carousel
        autoPlay
        rewind
        rewindWithAnimation
        autoPlaySpeed={6000}
        responsive={carouselResponsive}
      >
        <div className={styles.bookItem}></div>
        <div className={styles.bookItem}></div>
        <div className={styles.bookItem}></div>
        <div className={styles.bookItem}></div>
        <div className={styles.bookItem}></div>
      </Carousel>

      <SearchBox />
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

function TrendingBooks() {
  return (
    <div className={styles.trendingBooks}>
      <h1>Trending Books</h1>

      <Carousel
        autoPlay
        rewind
        rewindWithAnimation
        autoPlaySpeed={6000}
        responsive={carouselResponsive}
      >
        <div className={styles.bookItem}></div>
        <div className={styles.bookItem}></div>
        <div className={styles.bookItem}></div>
        <div className={styles.bookItem}></div>
        <div className={styles.bookItem}></div>
      </Carousel>
    </div>
  );
}
