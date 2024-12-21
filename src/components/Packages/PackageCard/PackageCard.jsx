import React from 'react';
import { ShoppingCart, Gift, ChevronRight } from 'lucide-react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
} from '@mui/material';

export default function PackageCard({ package: pkg }) {
  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 2,
        boxShadow: 3,
        transition: 'box-shadow 0.3s ease',
        '&:hover': { boxShadow: 6 },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', mb: 2 }}>
        <CardMedia
          component="img"
          // Fixe la hauteur de l'image
          image={pkg.image}
          alt={pkg.name}
          sx={{ borderRadius: 2, objectFit: 'cover' , height: "200px" }} // Ajoute un objectFit pour éviter la déformation
        />
      </Box>

      {/* Card Content */}
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="text.primary"
          mb={1}
          sx={{
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis', // Ajouter des points de suspension pour le titre si trop long
          }}
        >
          {pkg.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
          sx={{
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis', // Ajouter des points de suspension pour la description si trop longue
          }}
        >
          {pkg.description}
        </Typography>

        {/* Products Included */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Gift size={20} color="#1e88e5" />
          <Typography variant="body2" color="text.secondary">
            {pkg.products.length} products included
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Pricing Section */}
        <Box mb={0}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Total Value:
            </Typography>
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ textDecoration: 'line-through' }}
            >
              {pkg.totalPrice.toFixed(2)}MAD
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Package Price:
            </Typography>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              {pkg.discountedPrice.toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" color="success.main">
            <Typography variant="body2">Delivery:</Typography>
            <Typography variant="body2" fontWeight="bold">
              {pkg.savings.toFixed(2) > 0 ? (pkg.savings.toFixed(2) + 'MAD') : 'free' }
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Actions Section */}
      <CardActions sx={{ flexDirection: 'column', pb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<ShoppingCart size={20} />}
          sx={{
            fontWeight: 'bold',
            py: 1.5,
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          Add Package to Cart
        </Button>
        <Button
          variant="outlined"
          fullWidth
          endIcon={<ChevronRight size={20} />}
          sx={{
            py: 1.5,
            fontWeight: 'bold',
            color: 'text.primary',
            backgroundColor: 'grey.50',
            '&:hover': { backgroundColor: 'grey.100' },
          }}
          className='m-2 mb-1'
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
