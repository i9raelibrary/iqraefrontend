import React from 'react';
import { Heart } from 'lucide-react';
import { Box, Card, CardMedia, CardContent, Typography, Button, IconButton, Chip } from '@mui/material';
import { styled } from '@mui/system';

const StyledCardMedia = styled(CardMedia)({
  height: 256, // equivalent to "h-64"
  width: 500,
  objectFit: 'cover',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StyledCard = styled(Card)({
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
  width: '320px',
  margin: '0 10px',
  '&:hover': {
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
});


const ProductCard = (props) => {
  const { name, price, image, category, onAddToCart } = props;

  return (
    <StyledCard>
      {/* Image Section */}
      <Box sx={{ position: 'relative' }}>
        <StyledCardMedia component="img" image={image} alt={name} />
        <Button
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(0, 148, 44, 0.8)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'white',
              color: 'black',
            },
          }}
        >
          NEW
        </Button>
      </Box>

      {/* Content Section */}
      <CardContent sx={{ padding: 2 }}>
        <Chip
          label={category}
          color="primary"
          sx={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: 1 }}
        />
        <Typography variant="h6" component="h3" noWrap sx={{ fontWeight: 600, color: 'text.primary' }}>
          {name}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 1, fontWeight: 700, color: 'text.primary' }}>
          {price} MAD
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: 2,
            paddingY: 1,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
          onClick={() => onAddToCart(props)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
