import {getAllProducts} from "../api/productService";
import { useEffect, useState } from "react";

export default function ProductList(){
    const [products, setProducts] = useState([])
    async function getProducts() {
        try{
            let allProducts = await getAllProducts();
            console.log("all product "+allProducts.data.products[0].name);
            setProducts(allProducts.data.products);
        }
        catch(e){
            console.log(e);
        }      

    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <ul>
            {
                products.map((product) => {
                    let imgSrc = `/images/${product.images[0]}`;
                    return <li key={product._id}><img src={imgSrc} alt={product.images[0]}></img>{product.name}</li>})
            }
        </ul>
    )
}