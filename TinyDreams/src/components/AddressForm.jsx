import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Typography } from "@mui/material";

const AddressForm = ({ onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">פרטי משלוח</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="שם פרטי" {...register("firstName", { required: "שדה חובה" })} error={!!errors.firstName} helperText={errors.firstName?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="שם משפחה" {...register("lastName", { required: "שדה חובה" })} error={!!errors.lastName} helperText={errors.lastName?.message} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="כתובת" {...register("address", { required: "שדה חובה" })} error={!!errors.address} helperText={errors.address?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="עיר" {...register("city", { required: "שדה חובה" })} error={!!errors.city} helperText={errors.city?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="מיקוד" {...register("zip", { required: "שדה חובה" })} error={!!errors.zip} helperText={errors.zip?.message} />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>המשך</Button>
    </form>
  );
};

export default AddressForm;