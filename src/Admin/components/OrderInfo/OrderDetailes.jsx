import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Divider, Grid } from '@mui/material';
import { ProductList } from './ProductList';
import { CustomerInfo } from './CustomerInfo';
import { OrderStatus } from './OrderStatus';
import { InvoiceActions } from './InvoicePDF';

const mockOrder = {
  id: 1,
  products: [
    { id: 1, name: 'Product 1', quantity: 2, price: 29.99 },
    { id: 2, name: 'Product 2', quantity: 1, price: 49.99 },
  ],
  customer: {
    id: 1,
    name: 'Mohammed Amine',
    phone: '0655271839',
    email: 'Mohammed@example.com',
    address: 'Bloc c zoigha',
  },
  totalPrice: 109.97,
  status: 'pending',
  date: '2024-03-15',
};
const xxx = {
  "NbPrd": 3,
  "totalPrd": 322,
  "clientName": "AZARHOUN EL HOUCINE",
  "clientNumber": "9876543210",
  "Status": "En attente",
  "date": "2024-12-04",
  "details": [
    {
      "id": 116,
      "commandeId": 117,
      "articleId": 5,
      "quantite": 2,
      "totalLigne": 188,
      "createdAt": "2024-12-04T13:59:06.000Z",
      "updatedAt": "2024-12-04T13:59:06.000Z",
      "article":
      {
        "id": 5,
        "nom": "bag pack",
        "puv": 94,
        "description": null
      }
    },
    {
      "id": 117,
      "commandeId": 117,
      "articleId": 4,
      "quantite": 4,
      "totalLigne": 92,
      "createdAt": "2024-12-04T13:59:06.000Z",
      "updatedAt": "2024-12-04T13:59:06.000Z",
      "article":
      {
        "id": 4,
        "nom": "pack des feuilles",
        "puv": 23, "description": null
      }
    },
    {
      "id": 118,
      "commandeId": 117,
      "articleId": 7,
      "quantite": 1,
      "totalLigne": 42,
      "createdAt": "2024-12-04T13:59:06.000Z",
      "updatedAt": "2024-12-04T13:59:06.000Z",
      "article":
      {
        "id": 7,
        "nom": "livres",
        "puv": 42,
        "description": null
      }
    }
  ]
}

export function OrderDetails({ setShowOrderDetails, details, refetch, mode }) {
  const [order, setOrder] = useState({});
  console.log("orders are :" + JSON.stringify(details.totalPrd));
  const handleStatusChange = (newStatus) => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
  };

  return (
    <Box sx={{
      width: '100vw',
      height: '95%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      minHeight: '100vh',
      py: 4,
      px: { xs: 0, sm: 4 }
    }}>
      <Box sx={{ width: { xs: '90%', sm: '98%' }, maxWidth: 1200, mx: 'auto' }}>
        <Card sx={{ padding: '0 10px', borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ mb: 4 }}>
              {/* Header Section */}
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" fontWeight="bold" color="text.primary">
                    <span style={{ fontSize: 17 }}>Commande de </span>{details.clientName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(details.date).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>

              {/* Status and Invoice Actions */}
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                {mode !== "client" &&
                  <Grid item xs={12} sm="auto">
                    <OrderStatus status={details.Status} onStatusChange={handleStatusChange} id={details.id} refetch={refetch} />
                  </Grid>}
                <Grid item xs={12} sm="auto">
                  <InvoiceActions order={details} />
                </Grid>
              </Grid>
            </Box>

            {/* Customer Info Section */}
            <CustomerInfo name={details.clientName} adresse={details.clientAdresse} contact={details.clientNumber} email={details.clientEmail} />

            {/* Product List */}
            <ProductList products={details.details} />

            {/* Divider */}
            <Divider sx={{ my: 2 }} />

            {/* Total Price Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Button
                  sx={{ margin: '0 5px 0 0' }}
                  variant='outlined'
                  onClick={() => setShowOrderDetails(false)}
                >
                  Close
                </Button>
                {mode !== "client" &&
                  <Button sx={{ margin: '0 0 0 5px' }} variant='contained' onClick={() => setShowOrderDetails(false)}>
                    Save
                  </Button>}
              </Box>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Total: {details.totalPrd.toFixed(2)} MAD
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
