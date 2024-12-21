import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, TextField, Button } from '@mui/material';

export function CategoryDetails({ category, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom_categorie: category?.nom_categorie || '',
    maxOrdStock: category?.maxOrdStock || '',
    LivraisonPrice: category?.LivraisonPrice || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (!category) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1300,
        }}
      >
        <Typography variant="h6" color="textSecondary">
          Aucun détail de catégorie sélectionné.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1300,
      }}
    >
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 500,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          borderRadius: '16px',
          padding: '24px',
          backgroundColor: 'white',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}
          >
            {isEditing ? 'Modifier la catégorie' : formData.nom_categorie || 'Nom de la catégorie'}
          </Typography>
          <Grid container spacing={2}>
            {isEditing ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nom de la catégorie"
                    name="nom_categorie"
                    value={formData.nom_categorie}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Quantité maximale"
                    name="maxOrdStock"
                    value={formData.maxOrdStock}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Prix de livraison"
                    name="LivraisonPrice"
                    value={formData.LivraisonPrice}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Nom de la catégorie
                  </Typography>
                  <Typography variant="body1">{formData.nom_categorie || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Quantité maximale
                  </Typography>
                  <Typography variant="body1">{formData.maxOrdStock || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography type="number" variant="subtitle1" color="textSecondary">
                    Prix de livraison
                  </Typography>
                  <Typography variant="body1">{formData.LivraisonPrice || 0} MAD</Typography>
                </Grid>
              </>
            )}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            <Button variant="outlined" color="primary" onClick={handleEditToggle}>
              {isEditing ? 'retourner' : 'Éditer'}
            </Button>
            <Button variant="contained" color="info" onClick={onClose}>
               {isEditing ? 'Save' : 'Fermer'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
