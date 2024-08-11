import Carousel from "react-multi-carousel";
import Layout from "../../components/layout/Layout";
import SearchBox from "../../components/searchBox/SearchBox";
import {
  CasesTwoTone,
  HistoryEduTwoTone,
  LandscapeTwoTone,
  MenuBookTwoTone,
} from "@mui/icons-material";
import { carouselResponsive } from "../../_lib/constants";

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
        infinite
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
    <div className={styles.categorySection}>
      <h1>Browse by Category</h1>
      <div className={styles.categories}>
        <div>
          <MenuBookTwoTone sx={{ fontSize: 120 }} />
          Fiction
        </div>
        <div>
          <LandscapeTwoTone sx={{ fontSize: 120 }} />
          Adventure
        </div>
        <div>
          <CasesTwoTone sx={{ fontSize: 120 }} />
          Mystery
        </div>
        <div>
          <HistoryEduTwoTone sx={{ fontSize: 120 }} />
          History
        </div>
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
        infinite
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
