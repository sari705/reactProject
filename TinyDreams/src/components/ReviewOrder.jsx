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
            <Button variant="outlined" sx={{ mt: 2 }} onClick={onBack}>חזור</Button>
            <Button variant="contained" sx={{ mt: 2, ml: 2 }}>בצע הזמנה</Button>
        </Paper>
    );
}
export default ReviewOrder;
