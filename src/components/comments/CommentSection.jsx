import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import './CommentSection.css';
import { useTranslation } from 'react-i18next';

const comments = [
  {
    id: 1,
    author: "Marie Dubois",
    rating: 5,
    date: "15 février 2024",
    content: "Service exceptionnel ! La qualité des produits dépasse toutes mes attentes. Je recommande vivement."
  },
  {
    id: 2,
    author: "Pierre Martin",
    rating: 5,
    date: "12 février 2024",
    content: "Livraison rapide et service client très réactif. Je suis un client fidèle depuis maintenant 2 ans."
  },
  {
    id: 3,
    author: "Sophie Laurent",
    rating: 5,
    date: "10 février 2024",
    content: "Une expérience d'achat parfaite du début à la fin. Les prix sont compétitifs et la qualité est au rendez-vous."
  }
];

const CommentSection = () => {
  const { t } = useTranslation();

  return (
    <Box className="comments-section">
      <Container maxWidth="lg">
        <Typography variant="h2" className="comments-title" gutterBottom>
          {t('home.review')}
        </Typography>
        <Typography variant="subtitle1" className="comments-subtitle" gutterBottom>
          {t('home.reviewQuote')}
        </Typography>

        <Box className="comments-grid">
          {comments.map((comment) => (
            <Paper key={comment.id} elevation={3} className="comment-card">
              <Box className="comment-header">
                <Box className="comment-author">
                  <Box>
                    <Typography variant="h6">{comment.author}</Typography>
                    <Typography variant="caption" className="comment-date">
                      {comment.date}
                    </Typography>
                  </Box>
                </Box>
                <Box className="comment-rating">
                  {[...Array(comment.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </Box>
              </Box>
              <Typography className="comment-content">
                "{comment.content}"
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CommentSection;
