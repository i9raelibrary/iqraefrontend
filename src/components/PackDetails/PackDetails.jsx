import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import PackProductList from "./PackDetailsTable";
// import { green } from "@mui/material/colors";
import { useCreateCommandPackageMutation } from "../../services/CommandePackApi";
import { useFindCurrentClientMutation } from "../../services/ClientApi.js";
import { toast } from "react-toastify";

const mockOrder = {
  id: 1,
  products: [
    { id: 1, name: "Product 1", quantity: 2, price: 29.99 },
    { id: 2, name: "Product 2", quantity: 1, price: 49.99 },
  ],
  customer: {
    id: 1,
    name: "Mohammed Amine",
    phone: "0655271839",
    email: "Mohammed@example.com",
    address: "Bloc c zoigha",
  },
  totalPrice: 109.97,
  status: "pending",
  date: "2024-03-15",
};

const PackDetails = ({ SetShowPackDetails, details }) => {
  const [createCommand, { isLoading, isSuccess, isError, error }] =
    useCreateCommandPackageMutation();
  const [findCurrentClient, { isLoading: loading }] =
    useFindCurrentClientMutation();
  const [userInfo, setUserInfo] = useState({
    email: "",
    prenom: "",
    nom: "",
    telephone: "",
    address: "",
  });
  // const [order, setOrder] = useState(mockOrder);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem("ClientToken");
        const user = await findCurrentClient({ id }).unwrap();
        setUserInfo({
          email: user.email,
          prenom: user.prenom,
          nom: user.nom,
          telephone: user.contact,
          address: user.adresse,
        });

        console.log(userInfo);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const HandleSendCommand = async (packId) => {
    if (!userInfo) {
      console.error("No user data available");
      return;
    }

    const resultat = await createCommand({ packInfo: { userInfo, packId } });
    console.log(resultat);
    if (resultat.success) {
      toast.success(resultat.message);
    } else {
      toast.error(resultat.message);
    }
    SetShowPackDetails(false);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "95%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        minHeight: "100vh",
        position: "fixed",

        py: 4,
        px: { xs: 0, sm: 4 },
      }}
    >
      <Box sx={{ width: { xs: "90%", sm: "98%" }, maxWidth: 1200, mx: "auto" }}>
        <Card sx={{ padding: "0 10px", borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ mb: 2 }}>
              {/* Header Section */}
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={1} sm={6}>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    {details.pack.nom}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  textAlign={{ xs: "left", sm: "right" }}
                >
                  <Typography variant="body2" color="red">
                    ancien Prix : {details.pack.oldPrix} MAD
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Product List */}

            <PackProductList products={details.produits} />

            {/* Divider */}
            <Divider sx={{ my: 1 }} />

            {/* Total Price Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Button
                  sx={{ margin: "0 5px 0 0" }}
                  variant="outlined"
                  onClick={() => SetShowPackDetails(false)}
                >
                  Close
                </Button>
                <Button
                  sx={{
                    margin: "0 5px 0 0",
                    color: "white",
                    backgroundColor: "green",
                  }}
                  variant="outlined"
                  onClick={() =>
                    HandleSendCommand(details.pack.id, details.pack.prixTotal)
                  }
                >
                  Commander
                </Button>
              </Box>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Total: {details.pack.prixTotal} MAD
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default PackDetails;
