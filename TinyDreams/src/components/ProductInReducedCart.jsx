import { useDispatch, useSelector } from "react-redux";
import { updateAmount, removeProduct, addToCart } from "../features/cartSlice";

function ProductInReducedCart(props) {
    const { product } = props
    return (
        <>
            <h2>{product.name}</h2>
            <img src={`/images/${product.images[0]}`} alt={product.images[0]}></img>
            <h2>amount: {product.amount}</h2>
        </>
    );
}

export default ProductInReducedCart;