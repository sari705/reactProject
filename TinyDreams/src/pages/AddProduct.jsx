// import { Controller, useForm } from "react-hook-form";
// import { MenuItem, Select } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { getCategories, getTags, getColors } from "../api/enumService";
// import { addProduct } from "../api/productService";

// function AddProduct() {
//     const { register, handleSubmit, control, reset, formState: { errors, isValid } } = useForm();
//     const [categories, setCategories] = useState([]);
//     const [tags, setTags] = useState([]);
//     const [colors, setColors] = useState([]);

//     const currentUser = useSelector(state => state.user.currentUser);
//     console.log("all Current user:", currentUser);

//     const token = useSelector(state => state.user.currentUser.token); // העבר את השורה הזו לכאן

//     // const currentUser = useSelector(state => state.currentUser);
//     // const token = currentUser ? currentUser.token : null;

//     async function onSubmit(data) {

//         console.log("Product Data:", data);
//         // const token = useSelector( => state.currentUser.token);
//         console.log("manager token:", token);

//         data.images = data.images.split(",").map(img => img.trim());

//         try {
//             const response = await addProduct(data, token);
//             console.log("respones" + response.data.newProduct);
//             alert("added");
//         }
//         catch (error) {
//             alert(error);
//             console.log(error);
//         }
//     }

//     async function getTagEnam() {
//         console.log("getTagEnam");
//         try {
//             const res = await getTags()
//             setTags(res.data.TagsEnum);
//         }
//         catch (err) {
//             console.log("tags error: " + err);
//         }
//     }

//     async function getCategoryEnam() {
//         console.log("getCategoryEnam");
//         try {
//             const res = await getCategories()
//             setCategories(res.data.Categories);
//         }
//         catch (err) {
//             console.log("tags error: " + err);
//         }
//     }

//     async function getColorEnam() {
//         try {
//             const res = await getColors()
//             setColors(res.data.Colors);
//         }
//         catch (err) {
//             console.log("tags error: " + err);
//         }
//     }

//     useEffect(() => {
//         getCategoryEnam()
//         getTagEnam()
//         getColorEnam()
//     }, [])

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             {/**שם */}
//             <div>
//                 <label>שם המוצר:</label>
//                 <br />
//                 <input {...register("name",
//                     { 
//                         required: { value: true, message: "name is required" },
//                         minLength: {value: 3, message: "name is too short"} 

//                     }
//                 )} />
//                 {errors.name && <h2>{errors.name.message}</h2>}
//                 <br />
//             </div>

//             {/**תיאור */}
//             <div>
//                 <label>תיאור:</label>
//                 <br />
//                 <textarea {...register("description",
//                     { required: { value: true, message: "description is required" } }
//                 )} />
//                 {errors.description && <h2>{errors.description.message}</h2>}
//                 <br />
//             </div>

//             {/**ניתובים לתמונות */}
//             <div>
//                 <label>תמונות (הפרד עם פסיקים):</label>
//                 <br />
//                 <input {...register("images",
//                     { required: { value: true, message: "at least one image is required" } }
//                 )} placeholder="image1.jpg, image2.jpg" />
//                 {errors.images && <h2>{errors.images.message}</h2>}
//                 <br />
//             </div>

//             {/**כמות במלאי */}
//             <div>
//                 <label>מלאי:</label>
//                 <br />
//                 <input type="number" {...register("stock",
//                     { 
//                         required: { value: true, message: "stock is required" }, 
//                         min: {value: 1, message: "must be at least 1"},
//                     }
//                 )} />
//                 {errors.stock && <h2>{errors.stock.message}</h2>}
//                 <br />
//             </div>

//             {/**מחיר */}
//             <div>
//                 <label>מחיר:</label>
//                 <br />
//                 <input type="number" step="0.01" {...register("price",
//                     { required: { value: true, message: "price is required" }, min: 1 }
//                 )} />
//                 {errors.price && <h2>{errors.price.message}</h2>}
//                 <br />
//             </div>

//             {/**קטגוריה */}
//             <div>
//                 <label>קטגוריה:</label>
//                 <br />
//                 <select {...register("categories",
//                     { required: { value: true, message: "categories is required" } }
//                 )}>
//                     <option value="">בחר קטגוריה</option>
//                     {categories.length && categories.map((category) => (
//                         <option key={category} value={category}>
//                             {category}
//                         </option>
//                     ))}
//                 </select>
//                 {errors.categories && <h2>{errors.categories.message}</h2>}
//             </div>

//             {/**גדלים של המוצר */}
//             <div>
//                 <label>גדלים (הפרד עם פסיקים):</label>
//                 <br />
//                 <Controller
//                     name="sizes"
//                     control={control}
//                     defaultValue={[]} // ערך ברירת מחדל הוא מערך ריק
//                     render={({ field }) => (
//                         <input
//                             {...field}
//                             placeholder="S, M, L"
//                             onChange={(e) => {
//                                 const value = e.target.value;
//                                 const sizesArray = value.split(",").map((size) => size.trim()); // מפריד לפסיקים ומנקה רווחים
//                                 field.onChange(sizesArray); // שומר את הערכים כמערך
//                             }}
//                         />
//                     )}
//                 />
//             </div>

//             {/**צבעים */}
//             <div>
//                 <label>צבעים (הפרד עם פסיקים):</label>
//                 <br />
//                 <Controller
//                     name="colors"
//                     control={control}
//                     defaultValue={[]}
//                     render={({ field }) => (
//                         <Select
//                             multiple
//                             {...field}
//                             value={field.value || []}
//                             onChange={(e) => field.onChange(e.target.value)}
//                         >
//                             {colors.map((color) => (
//                                 <MenuItem key={color} value={color}>
//                                     {color}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     )}
//                 />
//             </div>

//             {/**תגיות */}
//             <div>
//                 <label>תגיות:</label>
//                 <br />
//                 <Controller
//                     name="tag"
//                     control={control}
//                     defaultValue={[]}
//                     rules={{ required: "בחר לפחות תגית אחת" }}
//                     render={({ field, fieldState }) => (
//                         <>
//                             <Select
//                                 multiple
//                                 {...field}
//                                 value={field.value || []}
//                                 onChange={(e) => field.onChange(e.target.value)}
//                             >
//                                 {tags.map((tag) => (
//                                     <MenuItem key={tag} value={tag}>
//                                         {tag}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                             {fieldState.error && <h2>{fieldState.error.message}</h2>}
//                         </>
//                     )}
//                 />
//             </div>

//             <button type="submit">הוסף מוצר</button>
//         </form>
//     );
// }

// export default AddProduct;

import { Controller, useForm } from "react-hook-form";
import { MenuItem, Select, TextField, Button, Typography, Container, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCategories, getTags, getColors } from "../api/enumService";
import { addProduct } from "../api/productService";

const styles = {
    container: {
        backgroundColor: "#E9ECF2", // צבע רקע
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "auto",
    },
    label: {
        color: "#590202",
        // fontWeight: "bold",
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
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const token = useSelector(state => state.user.currentUser.token);

    async function onSubmit(data) {
        data.images = data.images.split(",").map(img => img.trim());
        try {
            await addProduct(data, token);
            alert("המוצר נוסף בהצלחה!");
        } catch (error) {
            alert("שגיאה בהוספת המוצר");
            console.error(error);
        }
    }

    useEffect(() => {
        getCategories().then(res => setCategories(res.data.Categories)).catch(console.error);
        getTags().then(res => setTags(res.data.TagsEnum)).catch(console.error);
        getColors().then(res => setColors(res.data.Colors)).catch(console.error);
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
                    <label style={styles.label}>צבעים:</label>
                    <Controller
                        name="colors"
                        control={control}
                        defaultValue={[]} // ברירת מחדל כערך ריק
                        render={({ field }) => (
                            <Select
                                multiple
                                fullWidth
                                {...field}
                                value={field.value ?? []} // אם הערך אינו קיים, יוחזר מערך ריק
                                onChange={(e) => field.onChange(e.target.value)} // מעדכן את הערך כראוי
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
                        defaultValue={[]} // ברירת מחדל כערך ריק
                        rules={{ required: "בחר לפחות תגית אחת" }}
                        render={({ field }) => (
                            <Select
                                multiple
                                fullWidth
                                {...field}
                                value={field.value ?? []} // אם הערך אינו קיים, יוחזר מערך ריק
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
                <Button type="submit" fullWidth variant="contained" style={styles.button}>הוסף מוצר</Button>
            </form>
        </Container>
    );
}

export default AddProduct;
