import ProductInReducedCart from "./ProductInReducedCart";
import { useSelector } from "react-redux";

function ReducedCart() {
    const reduxProducts = useSelector((state) => state.cart.products);
    const reduxAmount = useSelector((state) => state.cart.amountInCart);
    const reduxSum = useSelector((state) => state.cart.sum.toFixed(2));

    return (<>
        <ul>
            {reduxProducts.map((product) => (<li key={product._id}>
                <ProductInReducedCart product={product} />
            </li>
            ))}
        </ul>

        <h2>num products in cart: {reduxAmount}</h2>
        <h2>sum: {reduxSum > 0 ? reduxSum : 0}</h2>

    </>);//כאן אמור להיות כפתור "המשך בקניה" / "לתשלום
}

export default ReducedCart;