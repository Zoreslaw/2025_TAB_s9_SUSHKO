import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#1e1e1e", color: "#ccc", py: 6 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                MieszkaMy.pl
              </Typography>
              <Typography variant="body2">
                Profesjonalne zarządzanie nieruchomościami
              </Typography>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                Nawigacja
              </Typography>
              <Link to="/" style={{ color: "#ccc", textDecoration: "none", display: "block", marginBottom: "0.25rem" }}>
                Strona główna
              </Link>
              <Link to="/kontakt" style={{ color: "#ccc", textDecoration: "none", display: "block", marginBottom: "0.25rem" }}>
                Kontakt
              </Link>
              <Link to="/dashboard" style={{ color: "#ccc", textDecoration: "none", display: "block", marginBottom: "0.25rem" }}>
                Dashboard
              </Link>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                Kontakt
              </Typography>
              <Typography variant="body2">📍 ul. Przykładowa 123, 00-000 Miasto</Typography>
              <Typography variant="body2">📞 +48 123 456 789</Typography>
              <Typography variant="body2">📧 przykladowy@email.com</Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                Informacje
              </Typography>
              <Link to="/polityka-prywatnosci" style={{ color: "#ccc", textDecoration: "none", display: "block", marginBottom: "0.25rem" }}>
                Polityka prywatności
              </Link>
              <Link to="/regulamin" style={{ color: "#ccc", textDecoration: "none", display: "block" }}>
                Regulamin
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
  );
}
