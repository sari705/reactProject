import ViewProduct from "./ViewProduct";

function OneProduct({product,setChoiseProduct}) {
    return ( <li>

    <img src={`/images/${product.images[0]}`} alt={product.images[0]} onClick={ViewProduct}/>
    <h2>{product.name}</h2>
    <h3>{product.price}</h3>

    </li> );
}

export default OneProduct;
