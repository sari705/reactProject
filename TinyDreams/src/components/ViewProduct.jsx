import { Link, useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../api/productService.js";
import { useState, useEffect } from "react";
import "./css/ViewProduct.css"


function ViewProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()

    const fetchProduct = async () => {
        try {
            const response = await getProduct(id)
            setProduct(response.data.data)
        }
        catch (e) {
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [id])

    return (
        <>
            {
                product &&
                <div className="modal-overlay" onClick={() => { navigate("/products") }}>
                    <div className="flex-container" >
                        <img className="flex-item" src={`/images/${product.images[0]}`} alt={product.images[0]} />
                        <h2 className="flex-item">{product.name}</h2>
                        <p className="flex-item">{product.description}</p>
                        <p className="flex-item">Price: ${product.price}</p>
                        <p className="flex-item">{product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}</p>
                        <p className="flex-item">Category: {product.categories}</p>

                        {product.sizes?.length > 0 && <p className="flex-item">Sizes: {product.sizes.join(", ")}</p>}
                        {product.colors && <p className="flex-item">Colors: {product.colors.join(", ")}</p>}
                        {product.tag && <p className="flex-item">Tags: {product.tag.join(", ")}</p>}

                        <button className="close-button" onClick={() => navigate("/products")}>סגור</button>
                    </div>
                </div>

            }


        </>);
}

export default ViewProduct;