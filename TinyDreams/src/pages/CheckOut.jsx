// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Container, Typography, Stepper, Step, StepLabel, Paper, Box, Grid, Button, CircularProgress, Drawer, useMediaQuery } from "@mui/material";
// import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
// import AddressForm from "../components/CheckoutComponents/AddressForm.jsx";
// import PaymentForm from "../components/CheckoutComponents/PaymentForm.jsx";
// import ReviewOrder from "../components/CheckoutComponents/ReviewOrder.jsx";
// import { addOrder } from "../api/orderService.js";
// import { emptyingCart } from "../features/cartSlice.js";
// import OrderSummary from "../components/CheckoutComponents/OrderSummary.jsx";
// import './css/Checkout.css'
// import CloseIcon from '@mui/icons-material/Close';
// import Swal from "sweetalert2";
// import {IconButton} from "@mui/material";

// const steps = ["כתובת למשלוח", "פרטי תשלום", "סקור את ההזמנה שלך"];

// export default function Checkout() {

//     const [activeStep, setActiveStep] = useState(0);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [openSummary, setOpenSummary] = useState(false);
//     const user = useSelector((state) => state.user.currentUser);
//     const products = useSelector((state) => state.cart.products);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({});
//     const [paymentForm, setPaymentForm] = useState({});

//     const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

//     const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
//     const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
//     const handleFormDataChange = (name, value) => {
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const minimalProduct = products.map((product) => ({
//         _id: product._id,
//         productName: product.name,
//         price: product.price,
//         amount: product.amount ?? 1,
//     }));

//     const onSubmit = async () => {
//         if (isSubmitting) return;
//         setIsSubmitting(true);

//         const order = { ...formData, minimalProduct, userId: user._id };

//         try {
//             const response = await addOrder(order);
//             if (response) {
//                 Swal.fire({
//                     title: "הושלם",
//                     text: "ההזמנה בדרך אליך...",
//                     imageUrl: "/logo/logo2.png",
//                     imageWidth: 300,
//                     imageHeight: 250,
//                     imageAlt: "Tiny Dreams",
//                     timer: "3000",
//                     allowOutsideClick: true,
//                 });
//                 localStorage.removeItem("cart");
//                 dispatch(emptyingCart());
//                 setTimeout(() => navigate("/Home"), 3000);
//             }
//         } catch (err) {
//             // toast.error("Error submitting order. Please try again!", { position: "top-center", autoClose: 3000 });
//             Swal.fire({
//                 icon: "error",
//                 title: err.message||"address is required",
//                 text: "Please try again",
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//     return (
//         <Container component="main" maxWidth="lg" sx={{ height: "76vh", paddingLeft: "0", paddingTop: "47px" }}>
//             <Grid container spacing={0}>
//                 <Grid item xs={12} md={7} sx={{ width: "100%" }}>
//                     <Paper sx={{ p: 4, backgroundColor:"#f0eded", border:"0", boxShadow:"0" }}>
//                         <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", padding: "3px", marginBottom: "35px" }}>
//                             תהליך התשלום
//                         </Typography>
//                         {isSmallScreen && (
//                             <Button variant="contained" onClick={() => setOpenSummary(true)} sx={{ width: "100%", mb: 2 }}>
//                                 הצג תקציר הזמנה
//                             </Button>
//                         )}
//                         <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
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
//                 <Grid item xs={12} md={5} sx={{ position: "sticky", padding: "47px", display: { xs: "none", md: "block" } }}>
//                     <OrderSummary products={minimalProduct} />
//                 </Grid>
//             </Grid>
//             <Drawer anchor="top" open={openSummary} onClose={() => setOpenSummary(false)}>
//                 <Box sx={{ p: "2", width: "100%", alignItems:"center" }}>
//                     <IconButton onClick={() => setOpenSummary(false)} sx={{ position: "absolute", right: 10, top: 10 }}>
//                         <CloseIcon />
//                     </IconButton>
//                     <OrderSummary products={minimalProduct} />
//                 </Box>
//             </Drawer>
//         </Container>
//     );
// }
// // //לנסות לראות ב גיפי טי את הקקוד האחרון פלוס כפתור הX והצבעים האחרים כדאי לעשות קלון ולבדוק איזה פרוייקט טוב יותר.
////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Paper, Stepper, Step, StepLabel, Typography, Grid, Drawer, Box,Button, CircularProgress, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import AddressForm from "../components/CheckoutComponents/AddressForm";
import PaymentForm from "../components/CheckoutComponents/PaymentForm";
import ReviewOrder from "../components/CheckoutComponents/ReviewOrder";
import OrderSummary from "../components/CheckoutComponents/OrderSummary";
import { addOrder } from "../api/orderService";
import { emptyingCart } from "../features/cartSlice";
import useScrollToTop from "../hooks/useScrollToTop";

export default function Checkout() {

  useScrollToTop();
  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [openSummary, setOpenSummary] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const steps = ["כתובת למשלוח", "פרטי תשלום", "סקור את ההזמנה"];
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));


  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleAddressSubmit = (data) => {
    setAddressData(data);
    handleNext();
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    handleNext();
  };

  const handleFinalSubmit = async () => {
    try {
      const minimalProduct = products.map((prod) => ({
        _id: prod._id,
        productName: prod.name,
        price: prod.price,
        amount: prod.amount ?? 1,
      }));

      const order = {
        ...addressData,
        ...paymentData,
        minimalProduct,
        userId: user?._id,
      };

      const result = await addOrder(order);
      if (result) {
        Swal.fire({
          title: "הזמנה בוצעה",
          text: "ההזמנה שלך בדרך!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        localStorage.removeItem("cart");
        dispatch(emptyingCart());
        setTimeout(() => {
          navigate("/Home");
        }, 3000);
      }
    } catch (err) {
      Swal.fire({
        title: "שגיאה",
        text: err.message || "שגיאה בשליחת הזמנה",
        icon: "error",
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
  <Grid container spacing={3} sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* החלק של תהליך ה-Checkout + טפסים - צד שמאל */}
        <Grid item xs={12} md={7}>
          {/* <Typography variant="h5" sx={{ mb: 2, textAlign: "center", color: "#590202",fontWeight:"bold" }}>
           תהליך התשלום
          </Typography> */}
          {isSmallScreen && (
                            <Button variant="contained" onClick={() => setOpenSummary(true)} sx={{ width: "100%", mb: 2 }}>
                                הצג תקציר הזמנה
                            </Button>
                        )}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label, idx) => (
              <Step key={idx}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && <AddressForm defaultValues={addressData} onSubmit={handleAddressSubmit} />}
          {activeStep === 1 && <PaymentForm defaultValues={paymentData} onSubmit={handlePaymentSubmit} onBack={handleBack} />}
          {activeStep === 2 && <ReviewOrder addressData={addressData} paymentData={paymentData} onBack={handleBack} onConfirm={handleFinalSubmit} />}
        </Grid>
          {/* קומפוננטת תקציר הזמנה - צד ימין */}
          <Grid item xs={12} md={5} sx={{ position: "sticky",maxHeight:"95vh", top: 0, padding: "0px", display: { xs: "none", md: "block" } }}>
          <OrderSummary products={products.map((prod) => ({ _id: prod._id, productName: prod.name, price: prod.price, amount: prod.amount ?? 1 }))} />
        </Grid>
      </Grid>
      <Drawer anchor="top" open={openSummary} onClose={() => setOpenSummary(false)}>
        <Box sx={{ p: "2", width: "100%", alignItems: "center" }}>
          <IconButton onClick={() => setOpenSummary(false)} sx={{ position: "absolute", right: 10, top: 10 }}>
            <CloseIcon />
          </IconButton>
          <OrderSummary products={products.map((prod) => ({ _id: prod._id, productName: prod.name, price: prod.price, amount: prod.amount ?? 1 }))} />
        </Box>
      </Drawer>
    </Container>
  );
}

// {/* <Grid item xs={12} md={5} sx={{ position: "sticky", padding: "47px", display: { xs: "none", md: "block" } }}>
// // //                     <OrderSummary products={minimalProduct} />
// // //                 </Grid> */}
// // //             </Grid>
// // //             <Drawer anchor="top" open={openSummary} onClose={() => setOpenSummary(false)}>
// // //                 <Box sx={{ p: "2", width: "100%", alignItems:"center" }}>
// // //                     <IconButton onClick={() => setOpenSummary(false)} sx={{ position: "absolute", right: 10, top: 10 }}>
// // //                         <CloseIcon />
// // //                     </IconButton>
// // //                     <OrderSummary products={minimalProduct} />
// // //                 </Box>
// // //             </Drawer>
//0778658130