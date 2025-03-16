import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Grid, Typography } from "@mui/material";

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
