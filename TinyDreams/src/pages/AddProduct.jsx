import { Controller, useForm } from "react-hook-form";
import { MenuItem, Select, TextField, Button, Typography, Container, Box, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { getCategories, getTags, getColors } from "../api/enumService";
import { addProduct } from "../api/productService";
import useScrollToTop from "../hooks/useScrollToTop";

const styles = {
    container: {
        backgroundColor: "#E9ECF2",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "auto",
        marginTop: "40px",
    },
    label: {
        color: "#590202",
    },
    input: {
        backgroundColor: "#ffffff",
        borderRadius: "4px",
    },
    button: {
        backgroundColor: "#84B1D9",
        color: "#ffffff",
        fontWeight: "bold",
        marginTop: "1rem",
    },
};

function AddProduct() {

    useScrollToTop();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = useSelector(state => state.user.currentUser.token);

    async function onSubmit(data) {
        data.images = data.images.split(",").map(img => img.trim());
        try {
            setIsSubmitting(true);

            await addProduct(data, token);
            Swal.fire({
                title: "המוצר נוסף בהצלחה",
                icon: "success",
                timer: "3000",
                allowOutsideClick: true,
            });

        } catch (error) {
            Swal.fire({
                title: "שגיאה בעדכון",
                text: error.message,
                icon: "error"
            });
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

    return (
        <Container style={styles.container}>
            <Typography variant="h4" color="#BF7069" gutterBottom>הוסף מוצר</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <label style={styles.label}>שם המוצר:</label>
                    <TextField fullWidth variant="outlined" {...register("name", { required: "חובה להזין שם" })} error={!!errors.name} helperText={errors.name?.message} style={styles.input} />
                </Box>
                <Box>
                    <label style={styles.label}>תיאור:</label>
                    <TextField fullWidth variant="outlined" multiline rows={3} {...register("description", { required: "חובה להזין תיאור" })} error={!!errors.description} helperText={errors.description?.message} style={styles.input} />
                </Box>
                <Box>
                    <label style={styles.label}>תמונות (מופרדות בפסיקים):</label>
                    <TextField fullWidth variant="outlined" {...register("images", { required: "חובה להוסיף לפחות תמונה אחת" })} error={!!errors.images} helperText={errors.images?.message} style={styles.input} />
                </Box>
                <Box>
                    <label style={styles.label}>מלאי:</label>
                    <TextField fullWidth type="number" variant="outlined" {...register("stock", { required: "חובה להזין מלאי", min: 1 })} error={!!errors.stock} helperText={errors.stock?.message} style={styles.input} />
                </Box>
                <Box>
                    <label style={styles.label}>מחיר:</label>
                    <TextField fullWidth type="number" variant="outlined" {...register("price", { required: "חובה להזין מחיר", min: 1 })} error={!!errors.price} helperText={errors.price?.message} style={styles.input} />
                </Box>
                <Box>
                    <label style={styles.label}>קטגוריה:</label>
                    <Select fullWidth {...register("categories", { required: "בחר קטגוריה" })} style={styles.input}>
                        {categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
                    </Select>
                </Box>
                <Box>
                    <label style={styles.label}>גדלים (מופרדים בפסיקים):</label>
                    <Controller
                        name="sizes"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="S, M, L"
                                {...field}
                                onChange={(e) => {
                                    const sizesArray = e.target.value.split(",").map(size => size.trim());
                                    field.onChange(sizesArray);
                                }}
                                error={!!errors.sizes}
                                helperText={errors.sizes ? "חובה להזין לפחות גודל אחד" : ""}
                                style={styles.input}
                            />
                        )}
                    />
                </Box>

                <Box>
                    <label style={styles.label}>צבעים:</label>
                    <Controller
                        name="colors"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <Select
                                multiple
                                fullWidth
                                {...field}
                                value={field.value ?? []}
                                onChange={(e) => field.onChange(e.target.value)}
                                style={styles.input}
                            >
                                {colors.map((color) => (
                                    <MenuItem key={color} value={color}>
                                        {color}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </Box>
                <Box>
                    <label style={styles.label}>תגיות:</label>
                    <Controller
                        name="tag"
                        control={control}
                        defaultValue={[]}
                        rules={{ required: "בחר לפחות תגית אחת" }}
                        render={({ field }) => (
                            <Select
                                multiple
                                fullWidth
                                {...field}
                                value={field.value ?? []}
                                onChange={(e) => field.onChange(e.target.value)}
                                style={styles.input}
                            >
                                {tags.map((tag) => (
                                    <MenuItem key={tag} value={tag}>
                                        {tag}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </Box>
                <Button type="submit" fullWidth variant="contained" style={styles.button} disabled={isSubmitting} >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "הוסף מוצר"}
                </Button>
            </form>
        </Container>
    );
}

export default AddProduct;
