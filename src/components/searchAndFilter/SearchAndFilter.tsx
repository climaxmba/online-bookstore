import { Badge, Button, TextField } from "@mui/material";
import { SetStateAction, useState } from "react";

import styles from "./searchAndFilter.module.scss";

type Filters = {
  minPrice: number;
  maxPrice: number | null;
};

interface SearchAndFilterProps {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  filters: Filters;
  setFilters: React.Dispatch<SetStateAction<Filters>>;
}

export default function SearchAndFilter({
  query,
  setQuery,
  filters,
  setFilters,
}: SearchAndFilterProps) {
  const [filtersShown, setFiltersShown] = useState(false);
  const [max, setMax] = useState<number | null>(filters.maxPrice);
  const [min, setMin] = useState(filters.minPrice);

  const handleSetFilter = () => {
    setFiltersShown(false);
    setFilters({ maxPrice: max, minPrice: min });
  };

  return (
    <div className={styles.container}>
      <TextField
        variant="standard"
        label="Search Books"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        sx={{ maxWidth: 500 }}
      />
      {filtersShown ? (
        <div className={styles.filters}>
          <TextField
            variant="standard"
            type="number"
            label="Min price"
            onChange={(e) => setMin(parseFloat(e.target.value || "0"))}
            value={min}
            sx={{ maxWidth: 100 }}
          />
          <TextField
            variant="standard"
            type="number"
            label="Max price"
            onChange={(e) => setMax(parseFloat(e.target.value) || null)}
            value={max || ""}
            sx={{ maxWidth: 100 }}
          />
          <Button variant="contained" onClick={handleSetFilter}>
            Set Filter
          </Button>
        </div>
      ) : (
        <Badge
          color="primary"
          badgeContent={filters.maxPrice || filters.minPrice}
          variant="dot"
        >
          <Button onClick={() => setFiltersShown(true)}>Filters</Button>
        </Badge>
      )}
    </div>
  );
}
