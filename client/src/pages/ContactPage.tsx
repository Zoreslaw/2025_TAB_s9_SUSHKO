import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Link 
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const ContactPage = () => {
  const infoItems = [
    {
      icon: <MailIcon color="primary" />,
      title: "Email",
      content: "przykladowy@email.com"
    },
    {
      icon: <MapIcon color="primary" />,
      title: "Adres",
      content: "ul. Przykładowa 123, 00-000 Miasto"
    },
    {
      icon: <PhoneIcon color="primary" />,
      title: "Telefon",
      content: "+48 123 456 789"
    },
    {
      icon: <AccessTimeIcon color="primary" />,
      title: "Godziny Otwarcia",
      content: "Pn-Pt: 6-16, Sob: 7-13"
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
        Kontakt
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Masz pytania? <br /> Skontaktuj się z nami!
        </Typography>

        <Grid container spacing={3} sx={{ my: 2 }}>
          {infoItems.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box display="flex" alignItems="flex-start" gap={2}>
                {item.icon}
                <Box>
                  <Typography fontWeight={600}>{item.title}</Typography>
                  <Typography>{item.content}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ borderTop: '1px solid #ccc', pt: 3 }}>
          <Typography fontWeight={600} gutterBottom>
            Nasze Media Społecznościowe
          </Typography>
          <Box display="flex" gap={2}>
            <Link href="#" aria-label="Facebook" color="primary">
              <FacebookIcon />
            </Link>
            <Link href="#" aria-label="Instagram" color="primary">
              <InstagramIcon />
            </Link>
          </Box>
        </Box>
      </Paper>

    <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
            Lokalizacja
        </Typography>
        <Box
            sx={{
            width: '100%',
            height: '400px',
            borderRadius: 2,
            overflow: 'hidden',
            mt: 2
            }}
        >
            <iframe
            title="Mapa"
            width="100%"
            height="100%"
            src="https://www.openstreetmap.org/export/embed.html?bbox=18.6705%2C50.2850%2C18.6845%2C50.2920&layer=mapnik&marker=50.2885%2C18.6775"
            style={{ border: 0 }}
            allowFullScreen
            ></iframe>
        </Box>

        </Box>

    </Container>
  );
};

export default ContactPage;
