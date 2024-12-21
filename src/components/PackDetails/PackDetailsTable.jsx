import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const PackProductList = ({ products }) => {
    return (
        <div>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table sx={{ minWidth: 250, maxHeight: 80 }} aria-label="product list">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" >Product</TableCell>
                            <TableCell align="center">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.image}>
                                <TableCell align="justify" padding='none'><img src={product.image} width={50} height={50} /></TableCell>
                                <TableCell align="center">{product.nom}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default PackProductList;
