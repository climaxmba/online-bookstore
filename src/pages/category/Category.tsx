import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import CategoryBookList from "../../components/categoryBookList/categoryBookList";
import { paths } from "../../_lib/constants";
import booksAPI from "../../_lib/modules/booksAPI";

import styles from "./category.module.scss";
import { useEffect } from "react";

export default function Category() {
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) navigate(paths.root);
  }, [category, navigate]);

  return (
    <Layout>
      <section className={styles.container}>
        <h1>Categories | {category}</h1>
        <CategoryBookList
          getBooks={() =>
            category
              ? booksAPI.getBooksByCategory(
                  `${category[0].toLocaleUpperCase()}${category.slice(1)}`
                )
              : Promise.resolve([])
          }
        />
      </section>
    </Layout>
  );
}
