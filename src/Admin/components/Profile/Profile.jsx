import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Profile.css'
import { useFetchAdminQuery } from '../../../services/AdminApi';
import { useGetCommandesQuery } from '../../../services/CommandeApi';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Profile = () => {

    const [value, setValue] = useState(0);
    const [profiledata, SetProfileData] = useState({});
    const [Allcmd, SetAllcmd] = useState([]);
    const [command, Setcommand] = useState({});
    const { data: adminData, isLoading: isAdminLoading } = useFetchAdminQuery();
    const { data: commandesData, isFetching: isCommandesFetching } = useGetCommandesQuery();

    useEffect(() => {
        if (adminData) {
            SetProfileData(adminData);
        }

        if (!isCommandesFetching && commandesData) {
            // commandesData.data.map((item, key) => {
            //     Setcommand(item);
            //     SetAllcmd((prev) => ([...prev, command]));
            // })
            console.log("Allcommandes", commandesData.data);

        } else {
            console.log("Data is not yet fetched or still loading");
        }
    }, [adminData, commandesData, isCommandesFetching]);





    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const profileData = {
        fullName: "Si Yassir",
        mobile: "+212 60 02 02-54",
        email: "IqraeLib@mail.com",
        location: "MORROCO",
        socialLinks: {
            facebook: "https://facebook.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com"
        }
    };

    // Commande CF avec 10 noms différents et un id pour chaque élément
    const commandCF = [
        { id: 1, nome: "Youssef Lamranie" },
        { id: 2, nome: "Ahmed Benali" },
        { id: 3, nome: "Sara El Mansouri" },
        { id: 4, nome: "Khalid Tazi" },
        { id: 5, nome: "Meryem El Khadiri" },
        { id: 6, nome: "Omar Boukhris" },
        { id: 7, nome: "Amine Houssni" },
        { id: 8, nome: "Hassan Ait Ali" },
        { id: 9, nome: "Zineb Belkadi" },
        { id: 10, nome: "Fatiha Faridi" }
    ];

    // Commande RF avec 10 noms différents et un id pour chaque élément
    const commandRF = [
        { id: 1, nome: "Rachid El Amrani" },
        { id: 2, nome: "Nadia Oufkir" },
        { id: 3, nome: "Ismail Rachid" },
        { id: 4, nome: "Fatima Zahra Ait Oujdir" },
        { id: 5, nome: "Salim Boudhar" },
        { id: 6, nome: "Hakim Kadiri" },
        { id: 7, nome: "Laila Benhaddou" },
        { id: 8, nome: "Mustapha El Khamlichi" },
        { id: 9, nome: "Hicham Tazi" },
        { id: 10, nome: "Karim Saidi" }
    ];

    // Commande EA avec 10 noms différents et un id pour chaque élément
    const commandEA = [
        { id: 1, nome: "Khalid Ait Laachir" },
        { id: 2, nome: "Amina Lahmar" },
        { id: 3, nome: "Mehdi Ouhadj" },
        { id: 4, nome: "Mouna Fadli" },
        { id: 5, nome: "Abdelhakim Zaari" },
        { id: 6, nome: "Sofia Chafai" },
        { id: 7, nome: "Mohammed Ennaimi" },
        { id: 8, nome: "Imane Bouzidi" },
        { id: 9, nome: "Walid Rami" },
        { id: 10, nome: "Rania Lahlou" }
    ];



    return (
        <div className="main-content position-relative max-height-vh-100 h-100">
            <div className="container-fluid px-2 px-md-4">
                <div className="page-header min-height-300 border-radius-xl mt-4"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`
                    }}
                >
                    <span className="mask bg-gradient-dark opacity-6"></span>
                </div>
                <div className="card card-body mx-2 mx-md-2 mt-n6 ">
                    <div className="row gx-4 mb-2 ">
                        <div className="col-auto">
                            <div className="avatar avatar-xl position-relative">
                                <img
                                    src="https://img.freepik.com/photos-gratuite/jeune-homme-portant-tenue-bleue-regardant-heureux_1298-197.jpg?t=st=1731714801~exp=1731718401~hmac=557ffff2021236f7b3c37493110c16f7b452bb4b11da9051cbd0e74abf435f9b&w=740"
                                    alt="profile_image"
                                    className="w-100 border-radius-lg shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="col-auto my-auto">
                            <div className="h-100">
                                <h5 className="mb-1">{profiledata.nom ? `${profiledata.nom} ${profiledata.prenom}` : "Loading..."}</h5>
                                <p className="mb-0 font-weight-normal text-sm">Bibliotheque</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-xl-4">
                                <div className="card card-plain h-100">
                                    <div className="card-header pb-0 p-3">
                                        <div className="row">
                                            <div className="col-md-8 d-flex align-items-center">
                                                <h6 className="mb-0">Profile Information</h6>
                                            </div>
                                            <div className="col-md-4 text-end">
                                                <a href="javascript:;">
                                                    <i className="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-3">
                                        <p className="text-sm">
                                            Hi, I’m {profiledata.nom ? `${profiledata.nom} ${profiledata.prenom}` : "Loading..."}. I'm the owner of an online bookstore that offers a wide range of products, from physical books to various book-related accessories. The website serves as a platform where customers can explore and purchase books in different genres ...).
                                        </p>
                                        <hr className="horizontal gray-light my-4" />
                                        <ul className="list-group">
                                            <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">Full Name:</strong> &nbsp; {profiledata.nom ? `${profiledata.nom} ${profiledata.prenom}` : "Loading..."}</li>
                                            <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Mobile:</strong> &nbsp; {profiledata.contact ? `${profiledata.contact}` : "Loading..."}</li>
                                            <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Email:</strong> &nbsp; {profiledata.email ? `${profiledata.email}` : "Loading..."}</li>
                                            <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Location:</strong> &nbsp; {profiledata.adresse ? `${profiledata.adresse}` : "Loading..."}</li>
                                            <li className="list-group-item border-0 ps-0 pb-0">
                                                <strong className="text-dark text-sm">Social:</strong> &nbsp;
                                                <a className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href={profileData.socialLinks.facebook}>
                                                    <i className="fab fa-facebook fa-lg"></i>
                                                </a>
                                                <a className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href={profileData.socialLinks.twitter}>
                                                    <i className="fab fa-twitter fa-lg"></i>
                                                </a>
                                                <a className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href={profileData.socialLinks.instagram}>
                                                    <i className="fab fa-instagram fa-lg"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-4">
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="CMD ACPT" {...a11yProps(0)} />
                                            <Tab label="CMD RFS" {...a11yProps(1)} />
                                            <Tab label="CMD ENAT" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                    <CustomTabPanel value={value} index={0}>
                                        <ul className="list-group">
                                            {commandesData?.data.filter((element) => element.status === "validé") // Filter elements with status "validated"
                                                .slice(0, 6) // Limit to 10 elements
                                                .map((element) => (
                                                    <li
                                                        key={element.id}
                                                        className="list-group-item border-0 d-flex align-items-center px-0 mb-2 pt-0"
                                                    >
                                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm">{element.client.nom} {element.client.prenom}</h6>
                                                            <p className="mb-0 text-xs">reçu le produit</p>
                                                        </div>
                                                        <a
                                                            className="btn text-success pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto"
                                                        >
                                                            Info
                                                        </a>
                                                    </li>
                                                ))}
                                        </ul>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={1}>
                                        <ul className="list-group">
                                            {commandesData?.data
                                                .filter((element) => element.status === "refusé") // Filter elements with status "validated"
                                                .slice(0, 6) // Limit to 10 elements
                                                .map((element) => (
                                                    <li
                                                        key={element.id}
                                                        className="list-group-item border-0 d-flex align-items-center px-0 mb-2 pt-0"
                                                    >
                                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm">{element.client.nom} {element.client.prenom}</h6>
                                                            <p className="mb-0 text-xs">refusé</p>
                                                        </div>
                                                        <a
                                                            className="btn text-danger pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto"
                                                        >
                                                            Info
                                                        </a>
                                                    </li>
                                                ))}
                                        </ul>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={2}>
                                        <ul className="list-group">
                                            {commandesData?.data
                                                .filter((element) => element.status === "En attente") // Filter elements with status "validated"
                                                .slice(0, 6) // Limit to 10 elements
                                                .map((element) => (
                                                    <li
                                                        key={element.id}
                                                        className="list-group-item border-0 d-flex align-items-center px-0 mb-2 pt-0"
                                                    >
                                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm">{element.client.nom} {element.client.prenom}</h6>
                                                            <p className="mb-0 text-xs">En attente</p>
                                                        </div>
                                                        <a
                                                            className="btn text-info pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto"
                                                        >
                                                            Info
                                                        </a>
                                                    </li>
                                                ))}
                                        </ul>
                                    </CustomTabPanel>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
