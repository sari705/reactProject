//מברוק
import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const OrderSummary = ({ products }) => {
  const total = products.reduce((sum, item) => sum + item.price * (item.amount || 1), 0);

  let totalAmount = products.reduce((total, prod) => total + (prod.amount || 1), 0);

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
      <Paper sx={{ p: 3, bgcolor: "#FCE8E6" }}>
          {/* <Typography variant="h6" gutterBottom>
              תקציר הזמנה
          </Typography> */}
           <Typography variant="body2">מספר פריטים בהזמנה:{totalAmount}  </Typography>
          {products.map((product) => (
              <Box key={product._id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                 {product.amount>1 && <Typography variant="body2">{product.amount } פריטים :</Typography>}
                  <Typography variant="body2">{product.productName}</Typography>
                  <Typography variant="body2">₪{product.price.toFixed(2)}</Typography>
                 
              </Box>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>
              סה"כ לתשלום: ₪{totalPrice.toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
              מחיר משלוח: ₪{shippingPrice.toFixed(2)}
          </Typography>
      </Paper>
  );
};

export default OrderSummary;
