import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Award } from 'lucide-react';
import './AboutPage.css';
import CompleteNavbar from '../../components/CompleteNavbar/CompleteNavbar';
import BottomInscription from '../../components/BottomInscription/BottomInscription';
import { useTranslation } from 'react-i18next';

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We are passionate about education and the transmission of knowledge."
  },
  {
    icon: Users,
    title: "Community",
    description: "We create a collaborative and inclusive learning environment."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We aim for excellence in every aspect of our service."
  },
  {
    icon: Award,
    title: "Quality",
    description: "We rigorously select our products to ensure the best quality."
  }
];

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <CompleteNavbar />
      <div className="about-page">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box className="about-hero">
              <Typography variant="h2" className="page-title" gutterBottom>
                {t('about.title')}
              </Typography>
              <Typography variant="subtitle1" className="page-subtitle">
                {t('about.subtitle')}
              </Typography>
            </Box>

            <Grid container spacing={6} className="about-content">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Typography variant="h4" gutterBottom className="section-title">
                    {t('about.history.title')}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {t('about.history.content')}
                  </Typography>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Box className="about-image">
                    <img
                      src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800"
                      alt="Bibliothèque Eqrae"
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>

            <Box className="values-section">
              <Typography variant="h4" gutterBottom className="section-title" align="center">
                {t('about.values.title')}
              </Typography>
              <Grid container spacing={4}>
                {values.map((value, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index }}
                    >
                      <Paper elevation={3} className="value-card">
                        <Box className="value-icon">
                          <value.icon size={32} />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                          {t(`about.values.${value.title.toLowerCase()}`)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t(`about.values.${value.title.toLowerCase()}Description`)}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        </Container>
      </div>
      <BottomInscription />
    </>
  );
};

export default AboutPage;
