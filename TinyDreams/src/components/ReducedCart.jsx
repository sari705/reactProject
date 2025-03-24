import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Button, Divider, List, ListItem, Box } from "@mui/material";

import ProductInReducedCart from "./ProductInReducedCart";
import { useNavigate } from "react-router-dom";

function ReducedCart({ setViewReducedCart }) {
    const reduxProducts = useSelector((state) => state.cart.products);
    const reduxAmount = useSelector((state) => state.cart.amountInCart);
    const reduxSum = useSelector((state) => state.cart.sum.toFixed(2));
    const navigate = useNavigate();
    console.log("מוצרים בעגלה:", reduxProducts);

    return (
        <Card sx={{
            width: 320, 
            position: "fixed",
            bottom: 20,
            right: 20,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#D9B1A3",
        }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color:"#590202"}}>
                עגלת הקניות של🛒
                     
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{
                    maxHeight: 250,  
                    overflowY: "auto", 
                    pr: 1  
                }}>
                    <List>
                        {reduxProducts.length === 0 ? (
                            <Typography variant="body1" sx={{ textAlign: "center", color: "#590202" }}>
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
                <Typography variant="body1" sx={{color:"#590202", fontWeight: "bold", textAlign: "center" }}>
                    סה"כ: ₪{reduxSum > 0 ? reduxSum : 0}
                </Typography>
                <Typography variant="body2" sx={{ color: "#590202", textAlign: "center" }}>
                    {reduxAmount} מוצרים בעגלה
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button variant="contained" fullWidth color="success" sx={{backgroundColor:"#59020210", color:"#590202"}} onClick={() => navigate("/cart")}>
                        לסל הקניות
                    </Button>
                    <Button variant="contained" fullWidth color="success" sx={{backgroundColor:"#59020210", color:"#590202"}} onClick={() => navigate("/checkout")}>
                        לתשלום
                    </Button>
                    <Button variant="contained" fullWidth sx={{backgroundColor:"#59020210", color:"#590202"}} onClick={() => (setViewReducedCart(false))}>
                        סגור
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ReducedCart;
