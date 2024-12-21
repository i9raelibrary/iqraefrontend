import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'; // Importation des composants Material-UI
import Loding from '../../../components/animations/loding/LodingBare/Loding';
import { useCreateArticleMutation } from '../../../services/articleApi';
import { toast } from 'react-toastify';

export function CategoryForm({ infocategories, categorie, setCategorie , handleCategorie}) {

    const [createArticle] = useCreateArticleMutation();
    const [lastInput, setLastInput] = useState(true);
    const [famille, setFamille] = useState([[]]);
    const [selectionChange, setSelectionChange] = useState([]);
    const [sourceArr, setSourceArr] = useState([]);
    const [parentID, setParentID] = useState(null);

    useEffect(()=>{
      setCategorie({
          catName: '',
          maxOrdStack: null,
          LivraisonPrice: null
        });
    },[])
  
   
  
    const categories = infocategories ? [...infocategories.categories] : [];
  
    useEffect(() => {
      const rootCategories = categories.filter((cat) => cat.parent_id === null);
      setSourceArr(rootCategories);
    }, [infocategories]);
  
    const handleCancel = () => {
      setFamille([categories.filter((cat) => cat.parent_id === null)]);
      setLastInput(true);
      setSelectionChange([]);
      setParentID(null)
      setCategorie({
        CatparentId: null,
        catName: '',
        maxOrdStack: 0,
        LivraisonPrice: 0,
      });
    };
  
    const handleSelectionChange = (value, index) => {
      setParentID(value);
      setSelectionChange((prev) => {
        const updatedSelections = [...prev];
        updatedSelections[index] = value;
        return updatedSelections;
      });
  
      const newElements = categories.filter((cat) => cat.parent_id === value);
      setSourceArr(newElements);
    };

    
    useEffect(() => {
      setFamille((prevFamille) => {
        if (sourceArr.length > 0) {
          setLastInput(true);
          return prevFamille.length && prevFamille[0].length > 0
          ? [...prevFamille, sourceArr]
          : [sourceArr];
        } else {    
          setLastInput(false);
          console.log(parentID)
          return prevFamille;
        }
      });
      setCategorie((prev) => ({ ...prev, CatparentId: parentID ?? null }));
    }, [sourceArr]);
    
  return (
    <Box
    sx={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      width: '100%',
      maxWidth: '1200px', // width can be adjusted
      margin: '0 auto',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' }, // Responsive flexbox: column on small screens, row on medium and up
      gap: 3,
    }}
  >
    {/* First Form (Category Selection Form) */}
    <div style={{ flex: 1 }}>
      <div style={{ width: '100%', margin: '0 auto' }}>
      <InputLabel>Select categorie</InputLabel>
        {famille.map((element, index) => (
          <FormControl
            fullWidth
            key={index}
            sx={{
              margin: '10px 0',
            }}
          >
            <InputLabel>Sélectionner la catégorie</InputLabel>
            <Select
              value={selectionChange[index] || ''}
              label="Sélectionner la catégorie"
              onChange={(e) => handleSelectionChange(e.target.value, index)}
              disabled={index !== famille.length - 1}
            >
              {element.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.nom_categorie.replace(/_/g, ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </div>
    </div>

    {/* Second Form (Create New Category Form) */}
    <form onSubmit={(e)=> {handleCategorie(e), handleCancel()}} style={{ flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Create New Category
      </Typography>

      <div>
        <TextField
          fullWidth
          label="Category Name"
          id="name"
          variant="outlined"
          placeholder="Enter category name"
          value={categorie.catName}
          onChange={(e) => setCategorie( (prev) => ({...prev, catName: e.target.value}) ) }
          required
          sx={{
            marginBottom: 2,
          }}
        />
      </div>

      <div>
        <TextField
          fullWidth
          label="Maximum order total"
          id="name"
          variant="outlined"
          placeholder="Enter maximum order total"
          type='number'
          value={categorie.maxOrdStack}
          onChange={(e) => setCategorie( (prev) => ({...prev, maxOrdStack: e.target.value}) ) }
          required
          sx={{
            marginBottom: 2,
          }}
        />
      </div>

      <div>
        <TextField
          fullWidth
          label="Delivery price"
          id="name"
          variant="outlined"
          placeholder="Enter delivery price"
          type='number'
          value={categorie.LivraisonPrice}
          onChange={(e) => setCategorie( (prev) => ({...prev, LivraisonPrice: e.target.value}) ) }
          required  
          sx={{
            marginBottom: 2,
          }}
        />
      </div>

      <Box display="flex" justifyContent="flex-end" gap={2}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleCancel}
        style={{ width: '100%', margin: '10px 0' }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        type='submit'
        style={{ width: '100%', margin: '10px 0' }}
      >
        Save Category
      </Button>
      </Box>
    </form>
  </Box>
  );
}
