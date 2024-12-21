import React, { useEffect, useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { CheckCircle, Cancel, Image } from '@mui/icons-material';

const UpdateImg = ({ Articledata, setArticledata }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(Articledata.image);
  const [imageName, setImageName] = useState('');
  const [valid, setValid] = useState(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png', 'bmp'];
      if (validExtensions.includes(fileExtension)) {
        const imageUrl = URL.createObjectURL(file);
        setImage(file);
        setImageName(fileName);
        setValid(true);
        setArticledata({ ...Articledata, image: file }); // Mettez à jour Articledata avec l'image
      } else {
        setValid(false);
        setImage(null);
        setImageName('');
        setImagePreview(null);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, border: '1px solid #D5D8E2', borderRadius: 2 }}>
      <Typography variant="h5" color="black" textAlign="center" gutterBottom>
        Upload and Download Image
      </Typography>

      {/* Affichage du nom du fichier et de l'icône correspondante */}
      <Typography id="namefile" color={valid ? 'green' : 'red'} fontWeight={700} textAlign="center">
        {valid ? (imageName || 'Only pics allowed! (jpg, jpeg, bmp, png)') : `File "${imageName}" is not a pic!`}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Icônes selon l'état du fichier */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          {!image && !valid && <Cancel color="error" sx={{ fontSize: 50 }} />}
          {valid && Articledata.image && <CheckCircle color="success" sx={{ fontSize: 50 }} />}
          {Articledata.image === '' && valid && <Image color="primary" sx={{ fontSize: 50 }} />}
        </Box>
        <Button
          variant="contained"
          component="label"
          sx={{ width: { sm: '55%', xs: '100%' }, marginTop: 3 }}
        >
          Choose Your Picture
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        {imagePreview != null && valid && (
          <Box sx={{ marginTop: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Image Preview:
            </Typography>
            <img
              src={image === null ? `http://localhost:3306/images/${imagePreview}` : URL.createObjectURL(image)}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
                marginBottom: '20px',
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UpdateImg;
