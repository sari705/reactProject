import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../features/cartSlice";
import "./css/oneProduct.css"

function OneProduct({ product, setChoiseProduct }) {

    const navigate = useNavigate()
    const disp = useDispatch()
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

    </div>);
}

export default OneProduct;
