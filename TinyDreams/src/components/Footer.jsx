import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Email } from '@mui/icons-material';


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
            backgroundColor: isVisible ? 'rgba(191, 112, 105, 0.8)' : 'transparent',
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
            <Container maxWidth={false} sx={{ width: '100%' }}>
                <Typography variant="body1">&copy; {new Date().getFullYear()} כל הזכויות שמורות</Typography>
            </Container>
            <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=יצירת קשר&body=שלום, אני רוצה לדבר על...`}
                style={{ textDecoration: 'none' }}
                target='_blank'
            >
                <Button
                    variant="contained"
                    color="primary"
                    // endIcon={<Email />}
                    sx={{
                        borderRadius: '20px',
                        padding: '10px 20px',
                        textTransform: 'none',
                        marginTop: '10px',
                        width:"20%",
                        color: "#590202",
                    }}
                > ✉︎ יצירת קשר   
                </Button>
            </a>
        </Box>
    );
};

export default Footer;