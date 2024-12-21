import React, { useState } from 'react';
import { Grid, Box, Typography, Chip, Button } from '@mui/material';
import { Check, ShoppingBag } from 'react-feather';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import './Article.css';

const Article = ({ product }) => {
    const { t } = useTranslation();
    const [quantity, setQuantity] = useState(1);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    if (!product) return <p>{t('article.not_found')}</p>;

    const { id, name, price, image, stock, createdAt } = product;

    const handleIncrease = () => {
        if (quantity < stock) setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToBasket = () => {
        const basketItem = { id, name, price, image, stock, createdAt, quantity };
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        const existingItemIndex = basket.findIndex((item) => item.id === id);

        if (existingItemIndex === -1) {
            basket.push(basketItem);
            localStorage.setItem('basket', JSON.stringify(basket));
            toast.success(t('article.added_to_basket'));
        } else {
            const existingItem = basket[existingItemIndex];
            existingItem.quantity += quantity;
            basket[existingItemIndex] = existingItem;
            localStorage.setItem('basket', JSON.stringify(basket));
            toast.warning(t('article.quantity_updated'));
        }
    };

    return (
        <div>
            {isImageModalOpen && (
                <div className="image-modal">
                    <span className="close-button" onClick={() => setIsImageModalOpen(false)}>
                        <CloseIcon />
                    </span>
                    <img src={image} alt={name} className="large-image" />
                </div>
            )}
            <Grid container>
                <Grid item xs={12} md={6} >
                    <img
                        src={image}
                        alt={name}
                        onClick={() => setIsImageModalOpen(true)}
                        className="cursor-pointer"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ p: 4 }}>
                        <Box mb={3}>
                            <Chip
                                label="Category"
                                color="primary"
                                sx={{
                                    borderRadius: '16px',
                                    backgroundColor: 'primary.light',
                                    color: 'primary.main',
                                    fontWeight: 500,
                                }}
                            />
                        </Box>

                        <Typography variant="h5" component="h2" fontWeight="bold" mb={2}>
                            {name}
                        </Typography>

                        <Typography variant="h4" fontWeight="bold" mb={4}>
                            {price} MAD
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Box display="flex" alignItems="center" color={stock > 0 ? 'success.main' : 'error.main'}>
                                <Check size={20} style={{ marginRight: 8 }} />
                                <Typography>{stock > 0 ? t('article.in_stock') : t('article.out_of_stock')}</Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap={2} mb={3}>
                            <Button variant="outlined" onClick={handleDecrease} disabled={quantity <= 1}>
                                -
                            </Button>
                            <Typography>{quantity}</Typography>
                            <Button variant="outlined" onClick={handleIncrease} disabled={quantity >= stock}>
                                +
                            </Button>
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            startIcon={<ShoppingBag size={20} />}
                            sx={{
                                borderRadius: '8px',
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem',
                            }}
                            disabled={stock <= 0}
                            onClick={handleAddToBasket}
                        >
                            {t('article.add')}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Article;
