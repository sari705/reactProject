// // // ReviewOrder.jsx - סקירת ההזמנה
// // import React from "react";
// // import { Button, Typography, Paper } from "@mui/material";

// // function ReviewOrder({ formData, onBack }) {
// //     return (
// //         <Paper sx={{ p: 4 }}>
// //             <Typography variant="h6">פרטי הזמנה</Typography>
// //             <Typography>רחוב: {formData.address}, {formData.city}, {formData.zip}</Typography>
// //             <Typography>מספר כרטיס : {formData.cardNumber}</Typography>
// //             <Typography>תוקף: {formData.expiry}</Typography>
// //             <Typography>CVV: {formData.cvv}</Typography>
// //              </Paper>
// //     );
// // }
// // export default ReviewOrder;

// import React from "react";
// import{useState} from "react";
// import { Button, Typography, Paper, CircularProgress } from "@mui/material";

// export default function ReviewOrder({ addressData, paymentData, onBack, onConfirm }) {

//       const [isSubmitting, setIsSubmitting] = useState(false);


//   return (
//     <Paper sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         סיכום הזמנה
//       </Typography>

//       <Typography>
//         <strong>שם:</strong> {addressData.firstName} {addressData.lastName}
//       </Typography>
//       <Typography>
//         <strong>כתובת:</strong> {addressData.address}, {addressData.city}, {addressData.zip}
//       </Typography>
//       <Typography>
//         <strong>טלפון:</strong> {addressData.phone}
//       </Typography>

//       <Typography sx={{ mt: 2 }}>
//         <strong>מספר כרטיס:</strong> {paymentData.cardNumber}
//       </Typography>
//       <Typography>
//         <strong>תוקף:</strong> {paymentData.expiry}
//       </Typography>
//       <Typography>
//         <strong>CVV:</strong> {paymentData.cvv}
//       </Typography>

//       {/* כפתורי ניווט */}
//       <div style={{ marginTop: 20 }}>
//         <Button variant="text" onClick={onBack}>
//           Back
//         </Button>

//         <Button variant="contained" onClick={onConfirm} sx={{ ml: 2 }} disabled={isSubmitting}>
//           {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Submit Order"}
//         </Button>
//       </div>
//     </Paper>
//   );
// }
import React, { useState } from "react";
import { Button, Typography, Paper, CircularProgress } from "@mui/material";

export default function ReviewOrder({ addressData, paymentData, onBack, onConfirm }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true); // הפעלת הטעינה

    try {
      await onConfirm(); // מחכים לפעולה שתסתיים
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsSubmitting(false); // ביטול מצב טעינה אחרי שהפעולה מסתיימת
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        סיכום הזמנה
      </Typography>

      <Typography>
        <strong>שם:</strong> {addressData.firstName} {addressData.lastName}
      </Typography>
      <Typography>
        <strong>כתובת:</strong> {addressData.address}, {addressData.city}, {addressData.zip}
      </Typography>
      <Typography>
        <strong>טלפון:</strong> {addressData.phone}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        <strong>מספר כרטיס:</strong> {paymentData.cardNumber}
      </Typography>
      <Typography>
        <strong>תוקף:</strong> {paymentData.expiry}
      </Typography>
      <Typography>
        <strong>CVV:</strong> {paymentData.cvv}
      </Typography>

      {/* כפתורי ניווט */}
      <div style={{ marginTop: 20 }}>
        <Button variant="text" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>

        <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }} disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Submit Order"}
        </Button>
      </div>
    </Paper>
  );
}
