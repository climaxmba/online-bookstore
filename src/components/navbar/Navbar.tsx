import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { paths } from "../../_lib/constants";

import logoSrc from "../../assets/logo.svg";
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
            <a className={styles.link} href="/#categories">
              Categories
            </a>
          </li>
          <li>
            <a className={styles.link} href="/#trending">
              Trending
            </a>
          </li>
          <li>
            <a href={"/#deals"}>Deals</a>
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
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              to={paths.cart}
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>

      <MobileNav />
    </>
  );
}

function Logo() {
  return (
    <Link to={paths.root} className={styles.logo}>
      <img src={logoSrc} height={25} alt="Logo" /> Online Bookstore
    </Link>
  );
}

function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => setMenuOpen((val) => !val);

  return (
    <nav className={styles.mobileContainer}>
      <Logo />
      <button
        title="Menu"
        className={`${styles.menu} ${menuOpen && styles.menuOpen}`}
        onClick={handleMenuClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`${styles.links} ${menuOpen && styles.linksOpen}`}>
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
          <a className={styles.link} href="/#categories">
            Categories
          </a>
        </li>
        <li>
          <a className={styles.link} href="/#trending">
            Trending
          </a>
        </li>
        <li>
          <a href={"/#deals"}>Deals</a>
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
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
            to={paths.cart}
          >
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
