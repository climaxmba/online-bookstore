import { Link } from "react-router-dom";
import logo from "../../assets/logoColored.svg"
import styles from "./noRoute.module.scss";

export default function NoRoute() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" height={40}/>
        <h1>Online Bookstore</h1>
      </div>
      <p className={styles.errorCode}>404</p>
      <h2>Oh no, this route doesn't exist!</h2>
      <Link to="/">
        Visit Home page
      </Link>
    </div>
  );
}
