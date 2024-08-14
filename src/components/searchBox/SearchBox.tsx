import { Search } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { paths } from "../../_lib/constants";

import styles from "./searchBox.module.scss";

export default function SearchBox() {
  return (
    <form action={paths.books} className={styles.container}>
      <TextField variant="standard" label="Search Books" name="q" required />
      <Button type="submit" variant="contained" startIcon={<Search />}>Search</Button>
    </form>
  );
}
