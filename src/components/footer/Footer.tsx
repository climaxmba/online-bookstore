import styles from "./footer.module.scss";

import logoSrc from "../../assets/logo.svg";
import logoColoredSrc from "../../assets/logoColored.svg";
import { Facebook, Instagram, LinkedIn, X } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <img src={logoSrc} height={500} alt="" />

      <div className={styles.socialIcons}>
        <IconButton href="https://www.linkedin.com/in/climaxmba/">
          <LinkedIn />
        </IconButton>
        <IconButton href="https://www.x.com/">
          <X />
        </IconButton>
        <IconButton href="https://www.instagram.com/">
          <Instagram />
        </IconButton>
        <IconButton href="https://www.facebook.com/">
          <Facebook />
        </IconButton>
      </div>

      <h1>
        <img src={logoColoredSrc} height={40} alt="" />
        Online Bookstore
      </h1>

      <p className={styles.author}>
        Copywrite &copy; {new Date().getFullYear()}; Made by{" "}
        <a href="https://www.linkedin.com/in/climaxmba/">Climax Mba</a>
      </p>
    </footer>
  );
}
