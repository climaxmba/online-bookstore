import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { paths } from "../../_lib/constants";

import logoSrc from "../../assets/logo.svg";
import styles from "./navbar.module.scss";
import {
  CardGiftcardOutlined,
  LineAxisOutlined,
  ShoppingBagOutlined,
  StarOutline,
} from "@mui/icons-material";

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
        </ul>

        <IconLinks />
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

function IconLinks() {
  return (
    <div className={styles.iconLinks}>
      <a className={styles.link} href="/#trending">
        <LineAxisOutlined />
        Trending
      </a>

      <a href={"/#deals"}>
        <CardGiftcardOutlined className={styles.dealsIcon} /> Deals
      </a>

      <NavLink
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
        to={paths.wishlist}
      >
        <StarOutline />
        Wishlist
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
        to={paths.cart}
      >
        <ShoppingBagOutlined />
        Cart
      </NavLink>
    </div>
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
          <IconLinks />
        </li>
      </ul>
    </nav>
  );
}
