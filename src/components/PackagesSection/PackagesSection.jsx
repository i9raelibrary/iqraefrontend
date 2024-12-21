import React, { useEffect, useState, useRef } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Box, Button, Card, CardContent, IconButton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useGetAllPacksQuery } from '../../services/PackApi';
import PackDetails from '../PackDetails/PackDetails';
const PackagesSection = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 200; // Adjust scroll distance
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };



    const [Data, SetData] = useState([]);
    const [id, setId] = useState([]); /* Hada kayjma3 l aydiyat dyal kol packaj */
    const [Info, setInfo] = useState({ Name: '', Descreption: '', price: '', Total: 0 }); /* Hada fih smiya w taman d lpackaj wkatafficher total */
    const [ShowPackDetails, SetShowPackDetails] = useState(false);
    const [details, SetDetails] = useState({});


    const { data: Packs, isFetching, refetch } = useGetAllPacksQuery();

    useEffect(() => {
        if (Packs && !isFetching) {
            if (Packs.success) {
                SetData(Packs.results);
                console.log("packs=>" + JSON.stringify(Packs));
            }
        }
    }, [Packs, isFetching]);

    return (
        <>
            <section className="categories-title">
                <h1>Trouver des packages magnifiques</h1>
            </section>
            <main className="d-flex align-items-center justify-content-center max-width-wh-100 w-100 main-content max-height-vh-100 h-100 border-radius-lg p-2">
                <Button
                    onClick={() => scroll('left')}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        zIndex: 10,
                        backgroundColor: '#001A6E',
                        color: 'white',
                        padding: '10px 1px',
                        borderRadius: '8px',
                        margin: "20px",
                        fontSize: '16px',
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        minWidth: "40px",
                        '&:hover': {
                            backgroundColor: '#1281b8',
                        },
                    }}
                >
                    <ChevronLeftIcon fontSize='medium' />
                </Button>
                <Card
                    sx={{
                        boxShadow: '0 0 10px #E0DFE1',
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'white',
                        padding: '10px',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {/* Horizontal scrolling container */}
                    <Box
                        ref={scrollRef}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            overflowX: 'auto',
                            gap: '20px',
                            padding: '15px',
                            scrollbarWidth: "none", // Native scrollbar styling for Firefox
                            '&::-webkit-scrollbar': {
                                height: '1px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#4caf50',
                                borderRadius: '10px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: '#555',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: '#f1f1f1', // Scrollbar track background color
                            },
                        }}
                    >
                        {Data?.map((Element, index) => (
                            <div onClick={() => { 
                                SetShowPackDetails(true)
                                SetDetails(Element) }}>
                                <Card
                                    key={index}
                                    sx={{
                                        flex: '0 0 auto', // Prevent shrinking and maintain width for each card
                                        boxShadow: '0 0 5px #E0DFE1',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '0',
                                        padding: '15px 5px',
                                        background: 'white',
                                        width: '300px',
                                        height: '350px',
                                        borderRadius: '10px',
                                        cursor: "pointer"
                                    }}
                                >
                                    {/* Card content */}
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {Element.produits.map((src, idx) => {
                                            if (idx > 3) return null; // Stop l'affichage au-delà de l'index 5

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
                                                    {idx === 3 ? (
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
                                            textAlign: 'center',
                                            padding: '10px 0',
                                        }}
                                    >
                                        <Typography variant="h4" component="h2" sx={{ color: '#0F0E1F', fontWeight: 500 }}>
                                            {Element.pack.nom}
                                        </Typography>
                                        <Typography variant="h6" component="h2" sx={{ color: 'red', fontWeight: 400, textDecoration: 'line-through', fontSize: 15 }}>
                                            {Element.pack.oldPrix} MAD
                                        </Typography>
                                        <Typography variant="h5" component="h2" sx={{ color: '#0F0E1F', fontWeight: 500 }}>
                                            {Element.pack.prixTotal} MAD
                                        </Typography>
                                        {/* <Box sx={{ marginTop: '15px', display: 'flex', justifyContent: 'space-around' }}>
                                    <Button onClick={() => { setShowAlert(true) }} variant="outlined" startIcon={<DeleteIcon />} color="primary">
                                        Delete
                                    </Button>
                                    <Button onClick={() => handelEdite(Element)} variant="outlined" startIcon={<EditIcon />} color="success">
                                        Edit
                                    </Button>
                                </Box> */}
                                    </Box>
                                </Card>
                            </div>
                        ))}
                    </Box>
                </Card>
                <Button
                    onClick={() => scroll('right')}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        zIndex: 10,
                        backgroundColor: '#001A6E', // Background color
                        color: 'white',             // Text color
                        padding: '10px 1px',
                        margin: "20px",       // Adjust padding
                        borderRadius: '8px',        // Rounded corners
                        fontSize: '16px',           // Font size
                        fontWeight: 'bold',         // Font weight
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow
                        minWidth: "40px",
                        '&:hover': {
                            backgroundColor: '#1281b8',
                        },
                    }}
                >
                    <ChevronRightIcon />
                </Button>
            </main >
            {ShowPackDetails &&
                <Box sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1500 }}>
                    <PackDetails SetShowPackDetails={SetShowPackDetails} details={details} />
                </Box>
            }
        </>

    )
}

export default PackagesSection


