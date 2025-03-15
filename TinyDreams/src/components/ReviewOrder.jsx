// ReviewOrder.jsx - סקירת ההזמנה
import React from "react";
import { Button, Typography, Paper } from "@mui/material";

function ReviewOrder({ formData, onBack }) {
    return (
        <Paper sx={{ p: 4 }}>
            <Typography variant="h6">פרטי ההזמנה</Typography>
            {/* <Typography>שם: {formData.firstName} {formData.lastName}</Typography> */}
            <Typography>כתובת: {formData.address}, {formData.city}, {formData.zip}</Typography>
            <Typography>מספר כרטיס: {formData.cardNumber}</Typography>
            <Typography>תוקף: {formData.expiryDate}</Typography>
            <Typography>CVV: {formData.cvv}</Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={onBack}>חזור</Button>
            <Button variant="contained" sx={{ mt: 2, ml: 2 }}>בצע הזמנה</Button>
        </Paper>
    );
}
export default ReviewOrder;
