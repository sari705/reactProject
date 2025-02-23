import { getAllProducts } from "../api/productService";
import { useEffect, useState } from "react";
import OneProduct from "../components/OneProduct";
import ViewProduct from "../components/ViewProduct";

export default function ProductList({setChoiseProduct}) {
    const [products, setProducts] = useState([])

    const [choiseProduct, setChoiseProduct] = useState();

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
     <div>
        <ul>
            {products.map((product) => (
                <li key={product._id}>
                    <OneProduct product={product} setChoiseProduct={setChoiseProduct} /> 
                </li>
            ))}

            {/* {
                products.map((product) => {
                    let imgSrc = `/images/${product.images[0]}`;
                    return <li key={product._id}><img src={imgSrc} alt={product.images[0]}></img>{product.name}</li>
                })
            } */}
        </ul>
        </div>

          <div>
          <ViewProduct product={choiseProduct}/>
          </div>
          
        </>
    )
}