import { getAllProducts, getTotalPages } from "../api/productService";
import { getCategories } from "../api/enumService";
import { useEffect, useState } from "react";
import OneProduct from "../components/OneProduct";
import ViewProduct from "../components/ViewProduct";
import "./css/productList.css"
import axios from "axios";

export default function ProductList() {
    const [products, setProducts] = useState([])
    const [choiseProduct, setChoiseProduct] = useState({});
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [categories, setCategories] = useState([])

    async function getProducts(pageNumber) {
        try {
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

    async function getCategoriesEnum() {
        try {
            let response = await getCategories();
            console.log("res;" + response.data.Categories);
            setCategories(["בחר קטגוריה",...response.data.Categories]);
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
    }, [page])



    return (<>
        <select name="categoriesSelect" id="">
            {categories && categories.map((category) => {
                return <option key={category}>{category}</option>
            })}
        </select>
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
                <div className="pagination">
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
            </div>
        </div>


    </>
    )
}