import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Attributes = ({ Articledata, setArticledata }) => {
  return (
    <React.Fragment>
      <Box display="flex" flexWrap="wrap" gap={3}>
        <Box flexBasis={{ xs: '100%', sm: '48%' }}>
        <TextField
        required
        id="ProductName"
        name="ProductName"
        label="Product Name"
        fullWidth
        autoComplete='false'
        value={Articledata.nom}
        onChange={(e) => setArticledata({ ...Articledata, nom: e.target.value })}
        />
        </Box>
        <Box flexBasis={{ xs: '100%', sm: '48%' }}>
          <TextField
            required
            id="price"
            type="number"
            variant="outlined"
            name="price"
            label="the product price"
            fullWidth
            autoComplete='false'
            inputProps={{ min: 1, step: 1 }}
            value={Articledata.puv}
            onChange={(e) => setArticledata({ ...Articledata, puv: e.target.value })}
          />
        </Box>
        <Box flexBasis="100%">
          <TextField
            id="Description"
            name="Description"
            label="Description"
            multiline
            rows={4}
            fullWidth
            autoComplete='false'
            value={Articledata.description}
            onChange={(e) => setArticledata({ ...Articledata, description: e.target.value })}
          />
        </Box>
        <Box flexBasis="100%">
          <TextField
            label="product stock"
            type="number"
            variant="outlined"
            fullWidth
            required
            value={Articledata.stock}
            onChange={(e) => setArticledata({ ...Articledata, stock: e.target.value })}
            inputProps={{ min: 1, step: 1 }}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Attributes;
