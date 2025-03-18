// // import React, { useState } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { Container, Typography, Stepper, Step, StepLabel, Paper, Box, Grid, Button, CircularProgress, Drawer } from "@mui/material";
// // import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
// // import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
// // import { toast } from "react-toastify";
// // import { IconButton } from "@mui/material";
// // import { useMediaQuery } from "@mui/material";


// // import AddressForm from "../components/AddressForm.jsx";
// // import PaymentForm from "../components/PaymentForm.jsx";
// // import ReviewOrder from "../components/ReviewOrder.jsx";
// // import { addOrder } from "../api/orderService.js";
// // import { emptyingCart } from "../features/cartSlice.js";
// // import OrderSummary from "../components/OrderSummary.jsx";

// // const steps = ["Shipping address", "Payment details", "Review your order"];

// // export default function Checkout() {
// //     const [activeStep, setActiveStep] = useState(0);
// //     const [isSubmitting, setIsSubmitting] = useState(false);
// //     const [openSummary, setOpenSummary] = useState(false);
// //     const user = useSelector((state) => state.user.currentUser);
// //     const products = useSelector((state) => state.cart.products);
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();
// //     const [formData, setFormData] = useState({});
// //     const [paymentForm, setPaymentForm] = useState({});
// //     const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));


// //     const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
// //     const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
// //     const handleFormDataChange = (name, value) => {
// //         setFormData((prevData) => ({ ...prevData, [name]: value }));
// //     };

// //     const minimalProduct = products.map((product) => ({
// //         _id: product._id,
// //         productName: product.name,
// //         price: product.price,
// //         amount: product.amount ?? 1,
// //     }));

// //     const onSubmit = async () => {
// //         if (isSubmitting) return;
// //         setIsSubmitting(true);
// //         console.log("formData: ", formData);

// //         const order = { ...formData, minimalProduct, userId: user._id };
// //         console.log("order: ", order);

// //         try {
// //             const response = await addOrder(order);
// //             if (response) {
// //                 toast.success("Order submitted successfully!", { position: "top-center", autoClose: 3000 });
// //                 localStorage.removeItem("cart");
// //                 dispatch(emptyingCart());
// //                 setTimeout(() => navigate("/Home"), 3000);
// //             }
// //         } catch (err) {
// //             toast.error("Error submitting order. Please try again!", { position: "top-center", autoClose: 3000 });
// //             console.log(err);
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     };

// //     return (
// //         <Container component="main" maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
// //             <Grid container spacing={3}>
// //                 <Grid item xs={12} md={7} sx={{ width: "70%" }}>
// //                     <Paper sx={{ p: 4 }}>
// //                         <Typography variant="h5" gutterBottom>
// //                             Checkout Process
// //                         </Typography>
// //                         {/* <Button variant="contained" onClick={() => setOpenSummary(true)} sx={{ width: "100%", mb: 2 }}>
// //                             הצג תקציר הזמנה (Total: ₪{products.reduce((sum, item) => sum + item.price * (item.amount || 1), 0).toFixed(2)})
// //                         </Button> */}
// //                         {isSmallScreen && (
// //                             <Button variant="contained" onClick={() => setOpenSummary(true)} sx={{ width: "100%", mb: 2 }}>
// //                                 הצג תקציר הזמנה (Total: ₪{products.reduce((sum, item) => sum + item.price * (item.amount || 1), 0).toFixed(2)})
// //                             </Button>
// //                         )}

// //                         <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
//                             {steps.map((label) => (
//                                 <Step key={label}>
//                                     <StepLabel>{label}</StepLabel>
//                                 </Step>
//                             ))}
//                         </Stepper>
//                         {activeStep === 0 && <AddressForm onNext={handleNext} formData={formData} setFormData={setFormData} onChange={handleFormDataChange} />}
//                         {activeStep === 1 && <PaymentForm onNext={handleNext} formData={paymentForm} setFormData={setPaymentForm} onChange={handleFormDataChange} />}
//                         {activeStep === 2 && <ReviewOrder onNext={handleNext} formData={formData} onBack={handleBack} />}
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
//                             {activeStep !== 0 && (
//                                 <Button startIcon={<ChevronLeftRoundedIcon />} onClick={handleBack} variant="text">
//                                     Back
//                                 </Button>
//                             )}
//                             {activeStep === steps.length - 1 ? (
//                                 <Button variant="contained" onClick={onSubmit} disabled={isSubmitting}>
//                                     {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Submit Order"}
//                                 </Button>
//                             ) : (
//                                 <Button variant="contained" onClick={handleNext}>
//                                     Next
//                                 </Button>
//                             )}
//                         </Box>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={5} sx={{ width: "30%", height: "100vh", position: "sticky", top: 0, display: { xs: "none", md: "block" } }}>
//                     <OrderSummary products={minimalProduct} />
//                 </Grid>
//             </Grid>
//             <Drawer anchor="top" open={openSummary} onClose={() => setOpenSummary(false)}>
//                 <Box sx={{ p: 2 }}>
//                     <IconButton onClick={() => setOpenSummary(false)} sx={{ position: "absolute", right: 10, top: 10 }}>
//                         {/* <CloseIcon /> */}
//                     </IconButton>
//                     <OrderSummary products={minimalProduct} />
//                 </Box>
//             </Drawer>
//         </Container>
//     );
// }

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Stepper, Step, StepLabel, Paper, Box, Grid, Button, CircularProgress, Drawer, useMediaQuery } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";

import AddressForm from "../components/CheckoutComponents/AddressForm.jsx";
import PaymentForm from "../components/CheckoutComponents/PaymentForm.jsx";
import ReviewOrder from "../components/CheckoutComponents/ReviewOrder.jsx";
import { addOrder } from "../api/orderService.js";
import { emptyingCart } from "../features/cartSlice.js";
import OrderSummary from "../components/CheckoutComponents/OrderSummary.jsx";
import './css/Checkout.css'
import CloseIcon from '@mui/icons-material/Close';

const steps = ["כתובת למשלוח", "פרטי תשלום", "סקור את ההזמנה שלך"];

export default function Checkout() {
    
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openSummary, setOpenSummary] = useState(false);
    const user = useSelector((state) => state.user.currentUser);
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [paymentForm, setPaymentForm] = useState({});
    
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
    const handleFormDataChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const minimalProduct = products.map((product) => ({
        _id: product._id,
        productName: product.name,
        price: product.price,
        amount: product.amount ?? 1,
    }));

    const onSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        console.log("formData: ", formData);
        
        const order = { ...formData, minimalProduct, userId: user._id };
        console.log("order: ", order);
        
        try {
            const response = await addOrder(order);
            if (response) {
                toast.success("Order submitted successfully!", { position: "top-center", autoClose: 3000,
                    style: {
                        backgroundColor: "#E9ECF2",  
                        color: "#590202 ",            // צבע טקסט לבן
                        borderRadius: "8px",         // פינות מעוגלות
                        padding: "10px 20px",        // ריפוד פנימי להודעה
                        fontSize: "16px",   // גודל גופן
                        border:"#590202 2px solid"       
                      }
                 });
                localStorage.removeItem("cart");
                dispatch(emptyingCart());
                setTimeout(() => navigate("/Home"), 3000);
            }
        } catch (err) {
            toast.error("Error submitting order. Please try again!", { position: "top-center", autoClose: 3000 });
            console.log(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container component="main" maxWidth="lg"sx={{height: "76vh", paddingLeft: "0", paddingTop:"47px" }}>
            <Grid container spacing={0}>
                <Grid item xs={12} md={7} sx={{ width: "100%" }}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{fontWeight: "bold",textAlign: "center", padding:"3px", marginBottom:"35px"}}>
                           תהליך התשלום
                        </Typography>
                        {isSmallScreen && (
                            <Button variant="contained" onClick={() => setOpenSummary(true)} sx={{ width: "100%", mb: 2 }}>
                                הצג תקציר הזמנה 
                            </Button>
                        )}
                        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === 0 && <AddressForm onNext={handleNext} formData={formData} setFormData={setFormData} onChange={handleFormDataChange} />}
                        {activeStep === 1 && <PaymentForm onNext={handleNext} formData={paymentForm} setFormData={setPaymentForm} onChange={handleFormDataChange} />}
                        {activeStep === 2 && <ReviewOrder onNext={handleNext} formData={formData} onBack={handleBack} />}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            {activeStep !== 0 && (
                                <Button startIcon={<ChevronLeftRoundedIcon />} onClick={handleBack} variant="text">
                                    Back
                                </Button>
                            )}
                            {activeStep === steps.length - 1 ? (
                                <Button variant="contained" onClick={onSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Submit Order"}
                                </Button>
                            ) : (
                                <Button variant="contained" onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5} sx={{ position: "sticky", padding:"47px", display: { xs: "none", md: "block" } }}>
                    <OrderSummary products={minimalProduct} />
                </Grid>
            </Grid>
            <Drawer anchor="top" open={openSummary} onClose={() => setOpenSummary(false)}>
                <Box sx={{ p: 2,width:410 }}>
                    <IconButton onClick={() => setOpenSummary(false)} sx={{ position: "absolute", right: 10, top: 10 }}>
                        <CloseIcon />
                    </IconButton>
                    <OrderSummary products={minimalProduct} />
                </Box>
            </Drawer>
        </Container>
    );
}
//לנסות לראות ב גיפי טי את הקקוד האחרון פלוס כפתור הX והצבעים האחרים כדאי לעשות קלון ולבדוק איזה פרוייקט טוב יותר.