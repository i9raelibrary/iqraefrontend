import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useFindCurrentClientMutation, useUpdateClientInformationsMutation } from "../../../services/ClientApi.js";
import { toast } from 'react-toastify';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Profile.css";

const Profile = () => {
    const [findCurrentClient, { isLoading }] = useFindCurrentClientMutation();
    const [updateClientInfos, {isFetching}] = useUpdateClientInformationsMutation();
    const id = localStorage.getItem("ClientToken");
    const [profileData, setProfileData] = useState({
        nom: "",
        prenom: "",
        contact: "",
        email: "",
        adresse: "",
    });

    const [loadingData, setLoadingData] = useState(true);

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!id) throw new Error("ClientToken is missing");
                const user = await findCurrentClient({ id }).unwrap();
                setProfileData({
                    nom: user.nom || "",
                    prenom: user.prenom || "",
                    contact: user.contact || "",
                    email: user.email || "",
                    adresse: user.adresse || "",
                });
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                alert("An error occurred while fetching your profile.");
            } finally {
                setLoadingData(false);
            }
        };
        fetchUserData();
    }, [findCurrentClient]);

    const handleSubmit = async () => {
        try {
            const result = await updateClientInfos(profileData).unwrap();
            console.log(result);
            if (result.success) {
              toast.success(result.message);
            } else {
              toast.error(result.message);
            }
        } catch (error) {
            console.error("Failed to submit user info:", error);
        }
        
    };

    if (loadingData || isLoading || isFetching) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
                <CircularProgress />
            </div>
        );
    }
    return (
        <div className="main-content position-relative max-height-vh-100 h-100">
            <div className="container-fluid px-2 px-md-4">
                <div
                    className="page-header min-height-300 border-radius-xl mt-4"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1732540988407-1f38cf012f0a?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    }}
                >
                    <span className="mask bg-gradient-dark opacity-6"></span>
                </div>
                <div className="card card-body mx-2 mx-md-2 mt-n6">
                    <div className="row gx-4 mb-2">
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
                                <h5 className="mb-1">
                                    {profileData.nom
                                        ? `${profileData.nom}`
                                        : "Loading..."}
                                </h5>
                                <p className="mb-0 font-weight-normal text-sm">
                                    {profileData.prenom
                                        ? `${profileData.prenom}`
                                        : "Loading..."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-xl-4">
                                <div className="card card-plain h-100">
                                    <div className="card-header pb-0 p-3">
                                        <h6 className="mb-0">Profile Information</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <p className="text-sm">
                                            Hi,{profileData.nom && profileData.prenom
                                                ? `${profileData.nom} ${profileData.prenom}`
                                                : "Loading..."}.
                                            welcome to you space!
                                        </p>
                                        <hr className="horizontal gray-light my-4" />
                                        <Box sx={{ width: '100%' }}>
                                            <Box
                                                sx={{
                                                    maxWidth: 500,
                                                    margin: 'auto',
                                                    padding: 3,
                                                    backgroundColor: '#fff',
                                                }}
                                            >
                                                <Typography variant="h5" align="center" sx={{ margin: "1rem 0" }}>
                                                    Update password
                                                </Typography>
                                                <form>
                                                    <TextField
                                                        label="New password"
                                                        variant="outlined"
                                                        fullWidth
                                                        sx={{ marginBottom: 2 }}
                                                        value=""
                                                    />
                                                    <TextField
                                                        label="Confirm Password"
                                                        variant="outlined"
                                                        fullWidth
                                                        sx={{ marginBottom: 2 }}
                                                        value=""
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            textTransform: 'none',
                                                            backgroundColor: '#005A8B',
                                                        }}
                                                    >
                                                        Update
                                                    </Button>
                                                </form>
                                            </Box>
                                        </Box>
                                    </div>
                                </div>
                            </div>

                            {/* user info */}
                            <div className="col-12 col-xl-4">
                                <Box sx={{ width: '100%' }}>
                                    <Box
                                        sx={{
                                            maxWidth: 500,
                                            margin: 'auto',
                                            padding: 3,
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        <Typography variant="h5" align="center" sx={{ margin: "1rem 0" }}>
                                            Saisir vos informations
                                        </Typography>
                                        <form>
                                            <TextField
                                                label="Prenom"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ marginBottom: 2 }}
                                                value={profileData.prenom}
                                                onChange={(e) =>
                                                    setProfileData({ ...profileData, prenom: e.target.value })
                                                }
                                            />
                                            <TextField
                                                label="Nom"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ marginBottom: 2 }}
                                                value={profileData.nom}
                                                onChange={(e) =>
                                                    setProfileData({ ...profileData, nom: e.target.value })
                                                }
                                            />
                                            <TextField
                                                label="Email"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ marginBottom: 2 }}
                                                value={profileData.email}
                                                onChange={(e) =>
                                                    setProfileData({ ...profileData, email: e.target.value })
                                                }
                                            />
                                            <TextField
                                                label="Numero Telephone"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ marginBottom: 2 }}
                                                value={profileData.contact}
                                                onChange={(e) =>
                                                    setProfileData({ ...profileData, contact: e.target.value })
                                                }
                                            />
                                            <TextField
                                                label="Adresse"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ marginBottom: 2 }}
                                                value={profileData.adresse}
                                                onChange={(e) =>
                                                    setProfileData({ ...profileData, adresse: e.target.value })
                                                }
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                sx={{
                                                    marginTop: 1,
                                                    padding: "0.3rem",
                                                    fontSize: "16px",
                                                    fontWeight: "bold",
                                                    textTransform: "none",
                                                    borderRadius: "30px",
                                                    backgroundColor: "#005A8B",
                                                }}
                                                onClick={handleSubmit}
                                            >
                                                Update
                                            </Button>
                                        </form>
                                    </Box>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;