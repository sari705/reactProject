import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Typography } from "@mui/material";

const PaymentForm = ({ onNext, onChange, formData, setFormData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data Before Sending:", data); // ✅ בדיקה אם הנתונים מגיעים
    onNext(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`📝 Updating ${name}:`, value);
    if (onChange) {
      onChange(name, value); // מעדכן את הנתונים בזמן אמת
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">פרטי תשלום</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="מספר כרטיס אשראי" {...register("cardNumber"
          , { required: "שדה חובה", pattern: { value: /^[0-9]{16}$/, message: "מספר כרטיס לא תקין" } }
        )}
            error={!!errors.cardNumber} helperText={errors.cardNumber?.message} onChange={handleChange} // עדכון בזמן אמת
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="תוקף (MM/YY)" {...register("expiry"
          ,{ required: "שדה חובה" }
        )} error={!!errors.expiry} helperText={errors.expiry?.message} onChange={handleChange} // עדכון בזמן אמת
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="CVV" {...register("cvv"
          , { required: "שדה חובה", pattern: { value: /^[0-9]{3,4}$/, message: "CVV לא תקין" } }
        )}
            error={!!errors.cvv} helperText={errors.cvv?.message} onChange={handleChange} // עדכון בזמן אמת
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PaymentForm;
//אחרון מ גי פיטי לא עובד להמשיך לדבר איתו
// import React, { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { TextField, Button, Grid, Typography } from "@mui/material";

// const PaymentForm = ({ onNext, onChange, formData, setFormData }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [cardNumber, setCardNumber] = useState("");

//   // רפרנסים לשדות השונים
//   const expiryRef = useRef(null);
//   const cvvRef = useRef(null);

//   const onSubmit = (data) => {
//     console.log("Form Data Before Sending:", data);
//     onNext(data);
//   };

//   const handleCardChange = (e) => {
//     let value = e.target.value.replace(/\D/g, ""); // מסנן תווים לא מספריים
//     if (value.length > 16) return;
    
//     setCardNumber(value);
    
//     if (value.length === 16) {
//       expiryRef.current.focus(); // מעביר פוקוס לתוקף אחרי 16 ספרות
//     }

//     if (onChange) {
//       onChange("cardNumber", value);
//     }
//   };

//   const handleExpiryChange = (e) => {
//     let value = e.target.value.replace(/\D/g, ""); // מסנן תווים לא מספריים
//     if (value.length > 4) return;

//     if (value.length === 4) {
//       cvvRef.current.focus(); // מעביר פוקוס ל-CVV אחרי 4 ספרות
//     }

//     if (onChange) {
//       onChange("expiry", value);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Typography variant="h6">פרטי תשלום</Typography>
//       <Grid container spacing={2}>
//         {/* מספר כרטיס אשראי */}
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="מספר כרטיס אשראי"
//             value={cardNumber}
//             onChange={handleCardChange}
//             error={!!errors.cardNumber}
//             helperText={errors.cardNumber?.message}
//             inputProps={{ maxLength: 16 }}
//             {...register("cardNumber", {
//               required: "שדה חובה",
//               pattern: { value: /^[0-9]{16}$/, message: "מספר כרטיס לא תקין" }
//             })}
//           />
//         </Grid>

//         {/* תוקף MM/YY */}
//         <Grid item xs={6}>
//           <TextField
//             fullWidth
//             label="תוקף (MM/YY)"
//             inputRef={expiryRef} // מקשר את השדה ל-ref
//             onChange={handleExpiryChange}
//             error={!!errors.expiry}
//             helperText={errors.expiry?.message}
//             inputProps={{ maxLength: 4 }}
//             {...register("expiry", { required: "שדה חובה" })}
//           />
//         </Grid>

//         {/* CVV */}
//         <Grid item xs={6}>
//           <TextField
//             fullWidth
//             label="CVV"
//             inputRef={cvvRef} // מקשר את השדה ל-ref
//             {...register("cvv", {
//               required: "שדה חובה",
//               pattern: { value: /^[0-9]{3,4}$/, message: "CVV לא תקין" }
//             })}
//             error={!!errors.cvv}
//             helperText={errors.cvv?.message}
//           />
//         </Grid>
//       </Grid>
      
//       <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//         אישור תשלום
//       </Button>
//     </form>
//   );
// };

// export default PaymentForm;
