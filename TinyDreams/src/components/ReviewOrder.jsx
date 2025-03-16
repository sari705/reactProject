// ReviewOrder.jsx - סקירת ההזמנה
import React from "react";
import { Button, Typography, Paper } from "@mui/material";

function ReviewOrder({ formData, onBack }) {
    return (
        <Paper sx={{ p: 4 }}>
            <Typography variant="h6">order details</Typography>
            {/* <Typography>שם: {formData.firstName} {formData.lastName}</Typography> */}
            <Typography>adress: {formData.address}, {formData.city}, {formData.zip}</Typography>
            <Typography>card number : {formData.cardNumber}</Typography>
            <Typography>expiry: {formData.expiry}</Typography>
            <Typography>CVV: {formData.cvv}</Typography>
             </Paper>
    );
}
export default ReviewOrder;
