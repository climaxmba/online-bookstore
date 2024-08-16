import type React from "react";

import Navbar from "../navbar/Navbar";

import styles from "./layout.module.scss";
import Footer from "../footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
