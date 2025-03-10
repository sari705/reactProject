import { updateProduct } from "../api/productService";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { getCategories, getTags, getColors } from "../api/enumService";
import "./css/UpdateProduct.css"

const product = {
    _id: "67ccce2a408b3e71784dc431",
    name: "car",
    description: "a white car",
    images: ["tois20.jpg"],
    stock: 10,
    price: 680,
    categories: "צעצועים",
    sizes: ["M"],
    colors: [],
    tag: ["צעצועי התפתחות"],
    __v: 0
};

function UpdateProduct({ product, setViewUpdateForm }) {
    const { register, handleSubmit, control, reset, formState: { errors, isValid } } = useForm();
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const token = useSelector((state) => state.user?.currentUser.token);
    // ללבדוק למה קשור הבעיה כיגם הוספצ מוצר לא עובד מאותה סיבה ולפני כן זה עבד .אולי משהו ברידקס השתבש?

    console.log("token: ", token);
    
    async function onSubmit(data) {
        if (!product || !product._id) {
            alert("מזהה המוצר חסר! לא ניתן לעדכן.");
            return;
        }

        const productToUpdate = { ...data, _id: product._id }; // ודאי שהמזהה קיים
        console.log("Product Data: ", productToUpdate);

        try {

            const response = await updateProduct(productToUpdate, token);
            console.log("respones" + response.data);
            alert("updated");
            setViewUpdateForm(false);
        }
        catch (error) {
            alert(error);
            console.log(error);
        }
    }

    async function getTagEnam() {
        console.log("getTagEnam");
        try {
            const res = await getTags()
            setTags(res.data.TagsEnum);
        }
        catch (err) {
            console.log("tags error: " + err);
        }
    }

    async function getCategoryEnam() {
        console.log("getCategoryEnam");
        try {
            const res = await getCategories()
            setCategories(res.data.Categories);
        }
        catch (err) {
            console.log("tags error: " + err);
        }
    }

    async function getColorEnam() {
        try {
            const res = await getColors()
            setColors(res.data.Colors);
        }
        catch (err) {
            console.log("tags error: " + err);
        }
    }

    useEffect(() => {
        if (product) {
            reset({
                name: product.name || "",
                description: product.description || "",
                images: product.images.join(", ") || [],
                stock: product.stock || 1,
                price: product.price || 0,
                categories: product.categories || "",
                sizes: product.sizes || [],
                color: product.color || [],
                tag: product.tag || []
            });
        }
    }, [product, reset]);

    return (
        <div className="update-form-div">
            <form onSubmit={handleSubmit(onSubmit)} className="update-form-form">
                <button onClick={() => (setViewUpdateForm(false))}>❌</button>
                {/**שם */}
                <div>
                    <label>שם המוצר:</label>
                    <br />
                    <input {...register("name",
                        {
                            required: { value: true, message: "name is required" },
                            minLength: { value: 3, message: "name is too short" }

                        }
                    )} />
                    {errors.name && <h2>{errors.name.message}</h2>}
                    <br />
                </div>

                {/**תיאור */}
                <div>
                    <label>תיאור:</label>
                    <br />
                    <textarea {...register("description",
                        { required: { value: true, message: "description is required" } }
                    )} />
                    {errors.description && <h2>{errors.description.message}</h2>}
                    <br />
                </div>

                {/**ניתובים לתמונות */}
                <div>
                    <label>תמונות (הפרד עם פסיקים):</label>
                    <br />
                    <input {...register("images",
                        { required: { value: true, message: "at least one image is required" } }
                    )} placeholder="image1.jpg, image2.jpg" />
                    {errors.images && <h2>{errors.images.message}</h2>}
                    <br />
                </div>

                {/**כמות במלאי */}
                <div>
                    <label>מלאי:</label>
                    <br />
                    <input type="number" {...register("stock",
                        {
                            required: { value: true, message: "stock is required" },
                            min: { value: 1, message: "must be at least 1" },
                        }
                    )} />
                    {errors.stock && <h2>{errors.stock.message}</h2>}
                    <br />
                </div>

                {/**מחיר */}
                <div>
                    <label>מחיר:</label>
                    <br />
                    <input type="number" step="0.01" {...register("price",
                        { required: { value: true, message: "price is required" }, min: 1 }
                    )} />
                    {errors.price && <h2>{errors.price.message}</h2>}
                    <br />
                </div>

                {/**קטגוריה */}
                <div>
                    <label>קטגוריה:</label>
                    <br />
                    <select {...register("categories",
                        { required: { value: true, message: "categories is required" } }
                    )}>
                        <option value="">בחר קטגוריה</option>
                        {categories.length && categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.categories && <h2>{errors.categories.message}</h2>}
                </div>

                {/**גדלים של המוצר */}
                <div>
                    <label>גדלים (הפרד עם פסיקים):</label>
                    <br />
                    <Controller
                        name="sizes"
                        control={control}
                        defaultValue={[]} // ערך ברירת מחדל הוא מערך ריק
                        render={({ field }) => (
                            <input
                                {...field}
                                placeholder="S, M, L"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const sizesArray = value.split(",").map((size) => size.trim()); // מפריד לפסיקים ומנקה רווחים
                                    field.onChange(sizesArray); // שומר את הערכים כמערך
                                }}
                            />
                        )}
                    />
                </div>

                {/**צבעים */}
                <div>
                    <label>צבעים (הפרד עם פסיקים):</label>
                    <br />
                    <Controller
                        name="color"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <Select
                                multiple
                                {...field}
                                value={field.value || []}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                {colors.map((color) => (
                                    <MenuItem key={color} value={color}>
                                        {color}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </div>

                {/**תגיות */}
                <div>
                    <label>תגיות:</label>
                    <br />
                    <Controller
                        name="tag"
                        control={control}
                        defaultValue={[]}
                        rules={{ required: "בחר לפחות תגית אחת" }}
                        render={({ field, fieldState }) => (
                            <>
                                <Select
                                    multiple
                                    {...field}
                                    value={field.value || []}
                                    onChange={(e) => field.onChange(e.target.value)}
                                >
                                    {tags.map((tag) => (
                                        <MenuItem key={tag} value={tag}>
                                            {tag}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {fieldState.error && <h2>{fieldState.error.message}</h2>}
                            </>
                        )}
                    />
                </div>

                <button type="submit">עדכן מוצר</button>
            </form>
        </div>
    );
}

export default UpdateProduct;