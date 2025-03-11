import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { addOrder } from "../api/orderService.js";
import { Container, Typography, TextField, Button, Grid, Paper } from "@mui/material";

function CheckOut() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    const user = useSelector(state => state.user.currentUser);
    const products = useSelector(state => state.cart.products);

    let minimalProduct = products.map(product => ({
        _id: product._id,
        productName: product.name,
        price: product.price,
        amount: product.amount ?? 1
    }));

    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        const { address, firstName, lastName, country, zip, phone } = data;
        const order = { minimalProduct, address, userId: user._id, firstName, lastName, country, zip, phone };
        console.log("order:", order);

        try {
            const response = await addOrder(order);
            if (response) {
                console.log("response:", response.data);
                alert("ההזמנה נוספה בהצלחה");
            }
        } catch (err) {
            alert(err);
            console.log(err);
        }
    };

    return (
        <Container component={Paper} maxWidth="sm" sx={{ p: 4, mt: 5 }}>
            <Typography variant="h5" gutterBottom>טופס הזמנה</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="שם פרטי" {...register("firstName", { required: "שדה חובה" })} error={!!errors.firstName} helperText={errors.firstName?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="שם משפחה" {...register("lastName", { required: "שדה חובה" })} error={!!errors.lastName} helperText={errors.lastName?.message} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="מדינה" {...register("country", { required: "שדה חובה" })} error={!!errors.country} helperText={errors.country?.message} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="כתובת" {...register("address", { required: "שדה חובה" })} error={!!errors.address} helperText={errors.address?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="מיקוד" {...register("zip", { required: "שדה חובה" })} error={!!errors.zip} helperText={errors.zip?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="טלפון" {...register("phone", { required: "שדה חובה", pattern: { value: /^\d{9,10}$/, message: "מספר טלפון לא תקין" } })} error={!!errors.phone} helperText={errors.phone?.message} />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>שלח</Button>
            </form>
        </Container>
    );
}

export default CheckOut;
