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
            <Link className={styles.link} to={"#categories"}>
              Categories
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={"#trending"}>
              Trending
            </Link>
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
