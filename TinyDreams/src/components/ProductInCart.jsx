import { useDispatch } from "react-redux";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { updateAmount, removeProduct, addToCart } from "../features/cartSlice";

function ProductInCart({ product }) {
    const dispatch = useDispatch();

    return (
        <Card sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderRadius: "12px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
        }}>
            <CardMedia
                component="img"
                sx={{ width: 80, height: 80, objectFit: "contain", marginRight: "15px" }}
                image={`/images/${product.images[0]}`}
                alt={product.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
                <Typography color="gray">מחיר יחידה: ₪{product.price}</Typography>
                <Typography fontWeight="bold" color="#BF7069">סה"כ: ₪{(product.price * product.amount).toFixed(2)}</Typography>

                {/* אזור כמות */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mt: 1 }}>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ minWidth: "40px", backgroundColor: "#84B1D9", color: "white" }}
                        onClick={() => dispatch(addToCart(product))}
                    >
                        <AddIcon />
                    </Button>

                    <Typography variant="h6">{product.amount}</Typography>

                    <Button
                        variant="contained"
                        size="small"
                        sx={{ minWidth: "40px", backgroundColor: "#D9B1A3", color: "#590202" }}
                        onClick={() => dispatch(updateAmount(product))}
                    >
                        <RemoveIcon />
                    </Button>

                    <Button
                        variant="contained"
                        size="small"
                        sx={{ minWidth: "40px", backgroundColor: "#BF7069", color: "white" }}
                        onClick={() => dispatch(removeProduct(product))}
                    >
                        <DeleteIcon />
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ProductInCart;

