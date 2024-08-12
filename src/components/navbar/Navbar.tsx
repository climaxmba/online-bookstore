import { Link, NavLink } from "react-router-dom";

import { paths } from "../../_lib/constants";

import styles from "./navbar.module.scss";

export default function Navbar() {
  return (
    <>
      <nav className={styles.container}>
        <Logo />
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              to={paths.root}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              to={paths.books}
            >
              Books
            </NavLink>
          </li>
          <li>
            <a className={styles.link} href="#categories">
              Categories
            </a>
          </li>
          <li>
            <a className={styles.link} href="#trending">
              Trending
            </a>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              to={paths.deals}
            >
              Deals
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              to={paths.wishlist}
            >
              Wishlist
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

function Logo() {
  return <Link to={paths.root}>Online Bookstore</Link>;
}
