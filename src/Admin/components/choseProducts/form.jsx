import React, { useState } from "react";
import {  Button, Typography, Box } from "@mui/material";
import TextField from '@mui/material/TextField';

const Form = ({ Info, setInfo }) => {
  const [packageName, setPackageName] = useState("");
  const [Descreption, setDescreption] = useState("");
  const [price, setPrice] = useState('');
  

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position:'relative',
        width: {sm: "400px", xs:'100%'},
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Informations
      </Typography>
      
      <TextField
        label="Nom du Package"
        variant="outlined"
        sx={{
            width: "100%",
            maxWidth: 600,
          }}
          onChange={(e) => setInfo((prev) => ({ ...prev, Name: e.target.value }))}
          value={Info.Name}
        fullWidth
      />
      
      <TextField
      label="Descreption"
      multiline
      rows={2} // Nombre de lignes visibles
      variant="outlined"
      onChange={(e) => setInfo((prev) => ({ ...prev, Descreption: e.target.value }))}
      value={Info.Descreption}
      fullWidth
    />

      <TextField
        label="Prix"
        type="number"
        variant="outlined"
        onChange={(e) => { setPrice( e.target.value), setInfo((prev) => ({ ...prev, price: e.target.value }))}}
        value={Info.price}
        fullWidth
      />

      {price > Info.Total ? 
           <Typography  variant="h7" color="error" sx={{ marginLeft: 1 }}>The price is higher than the total</Typography>
       : null}

      <Typography variant="body1" align="center" sx={{ marginTop: 1 }}>
        Last Total : <strong>{Info.Total} MAD</strong>
      </Typography>
    </Box>
  );
};

export default Form;
