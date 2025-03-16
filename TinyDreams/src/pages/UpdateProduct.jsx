// import { updateProduct } from "../api/productService";
// import { useState, useEffect } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { MenuItem, Select } from "@mui/material";
// import { useSelector } from "react-redux";
// import { getCategories, getTags, getColors } from "../api/enumService";
// import "./css/UpdateProduct.css"

// const product = {
//     _id: "67ccce2a408b3e71784dc431",
//     name: "car",
//     description: "a white car",
//     images: ["tois20.jpg"],
//     stock: 10,
//     price: 680,
//     categories: "צעצועים",
//     sizes: ["M"],
//     colors: [],
//     tag: ["צעצועי התפתחות"],
//     __v: 0
// };

// function UpdateProduct({ product, setViewUpdateForm }) {
//     console.log(product);

//     const { register, handleSubmit, control, reset, formState: { errors, isValid } } = useForm();
//     const [categories, setCategories] = useState([]);
//     const [tags, setTags] = useState([]);
//     const [colors, setColors] = useState([]);
//     const token = useSelector((state) => state.user?.currentUser?.token);
//     // ללבדוק למה קשור הבעיה כיגם הוספצ מוצר לא עובד מאותה סיבה ולפני כן זה עבד .אולי משהו ברידקס השתבש?

//     console.log("token: ", token);

//     async function onSubmit(data) {
//         if (!product || !product._id) {
//             alert("מזהה המוצר חסר! לא ניתן לעדכן.");
//             return;
//         }

//         const productToUpdate = { ...data, _id: product._id }; // ודאי שהמזהה קיים
//         console.log("Product Data: ", productToUpdate);

//         try {

//             const response = await updateProduct(productToUpdate, token);
//             console.log("respones" + response.data);
//             alert("updated");
//             setViewUpdateForm(false);
//         }
//         catch (error) {
//             alert(error.response.data.message);
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
//         if (product) {
//             reset({
//                 name: product.name || "",
//                 description: product.description || "",
//                 images: product.images.join(", ") || [],
//                 stock: product.stock || 1,
//                 price: product.price || 0,
//                 categories: product.categories || "",
//                 sizes: product.sizes || [],
//                 color: product.color || colors,
//                 tag: product.tag || []
//             });
//         }
//     }, [product, reset]);

//     useEffect(() => {
//         getCategoryEnam()
//         getColorEnam()
//         getTagEnam()
//     }, [])

//     return (
//         <div className="update-form-div">
//             <form onSubmit={handleSubmit(onSubmit)} className="update-form-form">
//                 <button onClick={() => (setViewUpdateForm(false))}>❌</button>
//                 {/**שם */}
//                 <div>
//                     <label>שם המוצר:</label>
//                     <br />
//                     <input {...register("name",
//                         {
//                             required: { value: true, message: "name is required" },
//                             minLength: { value: 3, message: "name is too short" }

//                         }
//                     )} />
//                     {errors.name && <h2>{errors.name.message}</h2>}
//                     <br />
//                 </div>

//                 {/**תיאור */}
//                 <div>
//                     <label>תיאור:</label>
//                     <br />
//                     <textarea {...register("description",
//                         { required: { value: true, message: "description is required" } }
//                     )} />
//                     {errors.description && <h2>{errors.description.message}</h2>}
//                     <br />
//                 </div>

//                 {/**ניתובים לתמונות */}
//                 <div>
//                     <label>תמונות (הפרד עם פסיקים):</label>
//                     <br />
//                     <input {...register("images",
//                         { required: { value: true, message: "at least one image is required" } }
//                     )} placeholder="image1.jpg, image2.jpg" />
//                     {errors.images && <h2>{errors.images.message}</h2>}
//                     <br />
//                 </div>

//                 {/**כמות במלאי */}
//                 <div>
//                     <label>מלאי:</label>
//                     <br />
//                     <input type="number" {...register("stock",
//                         {
//                             required: { value: true, message: "stock is required" },
//                             min: { value: 1, message: "must be at least 1" },
//                         }
//                     )} />
//                     {errors.stock && <h2>{errors.stock.message}</h2>}
//                     <br />
//                 </div>

//                 {/**מחיר */}
//                 <div>
//                     <label>מחיר:</label>
//                     <br />
//                     <input type="number" step="0.01" {...register("price",
//                         { required: { value: true, message: "price is required" }, min: 1 }
//                     )} />
//                     {errors.price && <h2>{errors.price.message}</h2>}
//                     <br />
//                 </div>

//                 {/**קטגוריה */}
//                 <div>
//                     <label>קטגוריה:</label>
//                     <br />
//                     <select {...register("categories",
//                         { required: { value: true, message: "categories is required" } }
//                     )}>
//                         <option value="">{product.categories}</option>
//                         {categories.length && categories.map((category) => (
//                             <option key={category} value={category}>
//                                 {category}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.categories && <h2>{errors.categories.message}</h2>}
//                 </div>

//                 {/**גדלים של המוצר */}
//                 <div>
//                     <label>גדלים (הפרד עם פסיקים):</label>
//                     <br />
//                     <Controller
//                         name="sizes"
//                         control={control}
//                         defaultValue={[]} // ערך ברירת מחדל הוא מערך ריק
//                         render={({ field }) => (
//                             <input
//                                 {...field}
//                                 placeholder="S, M, L"
//                                 onChange={(e) => {
//                                     const value = e.target.value;
//                                     const sizesArray = value.split(",").map((size) => size.trim()); // מפריד לפסיקים ומנקה רווחים
//                                     field.onChange(sizesArray); // שומר את הערכים כמערך
//                                 }}
//                             />
//                         )}
//                     />
//                 </div>

//                 {/**צבעים */}
//                 <div>
//                     <label>צבעים (הפרד עם פסיקים):</label>
//                     <br />
//                     <Controller
//                         name="color"
//                         control={control}
//                         defaultValue={[]}
//                         render={({ field }) => (
//                             <Select

//                                 multiple
//                                 {...field}
//                                 value={field.value || []}
//                                 onChange={(e) => field.onChange(e.target.value)}
//                             >
//                                 {colors.map((color) => (
//                                     <MenuItem key={color} value={color}>
//                                         {color}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         )}
//                     />
//                 </div>

//                 {/**תגיות */}
//                 <div>
//                     <label>תגיות:</label>
//                     <br />
//                     <Controller
//                         name="tag"
//                         control={control}
//                         defaultValue={[]}
//                         rules={{ required: "בחר לפחות תגית אחת" }}
//                         render={({ field, fieldState }) => (
//                             <>
//                                 <Select
//                                     multiple
//                                     {...field}
//                                     value={field.value || []}
//                                     onChange={(e) => field.onChange(e.target.value)}
//                                 >
//                                     {tags.map((tag) => (
//                                         <MenuItem key={tag} value={tag}>
//                                             {tag}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                                 {fieldState.error && <h2>{fieldState.error.message}</h2>}
//                             </>
//                         )}
//                     />
//                 </div>

//                 <button type="submit">עדכן מוצר</button>
//             </form>
//         </div>
//     );
// }

// export default UpdateProduct;
import { updateProduct } from "../api/productService";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { MenuItem, Select, TextField, Button, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useSelector } from "react-redux";
import { getCategories, getTags, getColors } from "../api/enumService";
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
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const token = useSelector((state) => state.user?.currentUser?.token);

    async function onSubmit(data) {
        console.log("in submit update");

        if (!product || !product._id) {
            alert("מזהה המוצר חסר! לא ניתן לעדכן.");
            return;
        }
        const productToUpdate = { ...data, _id: product._id };
        try {
            await updateProduct(productToUpdate, token);
            alert("המוצר עודכן בהצלחה!");
            setViewUpdateForm(false);
        } catch (error) {
            alert(error.response.data.message);
            console.error(error);
        }
    }

    useEffect(() => {
        getCategories().then(res => setCategories(res.data.Categories)).catch(console.error);
        getTags().then(res => setTags(res.data.TagsEnum)).catch(console.error);
        getColors().then(res => setColors(res.data.Colors)).catch(console.error);
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
                        <Button type="submit" fullWidth variant="contained" style={styles.button}>עדכן מוצר</Button>
                    </DialogActions>
                </form>
            </DialogContent>

        </Dialog>
    );
}

export default UpdateProduct;
