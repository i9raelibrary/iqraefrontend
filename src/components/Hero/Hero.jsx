import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css'

const slides = [
  {
    image: "https://img.freepik.com/free-photo/close-up-yellow-book-with-blue-background_23-2147615012.jpg?t=st=1734258011~exp=1734261611~hmac=1cb83a1edffe3df5066b64ffafeba0aa25289e79de4680cfced9a343a776d6a7&w=1060",
    title: "Books Collection 2024",
    subtitle: "Discover the latest trends in fashion",
  },
  {
    image: "https://img.freepik.com/free-photo/organized-desk-with-copy-space_23-2148219270.jpg?t=st=1734258351~exp=1734261951~hmac=2dc13dbbc66acdf76e220183e0179c491e8f34642dea34bcac8b6f25185939e2&w=1380",
    title: "Fournitures",
    subtitle: "Up to 40% off on pencels",
  },
  {
    image: "https://img.freepik.com/free-photo/party-supplies-blue_23-2147755231.jpg?t=st=1734258499~exp=1734262099~hmac=63dc11607f59031aa5a8b184a4bb14415aab8942381805fe1885559586e8fb0a&w=1060",
    title: "Arts & jouets",
    subtitle: "Transform your space",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            inset: 0,
            transition: 'opacity 1s',
            opacity: currentSlide === index ? 1 : 0,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to right, ${theme.palette.primary.dark}70, transparent)`,
              zIndex: 10,
            }}
          />
          <Box
            component="img"
            src={slide.image}
            alt={slide.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              zIndex: 20,
            }}
          >
            <Container>
              <Box sx={{ maxWidth: 600, color: 'white' }}>
                <Typography variant="h2" sx={{color: 'white'}} fontWeight="bold" gutterBottom>
                  {slide.title}
                </Typography>
                <Typography variant="h6" sx={{color: 'white', marginBottom: '25px'}} gutterBottom>
                  {slide.subtitle}
                </Typography>
                <Link to={'/articles'}>
                    <Button
                    variant="contained"
                    className="explore-button"
                    endIcon={<ArrowRight />}
                    >
                    Shop Now
                    </Button>
                </Link>
              </Box>
            </Container>
          </Box>
        </Box>
      ))}

      {/* Navigation Dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 30,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: currentSlide === index ? 'primary.main' : 'white',
              opacity: currentSlide === index ? 1 : 0.9,
              cursor: 'pointer',
              transition: 'background-color 0.3s, opacity 0.3s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Hero;
