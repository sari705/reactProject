import { useSelector } from "react-redux"
import ProductInCart from "../components/ProductInCart";
import { Link } from "react-router-dom";


function Cart() {

    const reduxProducts = useSelector((state) => state.cart.products);
    const reduxAmount = useSelector((state) => state.cart.amountInCart);
    const reduxSum = useSelector((state) => state.cart.sum.toFixed(2));

    return (<>
        <ul>
            {reduxProducts.map((product) => (<li key={product._id}>
                <ProductInCart product={product} />
            </li>
            ))}
        </ul>

        <h2>num products in cart: {reduxAmount}</h2>
        <h2>sum: {reduxSum>0?reduxSum:0}</h2>


            <Link to="/checkout">    <button>המשך בקנייה</button></Link>
    </>);//כאן אמור להיות כפתור "המשך בקניה" / "לתשלום
}

export default Cart;