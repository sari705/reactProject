// import { useState } from "react";
// import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Popover } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "framer-motion";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { useNavigate } from "react-router-dom";
// import { addToCart } from "../features/cartSlice";
// import { deleteProduct } from "../api/productService";
// import { AddShoppingCart, LocalOffer } from "@mui/icons-material";

// function OneProduct({ product, setViewUpdateForm, setProductForUpdate }) {
//     const dispatch = useDispatch();
//     const token = useSelector((state) => state.user?.currentUser?.token);
//     const role = useSelector((state) => state.user?.currentUser?.role);
//     const navigate = useNavigate();

//     const [open, setOpen] = useState(false);
//     const [anchorEl, setAnchorEl] = useState(null); // לניהול פתיחת `Popover`
//     const [showTags, setShowTags] = useState(false); // ניהול תצוגת התגיות


//     // פתיחת דיאלוג מחיקה
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     // פתיחת וסגירת ה-Popover של התגיות
//     const handleTagClick = (event) => {
//         setAnchorEl(anchorEl ? null : event.currentTarget);
//     };

//     // מחיקת מוצר
//     const deleteProductById = async (id) => {
//         try {
//             const response = await deleteProduct(id, token);
//             if (response) {
//                 console.log("מוצר נמחק:", response);
//                 alert(response.data);
//             }
//         } catch (error) {
//             console.log("שגיאה במחיקה:", error);
//             alert(error.response?.data?.message || "שגיאה במחיקת המוצר");
//         }
//     };

//     const handleDelete = () => {
//         deleteProductById(product._id);
//         handleClose();
//     };

//     return (
//         <>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Card
//                     className="product-card"
//                     sx={{
//                         maxWidth: 345,
//                         backgroundColor: "transparent",
//                         boxShadow: "none",
//                         borderRadius: "0",
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         minHeight: "auto",
//                         height: "100%",
//                     }}
//                 >
//                     {/* תמונה עם רקע לבן */}
//                     <Box
//                         sx={{
//                             backgroundColor: "#fff",
//                             padding: "10px",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             width: "100%",
//                             flexDirection: "column",
//                         }}
//                     >
//                         <CardMedia
//                             component="img"
//                             height="270"
//                             image={`/images/${product.images[0]}`}
//                             alt={product.name}
//                             sx={{
//                                 objectFit: "contain",
//                                 backgroundColor: "white",
//                                 width: "100%",
//                                 cursor: "pointer",
//                             }}
//                             onClick={() => navigate(`details/${product._id}`)}
//                         />

//                         <Box display="flex" justifyContent="center" gap={1} mt={1}>

//                             {product.tag && product.tag.length > 0 && (
//                                 <>
//                                     <Button
//                                         onClick={handleTagClick}
//                                         sx={{ color: "#590202", "&:hover": { color: "#84B1D9" },}}
//                                     >
//                                         <LocalOffer></LocalOffer>
//                                     </Button>

//                                     {/* Popover - תצוגת תגיות בלחיצה */}
//                                     <Popover
//                                         open={Boolean(anchorEl)}
//                                         anchorEl={anchorEl}
//                                         onClose={() => setAnchorEl(null)}
//                                         anchorOrigin={{
//                                             vertical: "bottom",
//                                             horizontal: "center",
//                                         }}
//                                         transformOrigin={{
//                                             vertical: "top",
//                                             horizontal: "center",
//                                         }}
//                                     >
//                                         <Box sx={{ p: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
//                                             {product.tag.map((productTag, index) => (
//                                                 <Chip
//                                                     key={index}
//                                                     label={productTag}
//                                                     sx={{
//                                                         backgroundColor: "#84B1D9",
//                                                         color: "white",
//                                                         fontSize: "10px",
//                                                         height: "18px",
//                                                         padding: "2px 6px",
//                                                         borderRadius: "10px",
//                                                     }}
//                                                 />
//                                             ))}
//                                         </Box>
//                                     </Popover>
//                                 </>
//                             )}
//                             <Button
//                                 sx={{
//                                     color: "#590202",
//                                     "&:hover": { color: "#84B1D9" },
//                                 }}
//                                 onClick={() => dispatch(addToCart(product))}
//                             >
//                                 <AddShoppingCart />
//                             </Button>

//                             {role === "MANAGER" && (
//                                 <>
//                                     <Button
//                                         sx={{
//                                             color: "#590202",
//                                             "&:hover": { color: "#84B1D9" },
//                                         }}
//                                         startIcon={<EditIcon />}
//                                         onClick={() => {
//                                             setViewUpdateForm(true);
//                                             setProductForUpdate(product);
//                                         }}
//                                     />

//                                     <Button
//                                         sx={{
//                                             color: "#590202",
//                                             "&:hover": { color: "#84B1D9" },
//                                         }}
//                                         startIcon={<DeleteIcon />}
//                                         onClick={handleOpen}
//                                     />
//                                 </>
//                             )}
//                         </Box>
//                     </Box>

//                     {/* פרטי המוצר */}
//                     <CardContent
//                         sx={{
//                             textAlign: "center",
//                             display: "flex",
//                             flexDirection: "column",
//                             justifyContent: "center",
//                             fontSize: "0.85rem",
//                             minHeight: "auto",
//                             backgroundColor: "transparent",
//                             paddingBottom: "10px",
//                             paddingTop: "10px",
//                         }}
//                     >
//                         <Typography variant="h6" color="#590202" sx={{ fontSize: "0.9rem" }}>
//                             {product.name}
//                         </Typography>
//                         <Typography variant="h5" color="#BF7069" fontWeight="bold" sx={{ fontSize: "1rem" }}>
//                             ₪{product.price}
//                         </Typography>

//                         {/* כפתור הצגת תגיות */}

//                     </CardContent>

//                     {/* כפתורים */}

//                 </Card>
//             </motion.div>

//             {/* דיאלוג אישור מחיקה */}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>אישור מחיקת מוצר</DialogTitle>
//                 <DialogContent>
//                     <Typography>האם אתה בטוח שברצונך למחוק את <b>{product.name}</b>?</Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} sx={{ color: "#333" }}>ביטול</Button>
//                     <Button onClick={handleDelete} sx={{ color: "white", backgroundColor: "#D32F2F", "&:hover": { backgroundColor: "#B71C1C" } }}>
//                         מחק
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// }

// export default OneProduct;

import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Collapse } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { deleteProduct } from "../api/productService";
import { AddShoppingCart, LocalOffer, ExpandMore, ExpandLess } from "@mui/icons-material";
import Swal from "sweetalert2";

function OneProduct({ product, setViewUpdateForm, setProductForUpdate }) {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const role = useSelector((state) => state.user?.currentUser?.role);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [showTags, setShowTags] = useState(false); // ניהול תצוגת התגיות

    // פתיחת דיאלוג מחיקה
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // מחיקת מוצר
    const deleteProductById = async (id) => {
        try {
            const response = await deleteProduct(id, token);
            if (response) {
                console.log("מוצר נמחק:", response);
                Swal.fire({
                    title: "המוצר נמחק",
                    text: response.data.name,
                    icon: "success"
                });
            }
        } catch (error) {
            console.log("שגיאה במחיקה:", error);
            alert(error.response?.data?.message || "שגיאה במחיקת המוצר");
        }
    };

    const handleDelete = () => {
        deleteProductById(product._id);
        handleClose();
    };

    return (
        <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card
                    className="product-card"
                    sx={{
                        maxWidth: 345,
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderRadius: "0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minHeight: "auto",
                        height: "100%",
                    }}
                >
                    {/* תמונה עם רקע לבן */}
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            padding: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            flexDirection: "column",
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="270"
                            image={`/images/${product.images[0]}`}
                            alt={product.name}
                            sx={{
                                objectFit: "contain",
                                backgroundColor: "white",
                                width: "100%",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate(`details/${product._id}`)}
                        />

                        {/* כפתורים */}
                        <Box display="flex" justifyContent="center" gap={1} mt={1}>
                            {product.tag && product.tag.length > 0 && (
                                <>
                                    <Button
                                        onClick={() => setShowTags(!showTags)}
                                        sx={{ color: "#590202", "&:hover": { color: "#84B1D9" } }}
                                    >
                                        <LocalOffer />
                                    </Button>
                                </>
                            )}

                            <Button
                                sx={{
                                    color: "#590202",
                                    "&:hover": { color: "#84B1D9" },
                                }}
                                onClick={() => dispatch(addToCart(product))}
                            >
                                <AddShoppingCart />
                            </Button>

                            {role === "MANAGER" && (
                                <>
                                    <Button
                                        sx={{
                                            color: "#590202",
                                            "&:hover": { color: "#84B1D9" },
                                        }}
                                        startIcon={<EditIcon />}
                                        onClick={() => {
                                            setViewUpdateForm(true);
                                            setProductForUpdate(product);
                                        }}
                                    />

                                    <Button
                                        sx={{
                                            color: "#590202",
                                            "&:hover": { color: "#84B1D9" },
                                        }}
                                        startIcon={<DeleteIcon />}
                                        onClick={handleOpen}
                                    />
                                </>
                            )}
                        </Box>

                        {/* הצגת תגיות בתוך הכרטיס עצמו */}
                        <Collapse in={showTags}>
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap", mt: 1 }}>
                                {product.tag.map((productTag, index) => (
                                    <Chip
                                        key={index}
                                        label={productTag}
                                        sx={{
                                            backgroundColor: "#84B1D9",
                                            color: "white",
                                            fontSize: "10px",
                                            height: "18px",
                                            padding: "2px 6px",
                                            borderRadius: "10px",
                                        }}
                                    />
                                ))}
                            </Box>
                        </Collapse>
                    </Box>

                    {/* פרטי המוצר */}
                    <CardContent
                        sx={{
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            fontSize: "0.85rem",
                            minHeight: "auto",
                            backgroundColor: "transparent",
                            paddingBottom: "10px",
                            paddingTop: "10px",
                        }}
                    >
                        <Typography variant="h6" color="#590202" sx={{ fontSize: "0.9rem" }}>
                            {product.name}
                        </Typography>
                        <Typography variant="h5" color="#BF7069" fontWeight="bold" sx={{ fontSize: "1rem" }}>
                            ₪{product.price}
                        </Typography>
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
