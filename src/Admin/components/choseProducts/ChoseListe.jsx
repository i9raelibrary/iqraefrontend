import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useFetchPRODUCTSRandomllyQuery } from "../../../services/articleApi";
import {
  Box,
  CircularProgress,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Checkbox,
} from "@mui/material";

const filter = createFilterOptions();

const ChoseListe = ({ setInfo, id, setId }) => {
  const [value, setValue] = useState(null);
  const {
    data: articles,
    isFetching,
    error,
  } = useFetchPRODUCTSRandomllyQuery();

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

  if (error) {
    return <div>Error fetching products.</div>;
  }

  const names =
    articles &&
    articles.data?.map((article) => ({
      id: article.id,
      title: article.nom,
      data: article, // Inclure les données complètes pour l'article
    }));

  // Filtrage des articles selon la recherche
  const filteredArticles = value
    ? articles.data?.filter((product) =>
        product.nom.toLowerCase().includes(value.title?.toLowerCase() || "")
      )
    : articles.data;

  return (
    <CardContent sx={{ height: "400px", overflowY: "scroll" }}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={names}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          return filtered;
        }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        sx={{ width: "100%", marginBottom: "16px" }}
        renderInput={(params) => (
          <TextField {...params} label="Rechercher ou choisir un produit" />
        )}
      />

      <List>
        {filteredArticles?.map((product) => (
          <ListItem
            key={product.id || product.nom}
            divider
            sx={{
              display: "flex",
              marginTop: "15px",
              justifyContent: { sm: "space-between" },
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "center" },
            }}
          >
            <Box sx={{ width: "80px" }}>
              <Checkbox
                checked={id.includes(product.id)}
                onChange={(event) => {
                  if (event.target.checked) {
                    setId((prev) => [...prev, product.id]);
                    setInfo((prev) => ({
                      ...prev,
                      Total: prev.Total + product.puv,
                    })); // Correction ici
                  } else {
                    setId((prev) => prev.filter((id) => id !== product.id));
                    setInfo((prev) => ({
                      ...prev,
                      Total: prev.Total - product.puv,
                    })); // Correction ici
                  }
                }}
                color="success"
              />
            </Box>
            <ListItemAvatar
              sx={{
                marginRight: { sm: "20px" },
                marginBottom: { xs: "10px", sm: 0 },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <Avatar
                variant="square"
                src={
                  product.image.length < 30
                    ? `http://localhost:3306/images/${product.image}`
                    : product.image
                }
                alt={product.nom || "No name"}
                sx={{
                  width: { xs: "100%", sm: 100 },
                  height: { xs: "auto", sm: 100 },
                  borderRadius: "15px",
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
                    Description:{" "}
                    {product.description || "No description available"}
                  </Typography>
                </Box>
              }
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  );
};

export default ChoseListe;
