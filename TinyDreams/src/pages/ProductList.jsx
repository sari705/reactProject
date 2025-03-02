import { getAllProducts, getTotalPages, getProductsByCategory, searchProducts } from "../api/productService";
import { getCategories } from "../api/enumService";
import { useEffect, useState } from "react";
import OneProduct from "../components/OneProduct";
import ViewProduct from "../components/ViewProduct";
import "./css/productList.css"
import axios from "axios";
import ReducedCart from "../components/ReducedCart";

export default function ProductList() {
    const [products, setProducts] = useState([])
    const [choiseProduct, setChoiseProduct] = useState({});
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [categories, setCategories] = useState([])
    const [choiseCategory, setChoiseCategory] = useState("בחר קטגוריה")
    const [searchValue, setSearchValue] = useState("")
    const [viewReducedCart, setViewReducedCart] = useState(false)


    async function getProducts(pageNumber) {
        try {
            setViewReducedCart(true)
            console.log("fetching products...");
            let response = await getAllProducts(pageNumber);
            console.log("all product " + response.data.products[0].name);
            setProducts(response.data.products);
            setChoiseProduct({})
        }
        catch (e) {
            console.log(e);
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
                setChoiseProduct({})
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
                console.log("res;" + response.data.products);
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
            console.log("res;" + response.data.Categories);
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
        getProducts(page)
        setTimeout(() => {setViewReducedCart(false)}, 5000)
    }, [page])

    useEffect(() => {
        getProductsCategory(choiseCategory)
    }, [choiseCategory])

    useEffect(() => {
        getSearchProduct()
    }, [searchValue])


    return (<>
    
        <select name="categoriesSelect" id="" onChange={(e) => { setChoiseCategory(e.target.value) }}>
            {categories && categories.map((category) => {
                return <option key={category}>{category}</option>
            })}
        </select>
        <input type="search" placeholder="חפש מוצר לפי שם" name="" id="" onBlur={(e) => { setSearchValue(e.target.value) }} />
        <div className="product-page">

            <div className="product-details">
                <ViewProduct product={choiseProduct} />
            </div>

            <div className="product-list-container">
                <ul className="product-list">
                    {products.map((product) => (
                        <li key={product._id}>
                            <OneProduct product={product} setChoiseProduct={setChoiseProduct} />
                        </li>
                    ))}

                </ul>
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
                </div>}
            </div>
        </div>
        {viewReducedCart && <ReducedCart></ReducedCart>}

    </>
    )
}