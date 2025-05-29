import React from "react";
import { Container, Typography, Button, Grid, Card, CardContent, Box } from "@mui/material";
import ApartmentIcon from '@mui/icons-material/Apartment';
import HandymanIcon from '@mui/icons-material/Handyman';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <Box
        sx={{
          position: 'relative',
          backgroundImage: 'url(/images/homepageimage.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 2
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1
          }}
        />

        {/* Texts */}
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" sx={{ color: '#f5f5dc', fontWeight: 'bold', mb: 2}}>
            MieszkaMy.pl
          </Typography>
          <Typography variant="h3" sx={{ color: '#3484ed', fontWeight: 'bold', mb: 2 }}>
            Profesjonalne zarządzanie nieruchomościami
          </Typography>
          <Typography variant="h6" sx={{ color: '#d4af37', mb: 3}}>
            Zadbamy o Twój budynek, mieszkańców i finanse
          </Typography>
        </Box>
      </Box>

      <Container sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom align="center">Nasze usługi</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <ApartmentIcon fontSize="large" color="primary" />
                <Typography variant="h6">Zarządzanie budynkami</Typography>
                <Typography>Kompleksowa administracja i meldunki mieszkańców.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <AttachMoneyIcon fontSize="large" color="primary" />
                <Typography variant="h6">Obsługa płatności</Typography>
                <Typography>Kontrola należności i raportowanie finansowe.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <HandymanIcon fontSize="large" color="primary" />
                <Typography variant="h6">Naprawy i remonty</Typography>
                <Typography>Zgłoszenia usterek i koordynacja wykonawców.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <PeopleIcon fontSize="large" color="primary" />
                <Typography variant="h6">Wsparcie mieszkańców</Typography>
                <Typography>Kontakt, komunikacja i transparentność usług.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: '#f5f5f5', py: 6 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>Dlaczego my?</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} md={3}>
              <Typography variant="h3" align="center">12</Typography>
              <Typography align="center">Zarządzanych budynków</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" align="center">350</Typography>
              <Typography align="center">Zadowolonych mieszkańców</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" align="center">98%</Typography>
              <Typography align="center">Usterek usuniętych w 72h</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" align="center">10</Typography>
              <Typography align="center">Lat doświadczenia</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ p: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Masz pytania?</Typography>
        <Typography variant="body1" gutterBottom>Skontaktuj się z nami - chętnie pomożemy!</Typography>
        <Button
          component={Link}
          to="/kontakt"
          variant="contained"
          size="large"
        >
          Kontant
        </Button>
      </Box>
    </div>
  );
}
