import React, { useState } from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CategoryDetails } from './CategoryDetails';

export function CategoryList({ infocategories, setInfocategories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCategoryId, setVisibleCategoryId] = useState(null); // ID de la catégorie visible

  // Gérer la recherche
  const filteredCategories = infocategories.categories
    .filter((category) =>
      category.nom_categorie.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // Trier par la date la plus récente
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || '1970-01-01').getTime();
      const dateB = new Date(b.createdAt || '1970-01-01').getTime();
      return dateB - dateA; // Décroissant
    });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEditClick = (categoryId) => {
    // Basculer entre afficher ou masquer les détails
    setVisibleCategoryId(visibleCategoryId === categoryId ? null : categoryId);
  };

  return (
    <div style={{ top: 0, width: '100%', height: '100%', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
      <Typography variant="h6" gutterBottom>
        Categories List
      </Typography>

      {/* Champ de recherche */}
      <TextField
        label="Search Categories"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px' }}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: 'bold', fontSize: '12px', color: '#6B7280' }}>Name</TableCell>
              <TableCell align="left" style={{ fontWeight: 'bold', fontSize: '12px', color: '#6B7280' }}>Maximum quantity</TableCell>
              <TableCell align="left" style={{ fontWeight: 'bold', fontSize: '12px', color: '#6B7280' }}>Delivery price</TableCell>
              <TableCell align="left" style={{ fontWeight: 'bold', fontSize: '12px', color: '#6B7280' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <React.Fragment key={category.id}>
                <TableRow>
                  <TableCell>{category.nom_categorie}</TableCell>
                  <TableCell>{category.maxOrdStock}</TableCell>
                  <TableCell>{category.LivraisonPrice} MAD</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEditClick(category.id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton color="error" aria-label="delete">
                        <Delete />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
                {/* Afficher les détails si l'ID correspond */}
                {visibleCategoryId === category.id && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <CategoryDetails category={category} onClose={setVisibleCategoryId} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
