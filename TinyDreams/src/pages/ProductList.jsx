import { getAllProducts, getTotalPages, getProductsByCategory, searchProducts } from "../api/productService";
import { getCategories } from "../api/enumService";
import { useEffect, useState } from "react";
import OneProduct from "../components/OneProduct";
import ViewProduct from "../components/ViewProduct";

import axios from "axios";
import ReducedCart from "../components/ReducedCart";
import { Outlet, useLocation } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import "./css/ProductList.css"

export default function ProductList() {
    const [products, setProducts] = useState([])
    const [choiseProduct, setChoiseProduct] = useState(null);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [categories, setCategories] = useState([])
    const [choiseCategory, setChoiseCategory] = useState("בחר קטגוריה")
    const [searchValue, setSearchValue] = useState("")
    const [viewReducedCart, setViewReducedCart] = useState(false)
    const [loading, setLoading] = useState(true);
    const [viewUpdateForm, setViewUpdateForm] = useState(false)
    const [productForUpdate, setProductForUpdate] = useState(null)
    const location = useLocation(); // בודק את ה-URL
    const amountInCart = useSelector((state) => state.cart.amountInCart)

    const handleProductClick = (product) => {
        setChoiseProduct(product);
    };

    async function getProducts(pageNumber) {
        try {
            setLoading(true);
            console.log("fetching products...");
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
        if (category === "בחר קטגוריה") {
            getProducts(1);
            return;
        }
        else {
            try {
                console.log("fetching products...");
                let response = await getProductsByCategory(category);
                // console.log("all product " + response.data.products[0].name);
                setProducts(response.data.products);
                setChoiseProduct(null)
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    async function getSearchProduct() {
        if (searchValue === "") {
            if (choiseCategory === "בחר קטגוריה") {
                getProducts(1);
                return;
            }
            else {
                getProductsCategory(choiseCategory)
            }
        }
        else {
            try {
                let response = await searchProducts(searchValue);
                setProducts(response.data.products);
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    async function getCategoriesEnum() {
        try {
            let response = await getCategories();
            setCategories(["בחר קטגוריה", ...response.data.Categories]);
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
    }, [page, viewUpdateForm])

    useEffect(() => {
        getProductsCategory(choiseCategory)
    }, [choiseCategory])

    useEffect(() => {
        getSearchProduct()
    }, [searchValue])

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("token", token);
        }
    })
    return (<>

        <select className="product-list-select" name="categoriesSelect" id="" onChange={(e) => { setChoiseCategory(e.target.value) }}>
            {categories && categories.map((category) => {
                return <option key={category}>{category}</option>
            })}
        </select>
        <input className="product-list-input" type="search" placeholder="חפש מוצר לפי שם" name="" id="" onBlur={(e) => { setSearchValue(e.target.value) }} />
        {loading ? (
            <div><CircularProgress color="secondary" />
                <CircularProgress color="success" />
                <CircularProgress color="inherit" /></div>

        ) : (
            <div className="product-list-div">
                <ul className="product-list-container">
                    {products.map((product) => (
                        <li key={product._id} >
                            <OneProduct setProductForUpdate={setProductForUpdate} setViewUpdateForm={setViewUpdateForm} product={product} onClick={() => handleProductClick(product)} />
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {choiseCategory == "בחר קטגוריה" && searchValue == "" && <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={page === index + 1 ? "active" : ""}
                >
                    {index + 1}
                </button>
            ))}
        </div>
        }

        <Outlet></Outlet>

        {viewReducedCart && <ReducedCart setViewReducedCart={setViewReducedCart}></ReducedCart>}

        {viewUpdateForm && <UpdateProduct setViewUpdateForm={setViewUpdateForm} product={productForUpdate}></UpdateProduct>}

    </>
    )
}