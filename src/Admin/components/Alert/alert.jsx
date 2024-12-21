import React from "react";
import { Box, Typography, Button, Card, CardContent, IconButton } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber"; // Icône d'avertissement
import CloseIcon from "@mui/icons-material/Close"; // Icône de fermeture

const PhotoshopAlert = ({ message, onClose, onDelete, productid }) => {
  return (
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
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Fond semi-transparent
        zIndex: 1300,
      }}
    >
      <Card
        sx={{
          width: "400px",
          padding: "16px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
          border: "1px solid #333",
          backgroundColor: "#eaeaea", // Fond similaire à Photoshop
        }}
      >
        <CardContent sx={{ position: "relative" }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#666",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginBottom: 2,
            }}
          >
            <WarningAmberIcon sx={{ fontSize: 36, color: "#ff9900" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#333",
                textAlign: "left",
              }}
            >
              Attention
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{ color: "#333", textAlign: "left", marginBottom: 2 }}
          >
            {message || "Un problème a été détecté. Veuillez vérifier votre action."}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0066cc",
                "&:hover": {
                  backgroundColor: "#005bb5",
                },
              }}
              onClick={() => { onDelete(productid); onClose() }}
            >
              OK
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PhotoshopAlert;
