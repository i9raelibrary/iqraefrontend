import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, IconButton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useGetAllPacksQuery } from '../../../services/PackApi';

const Package = () => {
  const [data, SetData] = useState([]);
  const { data: Packs, isFetching, refetch } = useGetAllPacksQuery();

  useEffect(() => {
    if (Packs && !isFetching) {
      if (Packs.success) {
        SetData(Packs.results);
      }
    }
  }, [Packs, isFetching]);

  return (

    <main className="d-flex flex-col align-items-center justify-content-center max-width-wh-100 w-100 main-content max-height-vh-100 h-100 border-radius-lg p-2">
      <Box>
        <h2 class="text-3xl font-bold text-center my-4">
          Choose your package and have it delivered to your location
        </h2>
      </Box>

      <Card
        sx={{
          boxShadow: '0 0 10px #E0DFE1',
          display: 'flex',
          flexWrap: 'wrap',
          background: 'white',
          justifyContent: { xs: 'center', sm: 'center', md: '' },
          padding: '10px',
          width: '100%',
          height: '100%',
          overflowY: 'scroll'
        }}
      >
        {data?.map((Element, index) => (
          <Card
            key={index}
            sx={{
              position: 'relative',
              boxShadow: '0 0 5px #E0DFE1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '20px',
              padding: '15px 5px',
              background: 'white',
              width: '350px',
              height: '350px',
              borderRadius: '10px',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {Element.produits.map((src, idx) => {
                if (idx > 4) return null; // Stop l'affichage au-delà de l'index 5

                return (
                  <Box
                    key={idx}
                    sx={{
                      position: 'relative',
                      width: '100px',
                      height: '100px',
                      marginLeft: idx === 0 ? 0 : '-50px',
                      border: '2px solid white',
                      zIndex: 5 - idx,
                      borderRadius: '20px',
                    }}
                  >
                    {idx === 4 ? (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#E0DFE1',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          padding: '0 18px',
                          alignItems: 'center',
                          fontWeight: 'bold',
                          borderRadius: '20px',
                          fontSize: '20px',
                        }}
                      >
                        +{Element.produits.length - 4}
                      </Box>
                    ) : (
                      <Avatar
                        src={src.image}
                        sx={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '20px',
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 0'
              }}
            >
              <Typography variant="h5" component="h2" sx={{ color: '#0F0E1F', fontWeight: 500 }}>
                {Element.PackageName}
              </Typography>
              <Typography variant="h6" component="h2" sx={{ color: '#0F0E1F', fontWeight: 400, textDecoration: 'line-through' }}>
                {Element.oldprice} MAD
              </Typography>
              <Typography variant="h5" component="h2" sx={{ color: '#0F0E1F', fontWeight: 500 }}>
                {Element.price} MAD
              </Typography>

            </Box>
            <Button variant='contained' color='success' sx={{ width: '100px' }}>Order</Button>
          </Card>
        ))}
      </Card>
    </main>
  )
}

export default Package
