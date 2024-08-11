import { Search } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";

import styles from "./searchBox.module.scss";

export default function SearchBox() {
  return (
    <form className={styles.container}>
      <TextField variant="standard" label="Search Books" />
      <Button type="submit" variant="contained" startIcon={<Search />}>Search</Button>
    </form>
  );
}
