import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Grid, Paper, Stepper, Step, StepLabel, Box } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import AddressForm from "../components/AddressForm.jsx";
import PaymentForm from "../components/PaymentForm.jsx";
import ReviewOrder from "../components/ReviewOrder.jsx";
import { addOrder } from "../api/orderService.js";
import { emptyingCart } from "../features/cartSlice.js";


const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout() {

    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user = useSelector(state => state.user.currentUser);
    const products = useSelector(state => state.cart.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let minimalProduct = products.map(product => ({
        _id: product._id,
        productName: product.name,
        price: product.price,
        amount: product.amount ?? 1
    }));

    const [formData, setFormData] = useState({});
    const [paymentForm, setPaymentForm] = useState({});

    const handleNext1 = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleFormDataChange = (name, value) => {
        console.log("🔵 נתונים שהתקבלו:", name, ": ", value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNext = (data) => {
        console.log("🚀 Form data at Checkout:", data);
        // setFormData(data); // שמירת הנתונים לפני המעבר לשלב הבא
        setActiveStep((prevStep) => prevStep + 1);
    }
    const handleFormDataChange1 = (newData) => {
        console.log("🔵 נתונים שהתקבלו מ- AddressForm:", newData);
        setFormData(prev => ({ ...prev, ...newData }));
        console.log("formData in handleFormDataChange: ", formData);

        handleNext(); // מעבר לשלב הבא אחרי מילוי השדות
    };

    const onSubmit = async () => {

        if (isSubmitting) return; // אם ההזמנה כבר נשלחת, לא לעשות כלום

        setIsSubmitting(true); // לחסום לחיצות נוספות

        const order = { ...formData, minimalProduct, userId: user._id };
        console.log("Final Order Data:", order);

        try {
            const response = await addOrder(order);
            if (response) {
                alert("ההזמנה נוספה בהצלחה");
                console.log(response.data);
                localStorage.removeItem("cart");
                dispatch(emptyingCart());
                navigate("/Home");

            }
        } catch (err) {
            alert(err);
            console.log(err);
        }
        finally {
            setIsSubmitting(false); // להפעיל מחדש את הכפתור אם קרתה שגיאה
        }
    };


    const getStepContent = (step) => {
        try {
            console.log("step", step);
            console.log("formData", formData);
            switch (step) {
                case 0:
                    return <AddressForm onNext={handleNext} setFormData={setFormData} formData={formData} onChange={handleFormDataChange} />;
                case 1:
                    return <PaymentForm onNext={handleNext} setFormData={setPaymentForm} formData={paymentForm} onChange={handleFormDataChange} />;
                case 2:
                    return <ReviewOrder onNext={handleNext} formData={formData} onBack={handleBack} />;
                default:
                    throw new Error("Unknown step");
            }
        } catch (error) {
            console.log("🚨 שגיאה ב-getStepContent:", error);
            return <Typography color="error">שגיאה בטעינת שלב התהליך</Typography>;
        }
    };



    return (

        <Container component={Paper} maxWidth="md" sx={{ p: 4, mt: 5 }}>
            <Typography variant="h5" gutterBottom>תהליך הזמנה</Typography>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                {activeStep !== 0 && (
                    <Button startIcon={<ChevronLeftRoundedIcon />} onClick={handleBack} variant="text">
                        חזור
                    </Button>
                )}
                {activeStep === steps.length - 1 ? (
                    // <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                    //     סיום הזמנה
                    // </Button>
                    <Button variant="contained"
                        // endIcon={<ChevronRightRoundedIcon />}
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("Form Submitted!");
                            onSubmit();
                        }}>
                        send order
                    </Button>



                ) : (
                    // <Button variant="contained" endIcon={<ChevronRightRoundedIcon />}onClick={handleSubmit(onSubmit)}>
                    //     הבא
                    // </Button>
                    <Button variant="contained" onClick={handleNext}>next</Button>

                )}
            </Box>
        </Container>

    );
}
