import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Email } from '@mui/icons-material';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';


const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const emailAddress = "tinydreams46@gmail.com"

    useEffect(() => {
        const handleScroll = () => {
            const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
            setIsVisible(scrolledToBottom);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Box component="footer" sx={{
            // backgroundColor: isVisible ? 'rgba(191, 112, 105, 0.8)' : 'transparent',
            backgroundColor: isVisible ? '#c5807a' : 'transparent',
            color: isVisible ? 'white' : 'transparent',
            py: 2,
            textAlign: 'center',
            position: 'sticky',
            bottom: 0,
            right: 0,
            width: '100vw',
            transition: 'background-color 0.5s, color 0.5s',
            visibility: isVisible ? 'visible' : 'hidden',
            minHeight: '60px'
        }}>
            {/*     <Box component="footer" sx={{
            backgroundColor: isVisible ? 'rgba(191, 112, 105)' : 'transparent',
            color: isVisible ? '#590202' : 'transparent',
            py: 2,
            textAlign: 'center',
            position: 'sticky',
            bottom: 0,
            right: 0,
            width: '100vw',
            transition: 'background-color 0.5s, color 0.5s',
            visibility: isVisible ? 'visible' : 'hidden',
            minHeight: '60px',
            borderTop: "2px solid #590202" 
        }}> */}
            <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=יצירת קשר&body=שלום, אני רוצה לדבר על...`}
                style={{ textDecoration: 'none', marginRight: "0vw" }}
                target='_blank'
            >
                <Button
                    variant="contained"
                    color="primary"
                    // endIcon={<Email />}
                    sx={{
                        marginRight: "0vw",
                        borderRadius: '20px',
                        padding: '10px 20px',
                        textTransform: 'none',
                        marginTop: '10px',
                        width: "20%",
                        color: "#590202",
                    }}
                > ✉︎ יצירת קשר
                </Button>
            </a>
            {/* <Container>
            <Typography sx={{display:"flex", flexDirection:"row"}}>
                <PhoneEnabledIcon />
                053-416-5836
            </Typography></Container> */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mt: 2 }}>
                <PhoneEnabledIcon />
                <Typography variant="body1">053-416-5836</Typography>
            </Box>
            <div><p>הסניפים שלנו : בני- ברק | אשדוד | פתח-תקווה | תל-אביב | ירושלים</p> </div>
            <Container maxWidth={false} sx={{ width: '100%' }}>
                <Typography variant="body1">&copy; {new Date().getFullYear()}  כל הזכויות שמורות TinyDreams.</Typography>
            </Container>
        </Box>

    );
};

export default Footer;
