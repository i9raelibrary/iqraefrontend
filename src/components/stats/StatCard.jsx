import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Star, TrendingUp } from 'lucide-react'; // Import direct des icônes
import './StatCard.css';

const StatCard = ({ icon: Icon, value, label, prefix = '', suffix = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Paper elevation={3} className="stat-card">
        <Box className="stat-icon">
          <Icon size={32} />
        </Box>
        <Typography variant="h3" className="stat-value">
          {prefix}
          <CountUp end={value} duration={2.5} separator="," />
          {suffix}
        </Typography>
        <Typography variant="subtitle1" className="stat-label">
          {label}
        </Typography>
      </Paper>
    </motion.div>
  );
}

export default StatCard;
