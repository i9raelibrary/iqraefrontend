import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Book, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './MotivationSection.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MotivationSection = () => {
  const { t } = useTranslation();

  return (
    <Box className="motivation-section">
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box className="motivation-content">
            <Box className="motivation-text">
              <Typography variant="h2" className="motivation-title" gutterBottom>
                {t('home.motivationTitle')}
              </Typography>
              <Typography variant="h5" className="motivation-quote" gutterBottom>
                {t('home.motivationQuote')}
              </Typography>
              <Typography variant="body1" className="motivation-description">
                {t('home.motivationText')}
              </Typography>
              <Box className="motivation-actions">
                <Link to={'/articles'}>
                  <Button
                    variant="contained"
                    className="explore-button"
                    endIcon={<ArrowRight />}
                  >
                    {t('home.motivationDis')}
                  </Button>
                </Link>
                <Link to={'/about'}>
                <Button
                  variant="outlined"
                  className="blog-button"
                  startIcon={<Book />}
                >
                  Shop now
                </Button>
                </Link>
              </Box>
            </Box>
            <Box className="motivation-image">
              <motion.img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800"
                alt="Bibliothèque inspirante"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default MotivationSection;
