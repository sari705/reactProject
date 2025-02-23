import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice"
import { store } from "../app/store.js"

function ViewProduct({ product }) {

    const { name, description, images, stock, price, categories, sizes, colors, tag } = product;
    const disp = useDispatch();
    console.log();

    console.log(store.getState().cart.products);
    
    return (
        <>
            {
                product && <div>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p>Price: ${price}</p>
                    <p>Stock: {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}</p>
                    <p>Category: {categories}</p>
                    {sizes && <p>Sizes: {sizes.join(", ")}</p>}
                    {colors && <p>Colors: {colors.join(", ")}</p>}
                    {tag && <p>Tags: {tag.join(", ")}</p>}
                    <button onClick={() => { disp(addToCart(product)) }}>הוסף לסל</button>
                </div>
            }


        </>);
}

export default ViewProduct;