import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import styles from "./productTable.module.scss";

interface ProductsTableProps {
  products: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}[],
  totalAmount: string,
  includeShipping?: boolean,
}

export default function ProductsTable({
  products,
  totalAmount,
  includeShipping = false,
}: ProductsTableProps) {
  const currency = "$";

  return (
    <TableContainer
      sx={{ ".MuiTableCell-root": { padding: "12px" } }}
      component={Paper}
      className={styles.container}
    >
      <Table>
        <TableHead>
          <TableRow className={styles.headerRow}>
            <TableCell className={styles.header}>Product</TableCell>
            <TableCell className={styles.header}>Price</TableCell>
            <TableCell className={styles.header}>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, i) => {
            return (
              <TableRow
                key={product.id}
                sx={{ backgroundColor: i % 2 === 0 ? "#fafafa" : "unset" }}
              >
                <TableCell title={product.title} className={styles.title}>
                  {product.title}
                </TableCell>
                <TableCell>
                  {currency}
                  {product.price}
                </TableCell>
                <TableCell>× {product.quantity}</TableCell>
              </TableRow>
            );
          })}
          {includeShipping ? (
            <TableRow sx={{ backgroundColor: "#e6f5f1" }}>
              <TableCell className={styles.title}>Shipping:</TableCell>
              <TableCell colSpan={2}>
                {currency}
                15.00
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          <TableRow>
            <TableCell className={styles.totalCell}>Total:</TableCell>
            <TableCell colSpan={2} className={styles.totalCell}>
              {currency}
              {includeShipping
                ? (parseFloat(totalAmount) + 15).toFixed(2)
                : totalAmount}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
