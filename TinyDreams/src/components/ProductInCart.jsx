import { useDispatch } from "react-redux";
import { updateAmount, removeProduct, addToCart } from "../features/cartSlice";

function ProductInCart({ product }) {

    const dispatch = useDispatch();

    return (<>
        <h2>{product.name}</h2>

        <img src={`/images/${product.images[0]}`} alt={product.images[0]}></img>
        <h3>price: {product.price}</h3>
        <div>
            <h2>amount: {product.amount}</h2>
            <button value="+" onClick={() => dispatch(addToCart(product))}></button>
            <button value="-" onClick={() => dispatch(updateAmount(product))}></button>

            <button value="🗑️" onClick={() => dispatch(removeProduct(product))}></button>

        </div>
    </>);
}

export default ProductInCart;
