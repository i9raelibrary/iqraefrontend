import React, { useState } from "react";
import { useFetchAllQuery, useUpdatearticleMutation, useDeleteArticleMutation } from "../../../services/articleApi";
import {
  Box, Button, Card, CardContent, CardHeader, List, ListItem,
  ListItemAvatar, IconButton, Avatar, ListItemText,
  Typography, CircularProgress
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MyUpdateCard from './MyUpdateCard.jsx';
import CloseIcon from "@mui/icons-material/Close";
import PhotoshopAlert from '../Alert/alert';
import { toast } from "react-toastify";
import { LodingCircular } from "../../../components";

const Products = () => {
  const { data: products, isFetching, refetch } = useFetchAllQuery();
  const [deleteArticle] = useDeleteArticleMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [id, Setid] = useState(null);
  const [Articledata, setArticledata] = useState({
    id: '',
    nom: '', puv: '', image: null, stock: '',
    categorie_id: null, description: ''
  });
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => setIsVisible(false);

  const handleEdit = (article) => {
    console.log("Edit product with id:", article.image || "No image");
    setArticledata({
      id: article.id,
      nom: article.nom,
      puv: article.puv,
      image: article.image,
      stock: article.stock,
      categorie_id: article.categorie_id,
      description: article.description
    });
    setIsVisible(true);
  };

  if (isFetching) {
    <LodingCircular />
  }


  const handleDelete = async (productId) => {
    const result = await deleteArticle({ productId }).unwrap();
    if (result.success) {
      setShowAlert(false);
      toast.success(result.message);
      refetch();
    } else {
      toast.error(result.message);
    }
  };

  // Vérifier si les produits sont en cours de chargement
  if (isFetching) {
    return (
      <Box
        component="main"
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Vérifier si les données sont valides
  if (!products || !Array.isArray(products)) {
    return (
      <Typography variant="h6" align="center" sx={{ marginTop: "20px" }}>
        Problème avec les données des produits ou aucun produit disponible.
      </Typography>
    );
  }

  return (
    <main className="max-width-wh-100 w-100 main-content max-height-vh-100 h-100 border-radius-lg">
      <Box sx={{ maxWidth: "100%", margin: "10px" }}>
        <Card>
          <CardHeader title="Products" />
          <CardContent>
            <List>
              {products.map((product) => (
                <ListItem
                  key={product.id || product.nom} // Clé unique fallback
                  divider
                  sx={{
                    display: "flex",
                    justifyContent: { sm: "space-between" },
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "center", sm: "center" }
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      marginRight: { sm: "20px" },
                      marginBottom: { xs: "10px", sm: 0 },
                      width: { xs: "100%", sm: "auto" }
                    }}
                  >
                    <Avatar
                      variant="square"
                      src={`http://localhost:3306/images/${product.image}`}
                      alt={product.nom || "No name"}
                      sx={{
                        width: { xs: "100%", sm: 100 },
                        height: { xs: "auto", sm: 100 },
                        borderRadius: "15px"
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {product.nom || "Unnamed Product"}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Price: {product.puv || "N/A"} MAD
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Stock: {product.stock || 0} units available
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Description: {product.description || "No description available"}
                        </Typography>
                      </Box>
                    }
                    sx={{ textAlign: { xs: "center", sm: "left" } }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "row", sm: "column" },
                      justifyContent: { xs: "space-between", sm: "flex-start" },
                      width: { xs: "100%", sm: "auto" },
                      alignItems: "center",
                      gap: { xs: "20px", sm: "10px" },
                      marginLeft: { sm: "20px" },
                      marginTop: { xs: "10px", sm: 0 }
                    }}
                  >
                    <IconButton
                      onClick={() => handleEdit(product)}
                      sx={{ color: "gray", padding: "8px" }}
                    >
                      <EditIcon sx={{ fontSize: "22px" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => { setShowAlert(true); Setid(product.id) }}
                      sx={{ color: "gray", padding: "8px" }}
                    >
                      <DeleteIcon sx={{ fontSize: "22px" }} />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
      {showAlert && (
        <PhotoshopAlert
          message="You want to delete this product !"
          onClose={() => setShowAlert(false)}
          onDelete={() => (handleDelete(id))}
        />
      )}
      {isVisible && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
            zIndex: 1000,
          }}
        >
          <Card
            sx={{
              overflowY: "scroll",
              maxHeight: "90vh",
              width: "auto",
              padding: 2,
              position: "relative",
              "&::-webkit-scrollbar": {
                width: "2px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "5px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
              scrollbarWidth: "thin",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "gray",
              }}
            >
              <CloseIcon />
            </IconButton>
            <CardContent>
              <Typography variant="h5" align="center">
                Edit Product
              </Typography>
              <MyUpdateCard Articledata={Articledata} setArticledata={setArticledata} setIsVisible={setIsVisible} refetch={refetch}/>
            </CardContent>
            
          </Card>
        </Box>
      )}
    </main>
  );
};

export default Products;
