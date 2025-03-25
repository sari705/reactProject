import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import { MenuItem, Select, TextField, FormControl, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import { getAllProducts, getTotalPages, getProductsByCategory, searchProducts } from "../api/productService";
import OneProduct from "../components/OneProduct";
import { getCategories } from "../api/enumService";
import ReducedCart from "../components/ReducedCart";
import UpdateProduct from "./UpdateProduct";
import "./css/ProductList.css"
import SwingingImage from "../components/SwingingImage";
import { fetchGoogleUser } from "../utils/fetchData";
import { useDispatch } from "react-redux";


export default function ProductList() {
    const [products, setProducts] = useState([])
    const [choiseProduct, setChoiseProduct] = useState(null);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [categories, setCategories] = useState([])
    const [choiseCategory, setChoiseCategory] = useState(" ")
    const [searchValue, setSearchValue] = useState("")
    const [viewReducedCart, setViewReducedCart] = useState(false)
    const [loading, setLoading] = useState(true);
    const [viewUpdateForm, setViewUpdateForm] = useState(false)
    const [productForUpdate, setProductForUpdate] = useState(null)
    const location = useLocation(); // בודק את ה-URL
    const amountInCart = useSelector((state) => state.cart.amountInCart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function getProducts(pageNumber) {
        try {
            setLoading(true);
            let response = await getAllProducts(pageNumber);
            setProducts(response.data.products);
            setChoiseProduct(null)
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false); // ✅ ביטול טעינה לאחר השלמת הבקשה
        }
    }

    async function getProductsCategory(category) {
        if (category === " ") {
            getProducts(1);
            return;
        }
        else {
            setSearchValue("")
            try {
              
                setLoading(true);
                console.log("fetching products...");
                let response = await getProductsByCategory(category);
                setProducts(response.data.products);
                setChoiseProduct(null)
            }
            catch (e) {
                console.log(e);
            }
            finally {
                setLoading(false); // ✅ ביטול טעינה לאחר השלמת הבקשה
            }
        }
    }

    async function getSearchProduct() {
        if (searchValue === "") {
            if (choiseCategory === " ") {
                getProducts(1);
                return;
            }
            else {
                getProductsCategory(choiseCategory)
            }
        }
        else {
            setChoiseCategory(" ")
            try {
                setLoading(true);
                let response = await searchProducts(searchValue);
                setProducts(response.data.products);
            }
            catch (e) {
                console.log(e);
            }
            finally {
                setLoading(false); // ✅ ביטול טעינה לאחר השלמת הבקשה
            }
        }
    }

    async function getCategoriesEnum() {
        try {
            let response = await getCategories();
            setCategories([" ", ...response.data.Categories]);
        }
        catch (e) {
            console.log(e);
        }
    }


    async function getPages() {
        try {
            let totalPages = await getTotalPages();
            setTotalPages(totalPages.data.totalPages);
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getPages()
        getCategoriesEnum()
    }, [])

    useEffect(() => {
        setViewReducedCart(true)
        setTimeout(() => { setViewReducedCart(false) }, 5000)
    }, [amountInCart])

    useEffect(() => {
        getProducts(page)
        window.scrollTo({ top: 20, behavior: "auto" });
    }, [page, viewUpdateForm])

    useEffect(() => {
        getProductsCategory(choiseCategory)
    }, [choiseCategory])

    // useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const tokenFromUrl = params.get("token");

    //     if (tokenFromUrl) {
    //         fetchGoogleUser(dispatch, navigate, tokenFromUrl);
    //     }
    // }, [dispatch, navigate, location.search]);


    return (<>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center", marginBottom: 5, marginTop:"80px" }}>            {/* בחירת קטגוריה */}
            <FormControl variant="outlined" sx={{ minWidth: 300 }}>
                <InputLabel>בחר קטגוריה</InputLabel>
                <Select
                    value={choiseCategory}
                    onChange={(e) => setChoiseCategory(e.target.value)}
                    label="בחר קטגוריה"
                >
                    {categories && categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* שדה חיפוש */}
            <TextField
                value={searchValue}
                variant="outlined"
                placeholder="חפש מוצר לפי שם"
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{ minWidth: 300 }}
            />
            <Button variant="contained" sx={{ color: "white" }} onClick={getSearchProduct}>חפש</Button>
        </Box >

        {
            loading ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "50vh",
                        gap: 2, // ריווח בין האלמנטים
                    }}>
                    <SwingingImage></SwingingImage>
                </Box>


            ) : (
                <div className="product-list-div">
                    {products?.length > 0 ? <ul className="product-list-container">
                        {products.map((product) => (
                            <li key={product._id} >
                                <OneProduct setProductForUpdate={setProductForUpdate} setViewUpdateForm={setViewUpdateForm} product={product} onClick={() => setChoiseProduct(product)} />
                            </li>
                        ))}
                    </ul> : <Typography>אין מוצרים בקטגוריה זו </Typography>}
                </div>
            )
        }

        {choiseCategory === " " && searchValue === "" && (
            <Stack spacing={2} alignItems="center" sx={{ marginTop: "20px", marginBottom: "20px" }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "#590202", // צבע טקסט כהה
                            borderColor: "#BF7069", // גבול עדין תואם לפלטה
                            borderRadius: "12px", // כפתורים מעוגלים יותר
                            transition: "all 0.3s ease-in-out",
                            fontWeight: "bold",
                            background: "linear-gradient(145deg, #e9ecf2, #ffffff)", // מעבר צבע עדין
                            boxShadow: "3px 3px 6px #d9b1a3, -3px -3px 6px #ffffff", // הצללה עדינה
                        },
                        "& .Mui-selected": {
                            backgroundColor: "#84B1D9", // כחול מהפלטה שלך
                            borderColor: "#84B1D9",
                            transform: "scale(1.1)", // אפקט קל של התרחבות בעת בחירה
                            boxShadow: "inset 3px 3px 6px #6a94b5, inset -3px -3px 6px #9cc7f5", // הצללה פנימית
                        },
                        "& .MuiPaginationItem-root:hover": {
                            backgroundColor: "#D9B1A3", // גוון עדין ל-Hover
                            transform: "scale(1.05)", // אנימציה עדינה של הגדלה
                            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)", // הצללה נוספת להדגשה
                        },
                    }}

                />
            </Stack>
        )}


        <Outlet></Outlet>

        {viewReducedCart && <ReducedCart setViewReducedCart={setViewReducedCart}></ReducedCart>}

        {viewUpdateForm && <UpdateProduct setViewUpdateForm={setViewUpdateForm} product={productForUpdate}></UpdateProduct>}

    </>
    )
}