// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { deleteProduct } from "../api/productService";
// import { addToCart } from "../features/cartSlice";
// import "./css/oneProduct.css"

// function OneProduct({ product, setChoiseProduct, setViewUpdateForm , setProductForUpdate}) {
//     const navigate = useNavigate()
//     const disp = useDispatch()
//     const token = useSelector((state) => state.user?.currentUser?.token);

//     const deleteProductById = async (id) => {
//         try {
//             const response = await deleteProduct(id, token);
//             if (response){
//                 console.log(response);
//                 alert(response.data)
//             }
//         }
//         catch (error) {
//             console.log(error)
//             alert(error.response.data.message)
//         }
//     }

//     return (<div>

//         <h2>{product.name}</h2>
//         <img src={`/images/${product.images[0]}`} alt={product.images[0]} onClick={() => navigate(`details/${product._id}`)} />
//         <h3>{product.price}</h3>
//         <div className="tags-container">
//                 {product.tag && product.tag.map((productTag, index) => (
//                     <span key={index} className="tag">{productTag}</span>
//                 ))}
//         </div>
//         <button onClick={() => { disp(addToCart(product)) }}>הוסף לסל</button>
//         <button onClick={() => { setViewUpdateForm(true); setProductForUpdate(product)}}>ערוך מוצר</button>
//         <button onClick={() => { deleteProductById(product._id)}}>מחק מוצר</button>

//     </div>);
// }

// export default OneProduct;
import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../features/cartSlice";
import { deleteProduct } from "../api/productService"; // יבוא הפונקציה למחיקת מוצר
import { AddShoppingCart } from "@mui/icons-material";

function OneProduct({ product, setViewUpdateForm, setProductForUpdate }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user?.currentUser?.token); // קבלת ה-token מהסטייט
    const [open, setOpen] = useState(false); // ניהול פתיחת הדיאלוג
    const role = useSelector((state) => state.user?.currentUser?.role);
    const navigate = useNavigate();

    // פתיחת הדיאלוג
    const handleOpen = () => setOpen(true);

    // סגירת הדיאלוג
    const handleClose = () => setOpen(false);

    // מחיקת מוצר לאחר אישור
    const deleteProductById = async (id) => {
        try {
            const response = await deleteProduct(id, token); // קריאה לפונקציה שמוחקת מוצר מה-API
            if (response) {
                console.log("מוצר נמחק:", response);
                alert(response.data); // הודעה על מחיקה מוצלחת
            }
        } catch (error) {
            console.log("שגיאה במחיקה:", error);
            alert(error.response?.data?.message || "שגיאה במחיקת המוצר"); // הודעת שגיאה
        }
    };

    const handleDelete = () => {
        deleteProductById(product._id); // קריאה לפונקציית המחיקה
        handleClose();
    };

    return (
        <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card className="product-card" sx={{
                    maxWidth: 345,
                    borderRadius: "20px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                    transition: "0.3s",
                    background: "linear-gradient(135deg, #E9ECF2, #D9B1A3)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "300px",
                    height: "100%", // 🔹 הכרטיס יתמלא לגובה אחיד
                }}>
                    <Box sx={{ backgroundColor: "#fff", borderRadius: "20px 20px 0 0", padding: "10px", flexGrow: 1, minHeight: "50px" }}>
                        <CardMedia
                            component="img"
                            height="270" // ✅ הגדלת התמונה עוד יותר
                            image={`/images/${product.images[0]}`}
                            alt={product.name}
                            sx={{ objectFit: "contain", backgroundColor: "white", width: "100%", cursor: "pointer" }}
                            onClick={() => navigate(`details/${product._id}`)}
                        />
                    </Box>
                    <CardContent className="product-card-content" sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 0.3, fontSize: "0.85rem", minHeight: "200px" }}> {/* ✅ הקטנת הפרטים */}
                        <Typography variant="h6" color="#590202" sx={{ fontSize: "0.9rem" }}> {/* ✅ הקטנת הטקסט */}
                            {product.name}
                        </Typography>
                        <Typography variant="h5" color="#BF7069" fontWeight="bold" sx={{ mt: 1, fontSize: "1rem" }}> {/* ✅ הקטנת המחיר */}
                            ₪{product.price}
                        </Typography>
                        {/* הצגת תגיות */}
                        {product.tag && (
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap", mt: 1 }}>
                                {product.tag.map((productTag, index) => (
                                    <Chip key={index} label={productTag} sx={{ backgroundColor: "#84B1D9", color: "white", fontSize: "10px", height: "18px", padding: "2px 6px", borderRadius: "10px" }} />
                                ))}
                            </Box>
                        )}
                        <Box display="flex" justifyContent="center" gap={1} mt={2}>
                            <Button
                                sx={{
                                    color: "#590202",
                                    "&:hover": {
                                        color: "#84B1D9", // שינוי צבע רקע ב-hover
                                    }, "& svg": { fontSize: "2rem !important" }
                                }}
                                onClick={() => dispatch(addToCart(product))}
                            >
                                <AddShoppingCart></AddShoppingCart>
                            </Button >

                            {/* בשביל שתי הכפתורים הבאים. ביני role-הוספתי בדיקה על ה   */}
                            {role == 'MANAGER' && <Button
                                sx={{
                                    color: "#590202",
                                    "&:hover": {
                                        color: "#84B1D9", // שינוי צבע רקע ב-hover
                                    }, "& svg": { fontSize: "2rem !important" }
                                }} startIcon={<EditIcon />}
                                onClick={() => { setViewUpdateForm(true); setProductForUpdate(product); }}
                            >

                            </Button>}
                            {role == 'MANAGER' && <Button
                                sx={{
                                    color: "#590202",
                                    "&:hover": {
                                        color: "#84B1D9", // שינוי צבע רקע ב-hover
                                    }, "& svg": { fontSize: "2rem !important" }
                                }} startIcon={<DeleteIcon />}
                                onClick={handleOpen} // כאן נפתח את הדיאלוג
                            >

                            </Button>}

                        </Box>
                    </CardContent>
                </Card>
            </motion.div>

            {/* דיאלוג אישור מחיקה */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>אישור מחיקת מוצר</DialogTitle>
                <DialogContent>
                    <Typography>האם אתה בטוח שברצונך למחוק את <b>{product.name}</b>?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: "#333" }}>ביטול</Button>
                    <Button onClick={handleDelete} sx={{ color: "white", backgroundColor: "#D32F2F", "&:hover": { backgroundColor: "#B71C1C" } }}>
                        מחק
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default OneProduct;
