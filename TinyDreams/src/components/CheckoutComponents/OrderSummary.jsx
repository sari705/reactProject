import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const OrderSummary = ({ products }) => {
  const total = products.reduce((sum, item) => sum + item.price * (item.amount || 1), 0);

  // חישוב מחיר המשלוח
  let shippingPrice;
  if (total > 200) {
    shippingPrice = 0;
  } else if (total >= 100) {
    shippingPrice = 15;
  } else {
    shippingPrice = 30;
  }

  // חישוב סה"כ כולל משלוח
  const totalPrice = total + shippingPrice;

  return (
    <Paper sx={{ width: "92.5%", height: "100%", p: 4, bgcolor: "#FCE8E6", }}>
      <Typography variant="h5" gutterBottom sx={{fontWeight: "bold", textAlign: "center", width: "100%", padding:"3px", marginBottom:"35px" ,paddingTop:"200px"}}>
       תקציר הזמנה
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        מספר פריטים בהזמנה
      </Typography>
      {products.map((product) => (
        <Box key={product._id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          {product.amount > 1 && <Typography variant="body2">{product.amount} פריטים:</Typography>}
          <Typography variant="body2">{product.productName}</Typography>
          <Typography variant="body2">₪{product.price.toFixed(2)}</Typography>
        </Box>
      ))}
      <Box sx={{ borderTop: "1px solid #ddd", mt: 2, pt: 2 }}> 

          <Typography variant="body2" sx={{ mt: 1 }}>
          מחיר משלוח: ₪{shippingPrice.toFixed(2)}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", paddingTop:"10px" }}>
          סה"כ לתשלום: ₪{totalPrice.toFixed(2)}
        </Typography>
     
      </Box>
    </Paper>
  );
};

export default OrderSummary;
