// import { useDispatch, useSelector } from "react-redux";
// import { updateAmount, removeProduct, addToCart } from "../features/cartSlice";

// function ProductInReducedCart(props) {
//     const { product } = props
//     return (
//         <>
//             <h2>{product.name}</h2>
//             <img src={`/images/${product.images[0]}`} alt={product.images[0]}></img>
//             <h2>amount: {product.amount}</h2>
//         </>
//     );
// }

// export default ProductInReducedCart;

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
      backgroundColor: "#f9f9f9"
    }}>
      {/* 🔹 תמונת המוצר */}
      <CardMedia
        component="img"
        image={`/images/${product.images[0]}`}
        alt={product.name}
        sx={{ width: 70, height: 70, borderRadius: 1, objectFit: "contain", mr: 2 }}
      />

      {/* 🔹 פרטי המוצר */}
      <CardContent sx={{ flexGrow: 1, p: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          כמות: {product.amount}
        </Typography>
      </CardContent>

      {/* 🔹 כפתור מחיקה */}
      <IconButton onClick={() => dispatch(removeProduct(product))} color="error">
        <DeleteIcon />
      </IconButton>
    </Card>
  );
}

export default ProductInReducedCart;
