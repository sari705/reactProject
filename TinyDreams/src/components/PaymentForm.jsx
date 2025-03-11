import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Typography } from "@mui/material";

const PaymentForm = ({ onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">פרטי תשלום</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="מספר כרטיס אשראי" {...register("cardNumber", { required: "שדה חובה", pattern: { value: /^[0-9]{16}$/, message: "מספר כרטיס לא תקין" } })} error={!!errors.cardNumber} helperText={errors.cardNumber?.message} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="תוקף (MM/YY)" {...register("expiry", { required: "שדה חובה" })} error={!!errors.expiry} helperText={errors.expiry?.message} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="CVV" {...register("cvv", { required: "שדה חובה", pattern: { value: /^[0-9]{3,4}$/, message: "CVV לא תקין" } })} error={!!errors.cvv} helperText={errors.cvv?.message} />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>אישור תשלום</Button>
    </form>
  );
};

export default PaymentForm;
