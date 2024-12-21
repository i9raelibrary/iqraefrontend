import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import PackageCard from './PackageCard/PackageCard';

// Exemple de tableau fictif pour featuredProducts
const featuredProducts = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
  { id: 4, name: "Product 4", price: 400 },
  { id: 5, name: "Product 5", price: 500 }
];

export const packages = [
  {
    id: 1,
    name: "Ultimate Tech Bundle",
    description: "Complete tech setup for professionals",
    products: featuredProducts.slice(0, 3),
    totalPrice: 799.97,
    discountedPrice: 599.99,
    savings: 199.98,
    image: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Home Bureau Essentials",
    description: "Everything you need for your workspace",
    products: featuredProducts.slice(1, 4),
    totalPrice: 589.97,
    discountedPrice: 479.99,
    savings: 0,
    image: "https://img.freepik.com/free-photo/children-desk-interior-design_23-2148569207.jpg?t=st=1734269855~exp=1734273455~hmac=fd4fa7d73a1681235315fa25043a0dc18327233a19b180cf134aebc2a57b2b7e&w=360"
  },
  {
    id: 3,
    name: "Student Starter Pack",
    description: "Perfect for college students",
    products: featuredProducts.slice(2, 5),
    totalPrice: 509.97,
    discountedPrice: 399.99,
    savings: 109.98,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Premium Pincels Collection",
    description: "Ultimate sound experience",
    products: [featuredProducts[0], featuredProducts[4]],
    totalPrice: 379.98,
    discountedPrice: 299.99,
    savings: 79.99,
    image: "https://img.freepik.com/free-photo/top-view-sad-face-with-pencils-blue-monday_23-2148756156.jpg?t=st=1734270058~exp=1734273658~hmac=a88de56a3188e9d431e38a2805bd6cba93815f619f8abc903904ab6bde0c927a&w=740"
  },
  {
    id: 4,
    name: "Chemise Collection",
    description: "Ultimate sound experience",
    products: [featuredProducts[0], featuredProducts[4]],
    totalPrice: 379.98,
    discountedPrice: 299.99,
    savings: 79.99,
    image: "https://img.freepik.com/free-photo/arrangement-father-son-clothing_23-2148868932.jpg?t=st=1734270157~exp=1734273757~hmac=2ca6d646cd4ee11f059fa0977d9ae1c733d18934af8f3b5e39c3c6cf9a946858&w=360"
  }
];

export default function PackageSlider() {
  const sliderRef = useRef(null);
  const theme = useTheme();

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 348; // card width (400px) + gap (48px)
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      component="section"
      py={8}
      sx={{
        background: `linear-gradient(to bottom, ${theme.palette.common.white}, ${theme.palette.grey[50]})`,
      }}
    >
      <Box sx={{ maxWidth: '1500px',width:'90%', mx: 'auto', px: 2 }}>
        {/* Header Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary" mb={1}>
              Product Packages
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Save more with our curated product packages
            </Typography>
          </Box>
          <Box display="flex" gap={1.5}>
            <Button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              sx={{
                minWidth: 'auto',
                p: 1.5,
                borderRadius: '50%',
                backgroundColor: theme.palette.common.white,
                boxShadow: theme.shadows[2],
                '&:hover': { backgroundColor: theme.palette.grey[100] },
              }}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              sx={{
                minWidth: 'auto',
                p: 1.5,
                borderRadius: '50%',
                backgroundColor: theme.palette.common.white,
                boxShadow: theme.shadows[2],
                '&:hover': { backgroundColor: theme.palette.grey[100] },
              }}
            >
              <ChevronRight size={24} />
            </Button>
          </Box>
        </Box>

        {/* Slider Section */}
        <Box
          ref={sliderRef}
          display="flex"
          gap={6}
          sx={{
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            pb: 2,
            '::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          {packages.map((pkg) => (
            <Box key={pkg.id} flexShrink={0}>
              <PackageCard package={pkg} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
