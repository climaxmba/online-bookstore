import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { HashLink } from 'react-router-hash-link';

import {
  CardGiftcardOutlined,
  LineAxisOutlined,
  ShoppingBagOutlined,
  StarOutline,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import { paths } from "../../_lib/constants";
import { RootState } from "../../_lib/redux/store";

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
            <HashLink to="/#categories" className={styles.link}>
              Categories
            </HashLink>
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
  const cartLength = useSelector((state: RootState) => state.cart.value).length;
  const wishlistLength = useSelector(
    (state: RootState) => state.wishlist.value
  ).length;

  return (
    <div className={styles.iconLinks}>
      <HashLink to="/#trending" className={styles.link}>
        <LineAxisOutlined />
        Trending
      </HashLink>

      <HashLink to={"/#deals"}>
        <CardGiftcardOutlined className={styles.dealsIcon} /> Deals
      </HashLink>

      <Badge
        badgeContent={wishlistLength}
        color="primary"
        sx={{
          ".MuiBadge-badge": { color: "white", top: "4px" },
        }}
        className={styles.badge}
      >
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          to={paths.wishlist}
        >
          <StarOutline />
          Wishlist
        </NavLink>
      </Badge>

      <Badge
        badgeContent={cartLength}
        color="primary"
        sx={{
          ".MuiBadge-badge": { color: "white", top: "4px" },
        }}
        className={styles.badge}
      >
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          to={paths.cart}
        >
          <ShoppingBagOutlined />
          Cart
        </NavLink>
      </Badge>
    </div>
  );
}

function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => setMenuOpen((val) => !val);
  const cartLength = useSelector((state: RootState) => state.cart.value).length;
  const wishlistLength = useSelector(
    (state: RootState) => state.wishlist.value
  ).length;

  return (
    <nav className={styles.mobileContainer}>
      <Logo />

      <Badge
        badgeContent={cartLength || wishlistLength}
        color="primary"
        variant="dot"
        sx={{ ".MuiBadge-dot": { top: "8px" } }}
      >
        <button
          title="Menu"
          className={`${styles.menu} ${menuOpen && styles.menuOpen}`}
          onClick={handleMenuClick}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </Badge>

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
          <HashLink to="/#categories" className={styles.link}>
            Categories
          </HashLink>
        </li>
        <li>
          <IconLinks />
        </li>
      </ul>
    </nav>
  );
}
