import React from "react";
import { Box, Typography, IconButton, Card, CardMedia, CardContent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";

import { removeProduct } from "../features/cartSlice";

function ProductInReducedCart({ product }) {
  const dispatch = useDispatch();
  console.log("product in reduced cart", product);

  return (
    <Card sx={{
      display: "flex",
      alignItems: "center",
      p: 1,
      mb: 1,
      boxShadow: 2,
      borderRadius: 2,
      backgroundColor: "#E9ECF290",
      direction:"rtl"
    }}>
      {/* 🔹 תמונת המוצר */}

      <Box>
        <CardMedia
          component="img"
          image={`/images/${product.images[0]}`}
          alt={product.name}
          sx={{ width: 70, height: 70, borderRadius: 1, objectFit: "contain", ml: 2 }}
        />
        <CardContent sx={{ flexGrow: 1, p: 1 , textAlign: "right"}}>
          <Typography variant="body2" color="text.secondary" sx={{ color: "#590202" }}>
            כמות: {product.amount}
          </Typography>
        </CardContent>
      </Box>

      {/* 🔹 פרטי המוצר */}


      <Box  sx={{direction:"rtl", textAlign: "right"}}>
        <CardContent sx={{ flexGrow: 1, p: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "#590202" }}>
            {product.name}
          </Typography>
        </CardContent>

        {/* 🔹 כפתור מחיקה */}
        <IconButton onClick={() => dispatch(removeProduct(product))} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>


    </Card>
  );
}

export default ProductInReducedCart;
