import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../api/productService";
import { addToCart } from "../features/cartSlice";
import "./css/oneProduct.css"

function OneProduct({ product, setChoiseProduct, setViewUpdateForm , setProductForUpdate}) {
    const navigate = useNavigate()
    const disp = useDispatch()
    const token = useSelector((state) => state.user?.currentUser?.token);

    const deleteProductById = async (id) => {
        try {
            const response = await deleteProduct(id, token);
            if (response){
                console.log(response);
                alert(response.data)
            }
        }
        catch (error) {
            console.log(error)
            alert(error.response.data.message)
        }
    }

    return (<div>

        <h2>{product.name}</h2>
        <img src={`/images/${product.images[0]}`} alt={product.images[0]} onClick={() => navigate(`details/${product._id}`)} />
        <h3>{product.price}</h3>
        <div className="tags-container">
                {product.tag && product.tag.map((productTag, index) => (
                    <span key={index} className="tag">{productTag}</span>
                ))}
        </div>
        <button onClick={() => { disp(addToCart(product)) }}>הוסף לסל</button>
        <button onClick={() => { setViewUpdateForm(true); setProductForUpdate(product)}}>ערוך מוצר</button>
        <button onClick={() => { deleteProductById(product._id)}}>מחק מוצר</button>

    </div>);
}

export default OneProduct;
