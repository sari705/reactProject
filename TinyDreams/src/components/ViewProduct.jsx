import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice"
import { store } from "../app/store.js"

function ViewProduct({ product }) {

    const { name, description, images, stock, price, categories, sizes, colors, tag } = product;
    const disp = useDispatch();

    return (
        <>
            {
                product.name ? <div>
                    {images&&<img src={`/images/${images[0]}`} alt={product.images[0]} />}
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p>Price: ${price}</p>
                    <p>{stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}</p>
                    <p>Category: {categories}</p>

                    {sizes.length>0 && <p>Sizes: {sizes.join(", ")}</p>}
                    {colors && <p>Colors: {colors.join(", ")}</p>}
                    {tag && <p>Tags: {tag.join(", ")}</p>}
                    <button onClick={() => { disp(addToCart(product)) }}>הוסף לסל</button>
                </div>:<h1>בחר מוצר להצגה מפורטת</h1>
            }


        </>);
}

export default ViewProduct;