import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { Users, ShoppingBag, Star, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';
import { useInView } from 'react-intersection-observer'; // Importer le hook
import './StatsSection.css';
import { useTranslation } from 'react-i18next';

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ne déclenche l'effet qu'une seule fois
    threshold: 0.5, // L'élément doit être visible à 50%
  });

  const {t} = useTranslation()

  const stats = [
    {
      icon: Users,
      value: 150000,
      label: 'Clients Satisfaits',
    },
    {
      icon: ShoppingBag,
      value: 500000,
      label: 'Produits Vendus',
      prefix: '+',
    },
    {
      icon: Star,
      value: 4.8,
      label: 'Note Moyenne',
      suffix: '/5',
    },
    {
      icon: TrendingUp,
      value: 95,
      label: 'Taux de Satisfaction',
      suffix: '%',
    },
  ];

  

  return (
    <Box className="stats-section" ref={ref}>
      <Container maxWidth="lg">
        <Typography variant="h2" className="stats-title" gutterBottom>
          Notre Impact en Chiffres
        </Typography>
        <Typography variant="subtitle1" className="stats-subtitle" gutterBottom>
          {t('home.ourImpactResults')}
        </Typography>
        <Grid container spacing={4} className="stats-grid">
          {inView &&
            stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatCard {...stat} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;
