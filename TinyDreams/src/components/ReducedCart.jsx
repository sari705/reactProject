// import ProductInReducedCart from "./ProductInReducedCart";
// import { useSelector } from "react-redux";

// function ReducedCart() {
//     const reduxProducts = useSelector((state) => state.cart.products);
//     const reduxAmount = useSelector((state) => state.cart.amountInCart);
//     const reduxSum = useSelector((state) => state.cart.sum.toFixed(2));

//     return (<>
//         <ul>
//             {reduxProducts.map((product) => (<li key={product._id}>
//                 <ProductInReducedCart product={product} />
//             </li>
//             ))}
//         </ul>

//         <h2>num products in cart: {reduxAmount}</h2>
//         <h2>sum: {reduxSum > 0 ? reduxSum : 0}</h2>

//     </>);//כאן אמור להיות כפתור "המשך בקניה" / "לתשלום
// }

// export default ReducedCart;

import ProductInReducedCart from "./ProductInReducedCart";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Button, Divider, List, ListItem, Box } from "@mui/material";

function ReducedCart({ setViewReducedCart }) {
    const reduxProducts = useSelector((state) => state.cart.products);
    const reduxAmount = useSelector((state) => state.cart.amountInCart);
    const reduxSum = useSelector((state) => state.cart.sum.toFixed(2));
    console.log("מוצרים בעגלה:", reduxProducts);

    return (
        <Card sx={{
            width: 320, // קצת יותר רחב לעיצוב נוח
            position: "fixed",
            bottom: 20,
            right: 20,
            boxShadow: 3,
            borderRadius: 2
        }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    🛒 עגלת הקניות שלך
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* 🔹 עוטף את רשימת המוצרים עם גלילה */}
                <Box sx={{
                    maxHeight: 250,  // גובה מקסימלי
                    overflowY: "auto", // הפעלת גלילה אם יש הרבה מוצרים
                    pr: 1  // קצת ריווח מימין שלא יחתוך את ה-Scrollbar
                }}>
                    <List>
                        {reduxProducts.length === 0 ? (
                            <Typography variant="body1" sx={{ textAlign: "center", color: "gray" }}>
                                העגלה שלך ריקה
                            </Typography>
                        ) : (
                            reduxProducts.map((product) => (
                                <ListItem key={product._id} sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <ProductInReducedCart product={product} />
                                </ListItem>
                            ))
                        )}
                    </List>
                </Box>

                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    סה"כ: ₪{reduxSum > 0 ? reduxSum : 0}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray", textAlign: "center" }}>
                    {reduxAmount} מוצרים בעגלה
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => window.location.href = "/products"}>
                        המשך בקנייה
                    </Button>
                    <Button variant="contained" color="success" onClick={() => window.location.href = "/checkout"}>
                        לתשלום
                    </Button>
                    <Button variant="contained" color="error" onClick={() => (setViewReducedCart(false))}>
                        סגור
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ReducedCart;
