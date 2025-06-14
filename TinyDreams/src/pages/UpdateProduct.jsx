import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { MenuItem, Select, TextField, Button, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { updateProduct } from "../api/productService";
import { getCategories, getTags, getColors } from "../api/enumService";
import useScrollToTop from "../hooks/useScrollToTop";
import "./css/UpdateProduct.css";

const styles = {
    formContainer: {
        backgroundColor: "aliceblue",
        width: "60%",
        maxHeight: "90%",
        overflowY: "auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "14px",
    },
    button: {
        backgroundColor: "#84B1D9",
        color: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "15px",
    },
};

function UpdateProduct({ product, setViewUpdateForm }) {

    useScrollToTop();
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const token = useSelector((state) => state.user?.currentUser?.token);

    async function onSubmit(data) {
        setIsSubmitting(true);

        if (!product || !product._id) {
            alert("מזהה המוצר חסר! לא ניתן לעדכן.");
            return;
        }
        try {

            const productToUpdate = { ...data, _id: product._id };

            await updateProduct(productToUpdate, token);
            Swal.fire({
                title: " המוצר עודכן בהצלחה",
                icon: "success",
                timer: "3000",
                allowOutsideClick: true
            });
            setViewUpdateForm(false);
        } catch (error) {
            if (error.message && error.message === "Network Error") {
                Swal.fire({
                    title: "The Internet?",
                    text: error.message,
                    icon: "question"
                });
            }
            // alert(error.response?.data?.message || error.message);
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response?.data?.message || error.message,
                });
            }
            
        }
        finally {
            setIsSubmitting(false);
            reset();
        }
    }

    useEffect(() => {
        getCategories().then(res => setCategories(res.data.Categories));
        getTags().then(res => setTags(res.data.TagsEnum));
        getColors().then(res => setColors(res.data.Colors));
    }, []);

    useEffect(() => {
        if (product && categories.length > 0) {
            reset({
                name: product.name || "",
                description: product.description || "",
                images: product.images ? product.images.join(", ") : "",
                stock: product.stock || 1,
                price: product.price || 0,
                categories: categories.includes(product.categories) ? product.categories : "",
                sizes: Array.isArray(product.sizes) ? product.sizes : [],
                colors: Array.isArray(product.colors) ? product.colors : [],
                tag: Array.isArray(product.tag) ? product.tag : []
            });
        }
    }, [product, reset, categories]);

    return (
        <Dialog open={true} onClose={() => setViewUpdateForm(false)} maxWidth="md" fullWidth>
            <DialogTitle sx={{ color: "#BF6079" }}>עדכון מוצר</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField fullWidth label="שם המוצר" variant="outlined" {...register("name", { required: "חובה להזין שם" })} error={!!errors.name} helperText={errors.name?.message} style={styles.input} />
                    <TextField fullWidth label="תיאור" variant="outlined" multiline rows={3} {...register("description", { required: "חובה להזין תיאור" })} error={!!errors.description} helperText={errors.description?.message} style={styles.input} />
                    <TextField fullWidth label="תמונות (מופרדות בפסיקים)" variant="outlined" {...register("images", { required: "חובה להוסיף לפחות תמונה אחת" })} error={!!errors.images} helperText={errors.images?.message} style={styles.input} />
                    <TextField fullWidth label="מלאי" type="number" variant="outlined" {...register("stock", { required: "חובה להזין מלאי", min: 1 })} error={!!errors.stock} helperText={errors.stock?.message} style={styles.input} />
                    <TextField fullWidth label="מחיר" type="number" variant="outlined" {...register("price", { required: "חובה להזין מחיר", min: 1 })} error={!!errors.price} helperText={errors.price?.message} style={styles.input} />
                    <Controller
                        name="sizes"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                label="גדלים (מופרדים בפסיקים)"
                                variant="outlined"
                                value={field.value.join(", ")} // מציג כטקסט מופרד בפסיקים
                                onChange={(e) => field.onChange(e.target.value.split(",").map(size => size.trim()))}
                                error={!!errors.sizes}
                                helperText={errors.sizes?.message}
                                style={styles.input}
                            />
                        )}
                    />
                    <Controller name="categories" control={control} defaultValue="" render={({ field }) => (
                        <Select fullWidth {...field} style={styles.input}>
                            {categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
                        </Select>
                    )} />

                    <Controller name="colors" control={control} defaultValue={[]} render={({ field }) => (
                        <Select fullWidth multiple {...field} style={styles.input}>
                            {colors.map(color => <MenuItem key={color} value={color}>{color}</MenuItem>)}
                        </Select>
                    )} />
                    <Controller name="tag" control={control} defaultValue={[]} render={({ field }) => (
                        <Select fullWidth multiple {...field} style={styles.input}>
                            {tags.map(tag => <MenuItem key={tag} value={tag}>{tag}</MenuItem>)}
                        </Select>
                    )} />
                    <DialogActions>
                        <Button fullWidth variant="contained" onClick={() => setViewUpdateForm(false)} sx={{
                            backgroundColor: "#590202",
                            color: "white",
                            padding: "10px 15px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px",
                            marginTop: "15px",
                            marginLeft: "10px",
                        }} color="secondary">ביטול</Button>

                        <Button type="submit" fullWidth variant="contained" style={styles.button}>
                            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "עדכן מוצר"}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>

        </Dialog>
    );
}

export default UpdateProduct;
