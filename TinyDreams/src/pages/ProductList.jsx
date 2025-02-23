import { getAllProducts } from "../api/productService";
import { useEffect, useState } from "react";
import OneProduct from "../components/OneProduct";
import ViewProduct from "../components/ViewProduct";
import "./css/productList.css"

export default function ProductList() {
    const [products, setProducts] = useState([])
    const [choiseProduct, setChoiseProduct] = useState({});

    async function getProducts() {
        try {
            let allProducts = await getAllProducts();
            console.log("all product " + allProducts.data.products[0].name);
            setProducts(allProducts.data.products);
        }
        catch (e) {
            console.log(e);
        }

    }
    useEffect(() => {
        getProducts()
    }, [])



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
            </div>


        </div>
          

    </>
    )
}