// import { useSelector } from "react-redux"
// import ProductInCart from "../components/ProductInCart";
// import { Link } from "react-router-dom";


// function Cart() {

//     const reduxProducts = useSelector((state) => state.cart.products);
//     const reduxAmount = useSelector((state) => state.cart.amountInCart);
//     const reduxSum = useSelector((state) => state.cart.sum.toFixed(2));

//     return (<>
//         <ul>
//             {reduxProducts.map((product) => (<li key={product._id}>
//                 <ProductInCart product={product} />
//             </li>
//             ))}
//         </ul>

//         <h2>num products in cart: {reduxAmount}</h2>
//         <h2>sum: {reduxSum>0?reduxSum:0}</h2>


//             <Link to="/checkout">    <button>המשך בקנייה</button></Link>
//     </>);//כאן אמור להיות כפתור "המשך בקניה" / "לתשלום
// }

// export default Cart;


import { useSelector } from "react-redux";
import ProductInCart from "../components/ProductInCart";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";

function Cart() {
    const reduxProducts = useSelector((state) => state.cart.products);
    const reduxAmount = useSelector((state) => state.cart.amountInCart);
    const reduxSum = useSelector((state) => state.cart.sum.toFixed(2));

    return (
        <Box sx={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
            <Typography variant="h4" fontWeight="bold" color="#590202" textAlign="center" sx={{ mb: 3 }}>
                עגלת הקניות שלך <ShoppingCartIcon />
            </Typography>

            <Paper sx={{ padding: "20px", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                {reduxProducts.length > 0 ? (
                    <>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            {reduxProducts.map((product) => (
                                <ProductInCart key={product._id} product={product} />
                            ))}
                        </Box>

                        <Divider sx={{ my: 3 }} />

   {/* //כאן אמור להיות כפתור "המשך בקניה" / "לתשלום */}
                        {/* סיכום קנייה */}
                        <Box sx={{ textAlign: "center", mb: 2 }}>
                            <Typography variant="h6">סה"כ פריטים בעגלה: <b>{reduxAmount}</b></Typography>
                            <Typography variant="h5" color="#BF7069" fontWeight="bold">סה"כ לתשלום: ₪{reduxSum > 0 ? reduxSum : 0}</Typography>
                        </Box>

                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ backgroundColor: "#84B1D9", color: "white", padding: "10px 20px" }}
                                startIcon={<PaymentIcon />}
                                component={Link}
                                to="/checkout"
                            >
                                המשך לתשלום
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography variant="h6" textAlign="center" sx={{ color: "gray" }}>
                        עגלת הקניות שלך ריקה 😞
                    </Typography>
                )}
            </Paper>
        </Box>
    );
}

export default Cart;
