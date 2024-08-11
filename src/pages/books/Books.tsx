import { Outlet } from "react-router-dom";
import Layout from "../../components/layout/Layout";

// import styles from "./books.module.scss";

export default function Books() {
  return (
    <Layout>
      Books <Outlet />
    </Layout>
  );
}
