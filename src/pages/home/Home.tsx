import Carousel from "react-multi-carousel";
import Layout from "../../components/layout/Layout";
import SearchBox from "../../components/searchBox/SearchBox";
import { carouselResponsive } from "../../_lib/constants";

import "react-multi-carousel/lib/styles.css";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <HeroSection />
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
