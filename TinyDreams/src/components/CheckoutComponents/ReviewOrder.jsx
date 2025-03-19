// ReviewOrder.jsx - סקירת ההזמנה
import React from "react";
import { Button, Typography, Paper } from "@mui/material";

function ReviewOrder({ formData, onBack }) {
    return (
        <Paper sx={{ p: 4 }}>
            <Typography variant="h6">פרטי הזמנה</Typography>
            <Typography>רחוב: {formData.address}, {formData.city}, {formData.zip}</Typography>
            <Typography>מספר כרטיס : {formData.cardNumber}</Typography>
            <Typography>תוקף: {formData.expiry}</Typography>
            <Typography>CVV: {formData.cvv}</Typography>
             </Paper>
    );
}
export default ReviewOrder;
