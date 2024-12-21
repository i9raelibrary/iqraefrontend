import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';

const Informations = ({ Articledata, setArticledata, mode }) => {
  useEffect(() => {
    console.log("tkhrbbiaq", Articledata);
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informations :
      </Typography>
      <List disablePadding>
        <ListItem
          sx={{
            padding: '8px 0', // Remplace theme.spacing(1, 0)
          }}
        >
          <ListItemText primary="Product Name :" secondary={Articledata.nom} />
        </ListItem>
        <ListItem
          sx={{
            padding: '8px 0',
          }}
        >
          <ListItemText primary="Description :" secondary={Articledata.description} />
        </ListItem>
        <ListItem
          sx={{
            padding: '8px 0',
          }}
        >
          <ListItemText primary="Price :" secondary={`${Articledata.puv} MAD`} />
        </ListItem>
        <ListItem
          sx={{
            padding: '8px 0',
          }}
        >
          <ListItemText primary="Stock :" secondary={Articledata.stock} />
        </ListItem>
        <ListItem
          sx={{
            padding: '8px 0',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 600,
              margin: 'auto',
              overflow: 'hidden',
            }}
          >
            <p>Image : <br /></p>
            {Articledata.image ? (
              <img
                src={URL.createObjectURL(Articledata.image)}
                alt="Image Preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                No image selected.
              </Typography>
            )}
          </Box>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default Informations;
