import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export function CustomerInfo({ name, adresse, contact, email }) {
  return (
    <Box sx={{ spaceY: 4 }}>
      <Typography sx={{ margin: '20px 5px' }} variant="h6" fontWeight="bold" gutterBottom>
        Customer Information
      </Typography>
      <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1">
            <strong>Name:</strong> {name}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {contact}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {email}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {adresse}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
