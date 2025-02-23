import { useDispatch, useSelector } from "react-redux"
import ProductInCart from "../components/ProductInCart";


function Cart() {
    const dispatch = useDispatch();

    const reduxProducts = useSelector((state) => state.cart.products);
    const reduxAmount = useSelector((state) => state.cart.amountInCart);
    const reduxSum = useSelector((state) => state.cart.sum);

    return (<>
        <ul>
            {reduxProducts.map((product) => (<li key={product._id}>

                <ProductInCart product={product} />
            </li>
            ))}
        </ul>

        <h2>num products in cart: {reduxAmount}</h2>
        <h2>sum: {reduxSum}</h2>
        
    </>);//כאן אמור להיות כפתור "המשך בקניה" / "לתשלום
}

export default Cart;