// import React from "react";
// import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// // 🎨 צבעי האתר שלך
// const themeColors = {
//   background: "#E9ECF2",
//   textPrimary: "#590202",
//   cardBg: "#FFFFFF",
//   buttonBg: "#BF7069",
//   buttonHover: "#D9B1A3",
// };

// // ✨ עיצוב כפתור עם אנימציה
// const AnimatedButton = styled(motion(Button))({
//   backgroundColor: themeColors.buttonBg,
//   color: "#fff",
//   fontSize: "1.2rem",
//   fontWeight: "bold",
//   borderRadius: "30px",
//   padding: "12px 24px",
//   "&:hover": {
//     backgroundColor: themeColors.buttonHover,
//   },
// });

// // 🏆 רשימת קטגוריות / מוצרים מומלצים
// const categories = [
//   { title: "מטפחות אלגנטיות", image: "https://source.unsplash.com/400x300/?fashion" },
//   { title: "כיסויי ראש בסטייל", image: "https://source.unsplash.com/400x300/?style" },
//   { title: "אביזרים משלימים", image: "https://source.unsplash.com/400x300/?accessories" },
// ];

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ backgroundColor: themeColors.background, minHeight: "100vh", paddingBottom: "5rem" }}>
//       {/* Hero Section */}
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         sx={{
//           textAlign: "center",
//           padding: "5rem 2rem",
//           background: `linear-gradient(135deg, #BF7069, #D9B1A3)`,
//           color: "#fff",
//           borderRadius: "0 0 50px 50px",
//         }}
//       >
//         <Typography variant="h2" fontWeight="bold">
//           ברוכה הבאה ל- Airy Beauty ✨
//         </Typography>
//         <Typography variant="h5" mt={2}>
//           המטפחות הכי יפות ומודרניות מחכות לך כאן!
//         </Typography>
//         <AnimatedButton
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           sx={{ mt: 3 }}
//           onClick={() => navigate("/products")}
//         >
//           גלי את הקולקציה
//         </AnimatedButton>
//       </Box>

//       {/* כרטיסים של קטגוריות / מוצרים מומלצים */}
//       <Container sx={{ mt: 5 }}>
//         <Typography variant="h4" textAlign="center" fontWeight="bold" color={themeColors.textPrimary} mb={3}>
//           הקטגוריות הכי חמות 🔥
//         </Typography>
//         <Grid container spacing={3} justifyContent="center">
//           {categories.map((category, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card
//                 component={motion.div}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 sx={{ boxShadow: 4, borderRadius: "15px", overflow: "hidden" }}
//               >
//                 <CardMedia component="img" height="200" image={category.image} alt={category.title} />
//                 <CardContent sx={{ backgroundColor: themeColors.cardBg }}>
//                   <Typography variant="h6" fontWeight="bold" color={themeColors.textPrimary}>
//                     {category.title}
//                   </Typography>
//                   <Button
//                     sx={{
//                       mt: 1,
//                       color: themeColors.buttonBg,
//                       fontWeight: "bold",
//                       "&:hover": { color: themeColors.buttonHover },
//                     }}
//                     onClick={() => navigate("/products")}
//                   >
//                     גלי עוד →
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }


import React from "react";
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SwingingImage from "../components/SwingingImage";

// 🎨 צבעים רכים שמתאימים למותג
const themeColors = {
  background: "#FCE8E6",
  textPrimary: "#590202",
  cardBg: "#FFFFFF",
  buttonBg: "#BF7069",
  buttonHover: "#D9B1A3",
};

// ✨ עיצוב כפתור עם אנימציות
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

// 🍼 קטגוריות מוצרים בחנות התינוקות
const categories = [
  { title: "בגדי תינוקות", image: "/images/clothes3.jpg" },
  { title: "צעצועים חינוכיים", image: "/images/toys5.jpg" },
  { title: "מוצרי אוכל", image: "/images/food3.jpg" },
];

export default function Home() {
  const navigate = useNavigate();

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
