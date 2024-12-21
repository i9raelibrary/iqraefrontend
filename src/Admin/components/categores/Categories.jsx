import React, { useEffect, useState } from 'react';
import { CategoryList } from './CategoriesListe';
import { CategoryForm } from './CategoryForm';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { useFetchAllCATEGORIESQuery, useCreateCategorieMutation } from '../../../services/CategorieApi';
import { number, string } from 'yup';
import { toast } from 'react-toastify';

const Categories = () => {
  const [activeTab, setActiveTab] = useState('list');
  const { data, isLoading , refetch} = useFetchAllCATEGORIESQuery();
  const [infocategories, setInfocategories] = useState({categories: []});
  const [categorie, setCategorie] = useState({
    CatparentId: null,
    catName: String,
    maxOrdStack: number,
    LivraisonPrice: number
  });
  
   const [createCategorie, { isLoading: loading, isError, isSuccess }] = useCreateCategorieMutation();

   console.log(categorie)
   const handleCategorie = async (e) => {
    e.preventDefault();
     try {
       const result = await createCategorie(categorie);
       console.log(result);
       if (result.data.success) {
         toast.success(result.data.message);
         refetch(),
         setCategorie({
          CatparentId: null,
          catName: '',
          maxOrdStack: '',
          LivraisonPrice: ''
        });
       } else {
         toast.error('Erreur lors de la création de categorie')
       }
       // Sends the new article data
     } catch (error) {
       console.error('Failed to create article:', error);
     }
   };

  useEffect(() => {
      setInfocategories((prev) => ({
        ...prev,
        categories: data ? [...data.categories] : []
      }));
  }, [data]); // Only trigger when categories change or new categories are different

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="main-content position-relative d-flex justify-content-center max-height-vh-100 w-100 h-100">
      <div className="container-ofForm">
        <div className="page-header min-height-300 border-radius-xl mt-4"
          style={{
            backgroundImage: `url('https://img.freepik.com/photos-gratuite/interieur-maison-bois-photorealiste-decor-meubles-bois_23-2151263505.jpg?t=st=1733757930~exp=1733761530~hmac=62338f1420e89b7ebcb5dff17cc2aa96996c0a306bbc0b69284dc7262c339bcf&w=1060')`
          }}
        >
          <span className="mask bg-gradient-dark opacity-6"></span>
        </div>
        <div className="card card-body mx-2 mx-md-2 mt-n6">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              padding: 3,
              height: 'auto',
              position:'relative',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Categories
            </Typography>

            <Box
              sx={{
                width: '100%',
                bgcolor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="category tabs"
              >
                <Tab label="View Categories" value="list" />
                <Tab label="Add Category" value="form" />
              </Tabs>
            </Box>

            <Box sx={{top: 0, marginTop: 3,height: 'auto', width: '100%' }}>
                {activeTab === 'list' ? 
                    <CategoryList infocategories={infocategories} setInfocategories={setInfocategories} /> 
                    : <CategoryForm infocategories={infocategories} categorie={categorie} setCategorie={setCategorie} handleCategorie={handleCategorie} />
                }
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Categories;
