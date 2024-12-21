import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Box, Button, Card, CardContent, IconButton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
import ShosePage from '../choseProducts/ShosePage'
import PhotoshopAlert from '../Alert/alert'
import { useGetAllPacksQuery, useDeletePackMutation } from '../../../services/PackApi';
import { toast } from 'react-toastify';

const Package = () => {
  const [Data, SetData] = useState([]);
  const { data: Packs, isFetching, refetch } = useGetAllPacksQuery();
  const [DeletePack, { isLoading }] = useDeletePackMutation();


  const handleDelete = async (id) => {
    console.log("vvvvv", id)
    const result = await DeletePack(id).unwrap();
    console.log(result);
    if (result.success) {
      toast.success(result.message);
      refetch();
    } else {
      toast.error(result.message)
    }

  }

  useEffect(() => {
    if (Packs && !isFetching) {
      if (Packs.success) {
        console.log(Packs);
        SetData(Packs.results);
      }
    }
  }, [Packs, isFetching]);

  const [isVisible, setIsVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [id, setId] = useState([]); /* Hada kayjma3 l aydiyat dyal kol packaj */
  const [Info, setInfo] = useState({ Name: '', Descreption: '', price: '', Total: 0 }); /* Hada fih smiya w taman d lpackaj wkatafficher total */

  const handelEdite = (Element) => {
    const ids = Element.articles.map(article => article.id);
    const editeData = {
      Name: Element.PackageName,
      Descreption: Element.Descreption,
      price: Element.price,
      Total: Element.oldprice,
    };

    setId(ids)
    setInfo(editeData);
    setIsVisible(true)
  };
  return (
    <main className="d-flex align-items-center justify-content-center max-width-wh-100 w-100 main-content max-height-vh-100 h-100 border-radius-lg p-2">
      <Card
        sx={{
          boxShadow: '0 0 10px #E0DFE1',
          display: 'flex',
          flexWrap: 'wrap',
          background: 'white',
          justifyContent: { xs: 'center', sm: 'center', md: '' }, // Adapté selon les tailles,
          padding: '10px',
          width: '100%',
          height: '100%',
          overflowY: 'scroll'
        }}
      >
        {Data?.map((Element, index) => (
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
                        src={src.image.length < 30 ? `http://localhost:3306/images/${src.image}` : src.image}
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
              <Typography variant="h4" component="h2" sx={{ color: '#0F0E1F', fontWeight: 500 }}>
                {Element.pack.nom}
              </Typography>
              <Typography variant="h6" component="h2" sx={{ color: '#0F0E1F', fontWeight: 400, textDecoration: 'line-through' }}>
                {Element.pack.oldPrix} MAD
              </Typography>
              <Typography variant="h5" component="h2" sx={{ color: '#0F0E1F', fontWeight: 500 }}>
                {Element.pack.prixTotal} MAD
              </Typography>
              <Box sx={{ position: 'absolute', bottom: '25px', width: '100%', display: 'flex', marginTop: '15px', justifyContent: 'space-around' }}>
                <Button onClick={() => { setShowAlert(true); setId(Element.pack.id) }} variant="outlined" startIcon={<DeleteIcon />} color="primary">
                  Delete
                </Button>
                {/* <Button onClick={() => handelEdite(Element)} variant="outlined" startIcon={<EditIcon />} color="success">
                  Edit
                </Button> */}
              </Box>
            </Box>
          </Card>
        ))}
      </Card>
      {!isVisible && (
        <Fab sx={{
          position: 'absolute',
          right: '40px',
          bottom: '50px',
        }} color="primary" aria-label="add"
          onClick={() => {
            setId([]),
              setInfo({ Name: '', Descreption: '', price: '', Total: 0 }),
              setIsVisible(true)
          }}
        >
          <AddIcon />
        </Fab>
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
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "gray",
              }}
            >
              <CloseIcon onClick={() => setIsVisible(false)} />
            </IconButton>
            <CardContent>
              <Typography variant="h4" align="center">
                Chose Products
              </Typography>
              <ShosePage Info={Info} setInfo={setInfo} id={id} setId={setId} refetch={refetch} />
            </CardContent>
          </Card>
        </Box>
      )}
      {showAlert && (
        <PhotoshopAlert
          message="You want to delete this Package !"
          onClose={() => setShowAlert(false)}
          onDelete={() => (handleDelete(id))}
        />
      )}
    </main>
  )
}

export default Package
