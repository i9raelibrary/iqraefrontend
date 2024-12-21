import React from 'react';
import { Link } from 'react-router-dom';  // Correct import of Link
import { Typography, Button, Box } from '@mui/material'; // Importing MUI components for better styling
import './Order.css';
import { useTranslation } from 'react-i18next';

const Empty = () => {
    const { t } = useTranslation();
    return (
        <div className="whole-order-container">
            <div className="basket-container">
                <Box sx={{ padding: 3, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                        {t('empty.text1')} 📦
                    </Typography>

                    <Typography variant="h6" sx={{ marginBottom: 3 }}>
                        {t('empty.text2')}
                    </Typography>
                    <Button
                        component={Link}  // Using Link as a component for styling
                        to="/"
                        variant="contained"
                        color="primary"
                        sx={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            m: 2
                        }}
                    >
                        {t('empty.text3')}
                    </Button>

                    <Button
                        component={Link}  // Using Link as a component for styling
                        to="/articles"
                        variant="contained"
                        color="secondary"
                        sx={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            m: 2
                        }}
                    >
                        {t('empty.text4')}
                    </Button>
                </Box>
            </div>
        </div>
    );
};

export default Empty;
