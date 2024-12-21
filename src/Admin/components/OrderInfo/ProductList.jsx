import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

export function ProductList({ products }) {
  return (
    <div>
      <Typography sx={{ margin: '20px 5px' }} variant="h6" fontWeight="bold" gutterBottom>
        Products
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="product list">
          <TableHead>
            <TableRow>
              <TableCell align="left">Product</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="left">{product.article.nom}</TableCell>
                <TableCell align="left">{product.quantite}</TableCell>
                <TableCell align="left">{product.article.puv}</TableCell>
                <TableCell align="left">{(product.totalLigne).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
