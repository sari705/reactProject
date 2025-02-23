import { getAllProducts, getTotalPages } from "../api/productService";
import { useEffect, useState } from "react";
import OneProduct from "../components/OneProduct";
import ViewProduct from "../components/ViewProduct";
import "./css/productList.css"

export default function ProductList() {
    const [products, setProducts] = useState([])
    const [choiseProduct, setChoiseProduct] = useState({});
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)

    async function getProducts(pageNumber) {
        try {
            console.log("fetching products...");            
            let response = await getAllProducts(pageNumber);
            console.log("all product " + response.data.products[0].name);
            setProducts(response.data.products);
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
    }, [])

    useEffect(() => {
        getProducts(page)
    }, [page])



    return (<>
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