import React from "react";
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SwingingImage from "../components/SwingingImage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchGoogleUser } from "../utils/fetchData";

const themeColors = {
  background: "#FCE8E6",
  textPrimary: "#590202",
  cardBg: "#FFFFFF",
  buttonBg: "#BF7069",
  buttonHover: "#D9B1A3",
};

const AnimatedButton = styled(motion(Button))({
  backgroundColor: themeColors.buttonBg,
  color: "#fff",
  fontSize: "1.2rem",
  fontWeight: "bold",
  borderRadius: "30px",
  padding: "12px 24px",
  "&:hover": {
    backgroundColor: themeColors.buttonHover,
  },
});

const categories = [
  { title: "בגדי תינוקות", image: "/images/clothes3.jpg" },
  { title: "צעצועים חינוכיים", image: "/images/toys5.jpg" },
  { title: "מוצרי אוכל", image: "/images/food3.jpg" },
];

export default function Home() {
  const navigate = useNavigate();
  const dispatch  = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      fetchGoogleUser(dispatch, navigate, tokenFromUrl);
    }
  }, [dispatch, navigate, location.search]);

  return (
    <Box sx={{ backgroundColor: themeColors.background, minHeight: "100vh", paddingBottom: "5rem" }}>

      {/* Hero Section עם אנימציות */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        sx={{
          textAlign: "center",
          padding: "5rem 2rem",
          background: `linear-gradient(135deg, #FFD3C2, #FFC4B3)`,
          color: "#fff",
          borderRadius: "0 0 50px 50px",

        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <Typography variant="h2" fontWeight="bold">
            ברוכים הבאים ל- Tiny Dreams 🍼✨
          </Typography>
          <SwingingImage></SwingingImage>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Typography variant="h5" mt={2}>
            כל מה שהתינוק שלך צריך במקום אחד!
          </Typography>
        </motion.div>

        <AnimatedButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          sx={{ mt: 3 }}
          onClick={() => navigate("/products")}
        >
          גלי את הקולקציה
        </AnimatedButton>
      </Box>

      {/* קטגוריות מוצרים עם אפקט הופעה */}
      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color={themeColors.textPrimary}
          mb={3}
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          קטגוריות מוצרים 🍼👶
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                sx={{ boxShadow: 4, borderRadius: "15px", overflow: "hidden" }}
              >
                <CardMedia component="img" height="200" image={category.image} alt={category.title} />
                <CardContent sx={{ backgroundColor: themeColors.cardBg }}>
                  <Typography variant="h6" fontWeight="bold" color={themeColors.textPrimary}>
                    {category.title}
                  </Typography>
                  <Button
                    sx={{
                      mt: 1,
                      color: themeColors.buttonBg,
                      fontWeight: "bold",
                      "&:hover": { color: themeColors.buttonHover },
                    }}
                    onClick={() => navigate("/products")}
                  >
                    גלו עוד →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    </Box>
  );
}
