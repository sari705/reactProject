import ViewProduct from "./ViewProduct";

function OneProduct({product, setChoiseProduct}) {

    return ( <div>
    <img src={`/images/${product.images[0]}`} alt={product.images[0]} onClick={() => setChoiseProduct(product)} /> 
    <h2>{product.name}</h2>
    <h3>{product.price}</h3>

    </div> );
}

export default OneProduct;
